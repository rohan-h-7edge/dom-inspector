import React, { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import {
  Eye,
  ArrowRight,
  Terminal,
  CheckCircle2,
  XCircle,
  ChevronUp,
  Inbox,
  Square,
  Info,
  Pin,
  Check,
  ImagePlus,
  Bug,
  Wrench,
} from "lucide-react";
import { Shimmer } from "../../src/components/ai-elements/shimmer";
import { GetPromptResultSchema } from "@modelcontextprotocol/sdk/types.js";
import type { UIMessage } from "ai";
import { buildInspectionPrompt, type InspectionItem } from "./InspectionQueue";
import { ContextDialog } from "./ContextDialog";
import { AnnotationDialog } from "./AnnotationDialog";
import type { McpClientType } from "../hooks/useMcp";
import { MessageDetail } from "./MessageDetail";
import { useIslandState } from "../hooks/useIslandState";
import { AVAILABLE_AGENTS, DEFAULT_AGENT } from "../constants/agents";
import { useDraggable } from "../hooks/useDraggable";
import { useAgent } from "../hooks/useAgent";
import type { Agent, Prompt } from "../constants/types";
import { getAvailableAgents, getDevServerBaseUrl } from "../utils/config-loader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { usePrompts } from "../hooks/usePrompts";
import { PromptParamsDialog } from "./PromptParamsDialog";
import { PromptsPanel } from "./PromptsPanel";
import { withQualityGate } from "../lib/qualityGate";

// Persists whether the Full Page Context dialog is open across a page reload
// (e.g. the Performance tab's "Re-run" button), so the user doesn't have to
// manually reopen it and re-navigate to the same tab afterwards.
const CONTEXT_DIALOG_OPEN_KEY = "dom-inspector:context-dialog-open";
// Persists which InspectorBar panel (chat/inspections) was open, so it reopens the
// same way after a reload instead of collapsing back to nothing.
const ACTIVE_PANEL_KEY = "dom-inspector:active-panel";

interface InspectorBarProps {
  isActive: boolean;
  onToggleInspector: () => void;
  onSubmitAgent: (query: string, agent: Agent, sessionId?: string) => void;
  onCancel?: () => void;
  isAgentWorking: boolean;
  messages: UIMessage[];
  status: "streaming" | "submitted" | "ready" | "error";
  inspectionCount?: number;
  inspectionItems?: InspectionItem[];
  onRemoveInspection?: (id: string) => void;
  toolsReady?: boolean;
  mcpClient?: McpClientType | null;
  /** Callback when selected agent changes */
  onAgentChange?: (agentName: string) => void;
  /** Number of elements currently selected (drives the Capture button) */
  selectionCount?: number;
  /** Callback to finalize the current selection into an inspection */
  onCapture?: () => void;
  /** Whether a collaboration hub is configured (bug reports / UI corrections) */
  collabEnabled?: boolean;
  /** Starts element selection in "report a bug" mode */
  onReportBug?: () => void;
  /** Starts element selection in "submit a UI correction" mode */
  onSubmitCorrection?: () => void;
  collabRole?: "tester" | "developer";
  onCollabRoleChange?: (role: "tester" | "developer") => void;
}

export const InspectorBar = ({
  isActive,
  onToggleInspector,
  onSubmitAgent,
  onCancel,
  isAgentWorking,
  messages,
  status,
  inspectionCount = 0,
  inspectionItems = [],
  onRemoveInspection = () => {},
  toolsReady = true,
  mcpClient = null,
  onAgentChange,
  selectionCount = 0,
  onCapture = () => {},
  collabEnabled = false,
  onReportBug = () => {},
  onSubmitCorrection = () => {},
  collabRole = "tester",
  onCollabRoleChange = () => {},
}: InspectorBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [activePanel, setActivePanel] = useState<"none" | "inspections" | "chat">(() => {
    try {
      const saved = sessionStorage.getItem(ACTIVE_PANEL_KEY);
      return saved === "inspections" || saved === "chat" ? saved : "none";
    } catch {
      return "none";
    }
  });
  const [allowHover, setAllowHover] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

  const { agent: selectedAgent, setAgent: setSelectedAgent, isReady } = useAgent(DEFAULT_AGENT);
  const [availableAgents, setAvailableAgents] = useState<Agent[]>(AVAILABLE_AGENTS);
  const [isAgentSelectorOpen, setIsAgentSelectorOpen] = useState(false);
  const [configInfoAgent, setConfigInfoAgent] = useState<string | null>(null);
  const [showContextDialog, setShowContextDialog] = useState(() => {
    try {
      return sessionStorage.getItem(CONTEXT_DIALOG_OPEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [showAnnotationDialog, setShowAnnotationDialog] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(CONTEXT_DIALOG_OPEN_KEY, showContextDialog ? "1" : "0");
    } catch {
      // sessionStorage unavailable (private mode, etc.) — dialog just won't survive a reload
    }
  }, [showContextDialog]);

  useEffect(() => {
    try {
      sessionStorage.setItem(ACTIVE_PANEL_KEY, activePanel);
    } catch {
      // sessionStorage unavailable (private mode, etc.) — panel just won't survive a reload
    }
  }, [activePanel]);

  const { prompts } = usePrompts(mcpClient || null);

  // Load available agents (merged with server config)
  useEffect(() => {
    getAvailableAgents().then((agents) => {
      setAvailableAgents(agents);
    });
  }, []);

  // Notify parent when agent changes (including initial load)
  useEffect(() => {
    if (isReady && selectedAgent) {
      onAgentChange?.(selectedAgent);
    }
  }, [selectedAgent, isReady, onAgentChange]);

  // Use state machine to derive Dynamic Island state from messages
  const { uiState, chatStatus, toolName, displayText } = useIslandState(
    messages,
    status,
    isExpanded,
  );

  // Derived booleans for clarity
  const isWorking = chatStatus === "submitted" || chatStatus === "streaming";
  const showInput = uiState === "expanded" && !isWorking; // Only show input when expanded and NOT working
  // Show message if we have content and are not in other states that hide it (like idle)
  // We show message when working, or when we have a result (ready)
  const showMessage = (messages.length > 0 && chatStatus !== "error") || isWorking;

  // Session State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const didCleanupSessionRef = useRef(false);

  const cleanupSession = (sid: string) => {
    const url = `${getDevServerBaseUrl()}/api/acp/cleanup-session`;
    const payload = JSON.stringify({ sessionId: sid });

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(url, blob);
        return;
      }
    } catch {
      // Ignore and fall back to fetch
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  };

  // Init session on mount or agent change
  useEffect(() => {
    // Wait for Config (isReady) AND Client Tools (toolsReady)
    if (!isReady || !toolsReady) return;

    let mounted = true;
    const currentAgent =
      availableAgents.find((a) => a.name === selectedAgent) ||
      availableAgents[0] ||
      AVAILABLE_AGENTS[0];

    const initSession = async () => {
      // Cleanup previous session if existence
      if (sessionIdRef.current) {
        try {
          await fetch(`${getDevServerBaseUrl()}/api/acp/cleanup-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: sessionIdRef.current }),
          });
        } catch (e) {
          console.warn("[InspectorBar] Failed to cleanup previous session:", e);
        }
        sessionIdRef.current = null;
        if (mounted) setSessionId(null);
      }

      console.log(`[InspectorBar] Initializing session for ${currentAgent.name}...`);

      try {
        const response = await fetch(`${getDevServerBaseUrl()}/api/acp/init-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agent: currentAgent,
            envVars: {}, // TODO: Add env var support if needed in InspectorBar
          }),
        });

        if (!response.ok) throw new Error("Failed to init session");

        const data = await response.json();
        if (mounted && data.sessionId) {
          console.log(`[InspectorBar] Session initialized: ${data.sessionId}`);
          setSessionId(data.sessionId);
          sessionIdRef.current = data.sessionId;
          didCleanupSessionRef.current = false;
        }
      } catch (error) {
        console.error("[InspectorBar] Failed to initialize session:", error);
      }
    };

    initSession();

    return () => {
      mounted = false;
    };
  }, [selectedAgent, isReady, toolsReady, availableAgents]);

  // Cleanup on refresh/close (best-effort)
  useEffect(() => {
    const onPageHide = () => {
      const sid = sessionIdRef.current;
      if (!sid || didCleanupSessionRef.current) return;
      didCleanupSessionRef.current = true;
      cleanupSession(sid);
    };

    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const sid = sessionIdRef.current;
      if (!sid || didCleanupSessionRef.current) return;
      didCleanupSessionRef.current = true;
      console.log(`[InspectorBar] Cleaning up session on unmount: ${sid}`);
      cleanupSession(sid);
    };
  }, []);

  // Get current agent info
  const currentAgent =
    availableAgents.find((a) => a.name === selectedAgent) ||
    availableAgents[0] ||
    AVAILABLE_AGENTS[0];

  // Use custom draggable hook
  const { elementRef: containerRef, isDragging, handleMouseDown } = useDraggable();

  // Inspection status display
  const [inspectionStatus, setInspectionStatus] = useState<{
    id: string;
    status: "in-progress" | "completed" | "failed";
    message?: string;
    currentStep?: {
      title: string;
      index: number;
      total: number;
    };
  } | null>(null);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Re-enable hover after AI finishes working
  useEffect(() => {
    if (!isWorking && !allowHover) {
      const timer = setTimeout(() => {
        setAllowHover(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isWorking, allowHover]);

  // "Play All" for the inspection queue: sends pending inspections to the
  // agent one at a time, only advancing to the next once the agent finishes
  // the current one (isWorking flips back to false) — never combined into a
  // single prompt.
  const playAllQueueRef = useRef<InspectionItem[]>([]);
  const wasWorkingRef = useRef(isWorking);

  // Listen to inspection progress updates
  useEffect(() => {
    function handleInspectionProgress(event: Event) {
      const customEvent = event as CustomEvent;
      const { plan, inspectionId } = customEvent.detail;

      // Find current step being processed
      if (plan?.steps) {
        const inProgressStep = plan.steps.find((s: any) => s.status === "in-progress");
        const completedCount = plan.steps.filter((s: any) => s.status === "completed").length;

        setInspectionStatus({
          id: inspectionId,
          status: "in-progress",
          currentStep: inProgressStep
            ? {
                title: inProgressStep.title,
                index: completedCount + 1,
                total: plan.steps.length,
              }
            : undefined,
        });
      }
    }

    function handleInspectionResult(event: Event) {
      const customEvent = event as CustomEvent;
      const { status, result, inspectionId } = customEvent.detail;

      setInspectionStatus({
        id: inspectionId,
        status: status,
        message: result?.message || result,
      });

      // Keep showing the result - don't auto-clear
    }

    window.addEventListener("plan-progress-reported", handleInspectionProgress as EventListener);
    window.addEventListener("inspection-result-received", handleInspectionResult as EventListener);

    return () => {
      window.removeEventListener(
        "plan-progress-reported",
        handleInspectionProgress as EventListener,
      );
      window.removeEventListener(
        "inspection-result-received",
        handleInspectionResult as EventListener,
      );
    };
  }, []);

  const [selectedPromptForParams, setSelectedPromptForParams] = useState<Prompt | null>(null);

  const executePrompt = async (prompt: Prompt, args: Record<string, string> = {}) => {
    // If MCP client is available, execute the prompt to get its content
    if (mcpClient) {
      try {
        const result = await mcpClient.request(
          {
            method: "prompts/get",
            params: { name: prompt.name, arguments: args },
          },
          GetPromptResultSchema,
        );

        const message = result.messages?.[0];
        if (message?.content?.type === "text" && message.content.text) {
          setInput(message.content.text);
          inputRef.current?.focus();
          return;
        }
      } catch (e) {
        console.error("Failed to execute prompt:", e);
        // Fallback to static template/description
      }
    }

    // Use template if available, fallback to description or name
    const text = prompt.template || prompt.description || prompt.name;
    setInput(text);
    inputRef.current?.focus();
  };

  const handlePromptSelect = async (prompt: Prompt) => {
    // Check if prompt has arguments
    if (prompt.arguments && prompt.arguments.length > 0) {
      setSelectedPromptForParams(prompt);
      return;
    }

    await executePrompt(prompt);
  };

  const handlePromptParamsSubmit = (args: Record<string, string>) => {
    if (selectedPromptForParams) {
      executePrompt(selectedPromptForParams, args);
      setSelectedPromptForParams(null);
    }
  };

  const submitToAgent = (text: string) => {
    if (!text.trim()) return;

    setInspectionStatus(null);

    const agentToSubmit =
      availableAgents.find((a) => a.name === selectedAgent) ||
      availableAgents[0] ||
      AVAILABLE_AGENTS[0];
    onSubmitAgent(text, agentToSubmit, sessionId || undefined);
  };

  const playNextQueued = () => {
    const next = playAllQueueRef.current.shift();
    if (!next) return;
    submitToAgent(buildInspectionPrompt(next));
    setActivePanel("chat");
  };

  const handlePlayAllInspections = () => {
    playAllQueueRef.current = inspectionItems.filter((item) => item.status === "pending");
    playNextQueued();
  };

  useEffect(() => {
    if (wasWorkingRef.current && !isWorking && playAllQueueRef.current.length > 0) {
      playNextQueued();
    }
    wasWorkingRef.current = isWorking;
  }, [isWorking]);

  // Listen for style edits made from the metatip's inline editor + play
  // button (packages/dom-inspector/client/vendor/visbug/components/metatip)
  // and forward them straight to the agent.
  useEffect(() => {
    const onMetatipStyleEdit = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      if (!detail?.text) return;
      // Testers file edits as bug reports; their ▶ buttons are hidden, and
      // this guards any path that still dispatches the event.
      if (collabEnabled && collabRole === "tester") return;
      submitToAgent(withQualityGate(detail.text));
      setIsExpanded(true);
      setActivePanel("chat");
    };

    window.addEventListener("metatip-style-edit", onMetatipStyleEdit);
    return () => window.removeEventListener("metatip-style-edit", onMetatipStyleEdit);
  }, [availableAgents, selectedAgent, sessionId, collabEnabled, collabRole]);

  // Forwards a "Resolve with AI" click on a bug-marker popover (rendered
  // outside this component, on the page itself) straight to the agent —
  // mirrors the metatip-style-edit listener above.
  useEffect(() => {
    const onCollabResolveWithAI = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      if (!detail?.text) return;
      submitToAgent(withQualityGate(detail.text));
      setIsExpanded(true);
      setActivePanel("chat");
    };

    window.addEventListener("collab-resolve-with-ai", onCollabResolveWithAI);
    return () => window.removeEventListener("collab-resolve-with-ai", onCollabResolveWithAI);
  }, [availableAgents, selectedAgent, sessionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    submitToAgent(input);
    setInput("");

    // Auto-expand chat panel to show message detail
    // setIsExpanded(true);
    setActivePanel("chat");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const isError = status === "error";

  return (
    <>
      <PromptParamsDialog
        prompt={selectedPromptForParams}
        isOpen={!!selectedPromptForParams}
        onOpenChange={(open) => !open && setSelectedPromptForParams(null)}
        onSubmit={handlePromptParamsSubmit}
      />
      {/* Transparent overlay to prevent pointer events leaking to host page when expanded */}
      {(isExpanded || activePanel !== "none") && (
        <div
          className="fixed inset-0 z-[999998] bg-transparent"
          onClick={() => {
            if (!isWorking && !isPinned) {
              setIsExpanded(false);
              setActivePanel("none");
            }
          }}
        />
      )}

      <div
        ref={containerRef}
        className={cn(
          "fixed bottom-8 left-1/2 z-[999999]", // Fixed positioning
          "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isExpanded
            ? "w-[480px]"
            : showMessage
              ? "w-auto min-w-[200px] max-w-[480px]"
              : "w-[190px]",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => {
          if (!isDragging && allowHover) {
            // Only expand the bar (for input), don't auto-open chat panel
            setIsExpanded(true);
          }
        }}
        onMouseLeave={() => {
          if (isPinned) return;
          if (!input.trim() && !isDragging) {
            setIsExpanded(false);
            setActivePanel("none");
          }
          // Re-enable hover when mouse leaves
          setAllowHover(true);
        }}
      >
        {/* Prompts Panel - Floating above the bar */}
        {/* Prompts Panel - Floating above the bar */}
        <PromptsPanel
          prompts={prompts}
          visible={isExpanded && !isWorking && activePanel === "none" && prompts.length > 0}
          onSelect={handlePromptSelect}
        />
        <div
          className={cn(
            "relative flex items-center backdrop-blur-xl shadow-2xl border border-border",
            "transition-[width,height,padding,background-color,border-color] duration-200 ease-out",
            isExpanded ? "h-12 p-2 pl-4" : "h-9 px-2 py-1",
            activePanel !== "none"
              ? "bg-muted/95 rounded-b-lg rounded-t-none border-t-0"
              : "bg-muted/90 rounded-full",
            isError && !isExpanded && "bg-destructive/10 border-destructive/20",
          )}
        >
          <div
            className={cn(
              "flex items-center transition-opacity duration-150 w-full relative",
              showInput ? "absolute left-3 opacity-0 pointer-events-none" : "relative opacity-100",
            )}
          >
            {messages.length === 0 && (
              <>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent flex-shrink-0">
                  <img src={currentAgent?.meta?.icon} alt={selectedAgent} className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-muted-foreground/70 ml-3 whitespace-nowrap">
                  ⌥I or hover to inspect
                </span>
              </>
            )}

            {showMessage && (
              <>
                {/* Fixed left icon group */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-accent flex-shrink-0">
                    {isWorking ? (
                      <>
                        <div className="absolute inset-1 rounded-full border-2 border-current opacity-20 animate-ping text-foreground" />
                        <img
                          src={currentAgent?.meta?.icon}
                          alt={selectedAgent}
                          className="w-3.5 h-3.5 animate-pulse"
                        />
                      </>
                    ) : inspectionStatus ? (
                      inspectionStatus.status === "in-progress" ? (
                        <>
                          <div className="absolute inset-1 rounded-full border-2 border-current opacity-20 animate-ping text-blue-500" />
                          <Terminal className="w-3.5 h-3.5 animate-pulse text-blue-500" />
                        </>
                      ) : inspectionStatus.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )
                    ) : isError ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="w-px h-4 bg-border flex-shrink-0" />
                </div>

                {/* Centered text content */}
                <div className="flex-1 flex justify-center min-w-0 pl-2">
                  <div className="flex flex-col min-w-0 max-w-full pr-2 max-h-[24px] overflow-hidden">
                    {inspectionStatus &&
                    inspectionStatus.status === "in-progress" &&
                    inspectionStatus.currentStep ? (
                      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground min-w-0">
                        <Terminal className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate min-w-0">
                          Step {inspectionStatus.currentStep.index}/
                          {inspectionStatus.currentStep.total}: {inspectionStatus.currentStep.title}
                        </span>
                      </div>
                    ) : inspectionStatus?.message ? (
                      <div className="text-sm font-medium leading-[1.4] text-foreground truncate min-w-0">
                        {inspectionStatus.message}
                      </div>
                    ) : toolName ? (
                      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground min-w-0">
                        <Terminal className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate min-w-0">{toolName}</span>
                      </div>
                    ) : (
                      <div className="text-sm font-medium leading-[1.4] text-foreground truncate min-w-0">
                        {isWorking && !displayText ? (
                          <Shimmer duration={2} spread={2}>
                            {status === "submitted" && currentAgent?.command === "npx"
                              ? `Starting ${currentAgent.name}... This may take a moment.`
                              : "Thinking..."}
                          </Shimmer>
                        ) : (
                          displayText || "Processing..."
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons - visible during work */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Expand button */}
                  <button
                    type="button"
                    onClick={() =>
                      setActivePanel((current) => (current === "chat" ? "none" : "chat"))
                    }
                    className={cn(
                      "flex items-center justify-center w-7 h-7 rounded-full transition-all flex-shrink-0",
                      activePanel === "chat"
                        ? "bg-foreground text-background"
                        : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground",
                    )}
                    title={activePanel === "chat" ? "Collapse" : "Expand messages"}
                  >
                    <ChevronUp
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        activePanel === "chat" && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Cancel button - only when working */}
                  {isWorking && (
                    <button
                      type="button"
                      onClick={onCancel}
                      className="flex items-center justify-center w-7 h-7 rounded-full bg-destructive text-destructive-foreground transition-all flex-shrink-0 hover:bg-destructive/90"
                      title="Cancel request"
                    >
                      <Square className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <div
            className={cn(
              "flex items-center w-full gap-3 transition-all duration-150",
              showInput
                ? "opacity-100 translate-y-0 relative pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none absolute top-2 left-4 right-2",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Context Button */}
            <>
              <button
                type="button"
                onClick={() => setShowContextDialog(true)}
                className={cn(
                  "relative flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0",
                  "hover:bg-accent/50",
                  showContextDialog && "bg-accent/50 text-foreground",
                )}
                title="Context"
              >
                <Inbox className="w-3.5 h-3.5" />
                {inspectionCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[12px] h-[12px] px-0.5 text-[8px] font-bold text-white bg-red-500 rounded-full border border-background shadow-sm leading-none">
                    {inspectionCount > 99 ? "99+" : inspectionCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowAnnotationDialog(true)}
                className={cn(
                  "relative flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0",
                  "hover:bg-accent/50",
                  showAnnotationDialog && "bg-accent/50 text-foreground",
                )}
                title="Design a new screen from an image"
              >
                <ImagePlus className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-border flex-shrink-0" />
            </>

            {/* Collaboration: report a bug / submit a UI correction — only shown
                when a collab hub is actually configured, to avoid clutter for
                the majority of installs that don't use this feature. */}
            {collabEnabled && (
              <>
                <button
                  type="button"
                  onClick={onReportBug}
                  className="relative flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0 hover:bg-accent/50"
                  title="Report a bug on an element"
                >
                  <Bug className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onSubmitCorrection}
                  className="relative flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0 hover:bg-accent/50"
                  title="Edit an element live, then submit the change as a suggested correction"
                >
                  <Wrench className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onCollabRoleChange(collabRole === "tester" ? "developer" : "tester")}
                  className="px-2 h-7 rounded-full text-[10px] font-medium capitalize transition-colors flex-shrink-0 hover:bg-accent/50 text-muted-foreground"
                  title="Toggle whether you're viewing this as a tester or a developer"
                >
                  {collabRole}
                </button>
                <div className="w-px h-4 bg-border flex-shrink-0" />
              </>
            )}

            {/* Capture button: finalizes the current VisBug selection into an inspection */}
            {isActive && selectionCount > 0 && (
              <button
                type="button"
                onClick={onCapture}
                className="relative flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-colors flex-shrink-0"
                title={`Capture ${selectionCount} selected element${selectionCount > 1 ? "s" : ""} (⌘/Ctrl+Enter)`}
              >
                <Check className="w-3.5 h-3.5" />
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[12px] h-[12px] px-0.5 text-[8px] font-bold text-white bg-blue-500 rounded-full border border-background shadow-sm leading-none">
                  {selectionCount > 99 ? "99+" : selectionCount}
                </span>
              </button>
            )}

            {/* Toggle Button */}
            <button
              onClick={onToggleInspector}
              className={cn(
                "relative flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0",
                isActive
                  ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground",
              )}
              title="Toggle Inspector (⌥I)"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-4 bg-border flex-shrink-0" />

            <form
              onSubmit={handleSubmit}
              className="flex-1 flex items-center gap-2 min-w-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Agent Selector */}
              <div className="relative flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAgentSelectorOpen(!isAgentSelectorOpen)}
                  className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-accent/50 transition-colors"
                  title="Select Agent"
                >
                  <img
                    src={availableAgents.find((a) => a.name === selectedAgent)?.meta?.icon}
                    alt={selectedAgent}
                    className="w-3.5 h-3.5"
                  />
                </button>

                {isAgentSelectorOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[999998]"
                      onClick={() => setIsAgentSelectorOpen(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-[999999] animate-in fade-in zoom-in-95 duration-200">
                      {availableAgents.map((agent) => (
                        <div
                          key={agent.name}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors group",
                            selectedAgent === agent.name && "bg-accent/50 font-medium",
                          )}
                        >
                          <button
                            onClick={() => {
                              setSelectedAgent(agent.name);
                              setIsAgentSelectorOpen(false);
                            }}
                            className="flex items-center gap-2 flex-1 text-left"
                          >
                            {agent.meta?.icon && (
                              <img src={agent.meta.icon} alt="" className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span className="flex-1">{agent.name}</span>
                          </button>
                          {(agent.configHint || agent.configLink) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfigInfoAgent(agent.name);
                              }}
                              className="p-1 rounded hover:bg-accent-foreground/10 transition-colors"
                              title="Configuration info"
                            >
                              <Info className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${selectedAgent}...`}
                className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground text-sm h-7 disabled:opacity-50"
                tabIndex={0}
                disabled={isWorking}
              />

              {/* Expand button - only show when AI is working or has messages */}
              {(messages.length > 0 || isWorking) && (
                <button
                  type="button"
                  onClick={() =>
                    setActivePanel((current) => (current === "chat" ? "none" : "chat"))
                  }
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full transition-all flex-shrink-0",
                    activePanel === "chat"
                      ? "bg-foreground text-background"
                      : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground",
                  )}
                  title={activePanel === "chat" ? "Collapse" : "Expand messages"}
                >
                  <ChevronUp
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300",
                      activePanel === "chat" && "rotate-180",
                    )}
                  />
                </button>
              )}

              {isWorking ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-destructive text-destructive-foreground transition-all flex-shrink-0 hover:bg-destructive/90"
                  title="Cancel request"
                >
                  <Square className="w-3 h-3" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full transition-all flex-shrink-0",
                    input.trim()
                      ? "bg-foreground text-background scale-100"
                      : "bg-accent text-muted-foreground/50 scale-90",
                  )}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Expanded Panel - shows above the bar */}
        {activePanel !== "none" && (
          <div className="absolute bottom-full left-0 right-0 pointer-events-auto max-w-[480px] mx-auto animate-panel-in">
            <div className="bg-muted/95 backdrop-blur-xl rounded-t-xl border border-border border-b-0 shadow-2xl overflow-hidden relative">
              {/* Pin button - top-left corner */}
              {showMessage && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPinned(!isPinned);
                  }}
                  className={cn(
                    "absolute top-3 left-3 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all",
                    isPinned
                      ? "bg-black text-white shadow-md hover:bg-gray-800"
                      : "bg-muted/80 text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                  title={isPinned ? "Unpin inspector" : "Pin inspector"}
                >
                  {isPinned ? (
                    <Pin className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Pin className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
              {/* Message Detail Section - Show InspectorBar messages */}
              {activePanel === "chat" && (
                <div className="h-[500px]">
                  <MessageDetail
                    messages={messages}
                    status={status}
                    selectedAgent={selectedAgent}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Context Dialog */}
      <ContextDialog
        open={showContextDialog}
        onOpenChange={setShowContextDialog}
        inspectionItems={inspectionItems}
        onRemoveInspection={onRemoveInspection}
        client={mcpClient}
        isClientReady={toolsReady}
        onPlayInspection={(item) => {
          submitToAgent(buildInspectionPrompt(item));
          setShowContextDialog(false);
          setActivePanel("chat");
        }}
        onPlayAllInspections={() => {
          handlePlayAllInspections();
          setShowContextDialog(false);
        }}
        onSubmitToAgent={(text) => {
          submitToAgent(withQualityGate(text));
          setShowContextDialog(false);
          setActivePanel("chat");
        }}
      />

      {/* Annotation Dialog */}
      <AnnotationDialog
        open={showAnnotationDialog}
        onOpenChange={setShowAnnotationDialog}
        onSubmitAgent={(text) => {
          submitToAgent(withQualityGate(text));
          setActivePanel("chat");
        }}
      />

      {/* Config Info Modal - using Dialog component */}
      {configInfoAgent &&
        (() => {
          const agent = availableAgents.find((a) => a.name === configInfoAgent);
          if (!agent) return null;
          return (
            <Dialog open={!!configInfoAgent} onOpenChange={() => setConfigInfoAgent(null)}>
              <DialogContent onClose={() => setConfigInfoAgent(null)} className="w-80">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    {agent.meta?.icon && <img src={agent.meta.icon} alt="" className="w-6 h-6" />}
                    {agent.name}
                  </DialogTitle>
                  {agent.configHint && <DialogDescription>{agent.configHint}</DialogDescription>}
                </DialogHeader>
                {agent.configLink && (
                  <a
                    href={agent.configLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 underline"
                  >
                    View ACP Documentation →
                  </a>
                )}
              </DialogContent>
            </Dialog>
          );
        })()}
    </>
  );
};
