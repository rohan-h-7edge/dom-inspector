import React, { useCallback, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { UploadCloud, Wand2, Trash2, Pencil, Copy, Check, X } from "lucide-react";
import { cn } from "../lib/utils";
import { getDevServerBaseUrl } from "../utils/config-loader";

interface AnnotationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Sends a prompt to the currently selected agent, same as the main chat input. */
  onSubmitAgent: (text: string) => void;
}

type AnnotationType = "button" | "card" | "input" | "typography" | "color" | "spacing" | "icon" | "other";
type AnnotationState = "default" | "hover" | "active" | "disabled" | "focus";

const ANNOTATION_TYPES: AnnotationType[] = [
  "button",
  "card",
  "input",
  "typography",
  "color",
  "spacing",
  "icon",
  "other",
];
const ANNOTATION_STATES: AnnotationState[] = ["default", "hover", "active", "disabled", "focus"];

interface AnnotationSpecs {
  color: string;
  backgroundColor: string;
  padding: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  borderRadius: string;
  boxShadow: string;
}

const EMPTY_SPECS: AnnotationSpecs = {
  color: "",
  backgroundColor: "",
  padding: "",
  fontFamily: "",
  fontSize: "",
  fontWeight: "",
  borderRadius: "",
  boxShadow: "",
};

interface Annotation {
  id: string;
  name: string;
  type: AnnotationType;
  x: number;
  y: number;
  specsByState: Partial<Record<AnnotationState, AnnotationSpecs>>;
  notes: string;
}

function createDraft(x: number, y: number): Annotation {
  return {
    id: crypto.randomUUID(),
    name: "",
    type: "button",
    x,
    y,
    specsByState: { default: { ...EMPTY_SPECS } },
    notes: "",
  };
}

const fieldClass =
  "w-full rounded-md border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/5 px-2.5 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50";
const labelClass = "text-xs font-medium text-neutral-500 dark:text-neutral-400";

function buildExport(annotations: Annotation[], imagePath: string | null) {
  return {
    title: "Design Specs from Image",
    image: imagePath,
    totalAnnotations: annotations.length,
    annotations: annotations.map((a) => ({
      name: a.name,
      type: a.type,
      position: { x: Math.round(a.x * 100) / 100, y: Math.round(a.y * 100) / 100 },
      states: a.specsByState,
      notes: a.notes,
    })),
  };
}

export const AnnotationDialog: React.FC<AnnotationDialogProps> = ({
  open,
  onOpenChange,
  onSubmitAgent,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [draft, setDraft] = useState<Annotation | null>(null);
  const [activeState, setActiveState] = useState<AnnotationState>("default");
  const [isEditing, setIsEditing] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const activeSpecs = draft?.specsByState[activeState] ?? EMPTY_SPECS;

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImagePath(null);
    setAnnotations([]);
    setDraft(null);
    setIsEditing(false);
    setNameError(false);
  }, [previewUrl]);

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const uploadImage = useCallback(async (file: File) => {
    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);
    try {
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const response = await fetch(`${getDevServerBaseUrl()}/__inspector__/save-picked-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl, filename: file.name }),
      });
      if (!response.ok) throw new Error(await response.text());
      const { path } = await response.json();
      setImagePath(path);
    } catch {
      // Upload failure only blocks the referenced file path in the export;
      // the local preview still works so annotation can continue.
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    if (x < 0 || x > 100 || y < 0 || y > 100) return;
    setDraft(createDraft(x, y));
    setActiveState("default");
    setIsEditing(false);
    setNameError(false);
  };

  const editAnnotation = (id: string) => {
    const existing = annotations.find((a) => a.id === id);
    if (!existing) return;
    setDraft(existing);
    setActiveState("default");
    setIsEditing(true);
    setNameError(false);
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
    if (draft?.id === id) {
      setDraft(null);
      setIsEditing(false);
    }
  };

  const saveDraft = () => {
    if (!draft) return;
    if (!draft.name.trim()) {
      setNameError(true);
      return;
    }
    setAnnotations((prev) => {
      const exists = prev.some((a) => a.id === draft.id);
      return exists ? prev.map((a) => (a.id === draft.id ? draft : a)) : [...prev, draft];
    });
    setDraft(null);
    setIsEditing(false);
  };

  const updateDraft = (patch: Partial<Annotation>) => setDraft((d) => (d ? { ...d, ...patch } : d));

  const updateSpec = (key: keyof AnnotationSpecs, value: string) =>
    setDraft((d) => {
      if (!d) return d;
      const current = d.specsByState[activeState] ?? { ...EMPTY_SPECS };
      return {
        ...d,
        specsByState: { ...d.specsByState, [activeState]: { ...current, [key]: value } },
      };
    });

  const addState = (state: AnnotationState) => {
    setDraft((d) => {
      if (!d || d.specsByState[state]) return d;
      return { ...d, specsByState: { ...d.specsByState, [state]: { ...EMPTY_SPECS } } };
    });
    setActiveState(state);
  };

  const removeState = (state: AnnotationState) => {
    if (!draft) return;
    const remaining = (Object.keys(draft.specsByState) as AnnotationState[]).filter(
      (s) => s !== state,
    );
    if (remaining.length === 0) return;
    const next = { ...draft.specsByState };
    delete next[state];
    setDraft({ ...draft, specsByState: next });
    if (activeState === state) setActiveState(remaining[0]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(buildExport(annotations, imagePath), null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSendToAgent = () => {
    if (annotations.length === 0) return;
    const json = JSON.stringify(buildExport(annotations, imagePath), null, 2);
    const imageRef = imagePath ? ` The reference screenshot is at: ${imagePath}.` : "";
    const prompt = `Build this UI from the following design specs, pinned from a reference screenshot.${imageRef}\n\n${json}`;
    onSubmitAgent(prompt);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[90vw] max-w-[1040px] max-h-[85vh] flex flex-col"
        onClose={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Annotate Design Specs</DialogTitle>
          <DialogDescription>
            Upload a screenshot, click elements to pin design tokens, then send the specs to the
            agent.
          </DialogDescription>
        </DialogHeader>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
            e.target.value = "";
          }}
        />

        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4 overflow-hidden">
          {/* Canvas */}
          <div className="flex flex-col gap-2 min-h-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 h-8 text-xs font-semibold rounded-full bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                {previewUrl ? "Replace screenshot" : "Upload screenshot"}
              </button>
              {previewUrl && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {isUploading ? "Uploading…" : "Click any element to drop a spec pin"}
                </span>
              )}
            </div>

            <div className="flex-1 min-h-0 overflow-auto rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03]">
              {previewUrl ? (
                <div className="relative inline-block cursor-crosshair" onClick={handleImageClick}>
                  <img
                    ref={imgRef}
                    src={previewUrl}
                    alt="Uploaded design screenshot"
                    draggable={false}
                    className="block max-w-full select-none"
                  />
                  {annotations.map((a, index) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        editAnnotation(a.id);
                      }}
                      title={a.name}
                      className={cn(
                        "absolute flex items-center justify-center w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full text-[10px] font-bold text-white shadow-md",
                        "bg-fuchsia-500 ring-2 ring-white dark:ring-neutral-900",
                        draft?.id === a.id && "ring-2 ring-fuchsia-500 ring-offset-1",
                      )}
                      style={{ left: `${a.x}%`, top: `${a.y}%` }}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {draft && !isEditing && (
                    <span
                      className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900 pointer-events-none"
                      style={{ left: `${draft.x}%`, top: `${draft.y}%` }}
                    />
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 h-full min-h-[320px] cursor-pointer"
                >
                  <UploadCloud className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Click to upload a Figma screenshot
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">PNG or JPG</p>
                </div>
              )}
            </div>
          </div>

          {/* Side panel: form or list */}
          <div className="min-h-0 overflow-y-auto border border-neutral-200 dark:border-white/10 rounded-lg p-3">
            {draft ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {isEditing ? "Edit spec" : "New spec"}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">
                    x {Math.round(draft.x)}% · y {Math.round(draft.y)}%
                  </span>
                </div>

                <label className="flex flex-col gap-1">
                  <span className={labelClass}>
                    Component name <span className="text-red-500">*</span>
                  </span>
                  <input
                    autoFocus
                    type="text"
                    value={draft.name}
                    placeholder="Primary Button"
                    onChange={(e) => {
                      updateDraft({ name: e.target.value });
                      if (nameError) setNameError(false);
                    }}
                    className={cn(fieldClass, nameError && "ring-1 ring-red-500")}
                  />
                  {nameError && <span className="text-[11px] text-red-500">Name is required</span>}
                </label>

                <label className="flex flex-col gap-1">
                  <span className={labelClass}>Type</span>
                  <select
                    value={draft.type}
                    onChange={(e) => updateDraft({ type: e.target.value as AnnotationType })}
                    className={fieldClass}
                  >
                    {ANNOTATION_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className={labelClass}>States</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(Object.keys(draft.specsByState) as AnnotationState[]).map((s) => (
                      <span
                        key={s}
                        className={cn(
                          "flex items-center gap-1 pl-2.5 pr-1 h-6 rounded-full text-[11px] font-medium capitalize cursor-pointer transition-colors",
                          activeState === s
                            ? "bg-fuchsia-500 text-white"
                            : "bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/15",
                        )}
                        onClick={() => setActiveState(s)}
                      >
                        {s}
                        {Object.keys(draft.specsByState).length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeState(s);
                            }}
                            className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/15"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </span>
                    ))}
                    {ANNOTATION_STATES.filter((s) => !draft.specsByState[s]).length > 0 && (
                      <select
                        value=""
                        onChange={(e) => e.target.value && addState(e.target.value as AnnotationState)}
                        className="h-6 rounded-full border border-dashed border-neutral-300 dark:border-white/20 bg-transparent text-[11px] text-neutral-500 dark:text-neutral-400 pl-1.5 pr-1 focus:outline-none cursor-pointer"
                      >
                        <option value="">
                          + Add state
                        </option>
                        {ANNOTATION_STATES.filter((s) => !draft.specsByState[s]).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Text color</span>
                    <div className="flex gap-1.5">
                      <input
                        type="color"
                        value={
                          /^#[0-9a-f]{6}$/i.test(activeSpecs.color) ? activeSpecs.color : "#000000"
                        }
                        onChange={(e) => updateSpec("color", e.target.value)}
                        className="w-8 h-8 rounded-md border border-neutral-300 dark:border-white/15 bg-transparent p-0.5 flex-shrink-0"
                      />
                      <input
                        type="text"
                        placeholder="#111111"
                        value={activeSpecs.color}
                        onChange={(e) => updateSpec("color", e.target.value)}
                        className={cn(fieldClass, "font-mono min-w-0")}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Background</span>
                    <div className="flex gap-1.5">
                      <input
                        type="color"
                        value={
                          /^#[0-9a-f]{6}$/i.test(activeSpecs.backgroundColor)
                            ? activeSpecs.backgroundColor
                            : "#ffffff"
                        }
                        onChange={(e) => updateSpec("backgroundColor", e.target.value)}
                        className="w-8 h-8 rounded-md border border-neutral-300 dark:border-white/15 bg-transparent p-0.5 flex-shrink-0"
                      />
                      <input
                        type="text"
                        placeholder="#007AFF"
                        value={activeSpecs.backgroundColor}
                        onChange={(e) => updateSpec("backgroundColor", e.target.value)}
                        className={cn(fieldClass, "font-mono min-w-0")}
                      />
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Padding</span>
                    <input
                      type="text"
                      placeholder="12px 16px"
                      value={activeSpecs.padding}
                      onChange={(e) => updateSpec("padding", e.target.value)}
                      className={cn(fieldClass, "font-mono")}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Radius</span>
                    <input
                      type="text"
                      placeholder="8px"
                      value={activeSpecs.borderRadius}
                      onChange={(e) => updateSpec("borderRadius", e.target.value)}
                      className={cn(fieldClass, "font-mono")}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Font</span>
                    <input
                      type="text"
                      placeholder="Inter"
                      value={activeSpecs.fontFamily}
                      onChange={(e) => updateSpec("fontFamily", e.target.value)}
                      className={cn(fieldClass, "font-mono")}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Size</span>
                    <input
                      type="text"
                      placeholder="14px"
                      value={activeSpecs.fontSize}
                      onChange={(e) => updateSpec("fontSize", e.target.value)}
                      className={cn(fieldClass, "font-mono")}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Weight</span>
                    <input
                      type="text"
                      placeholder="500"
                      value={activeSpecs.fontWeight}
                      onChange={(e) => updateSpec("fontWeight", e.target.value)}
                      className={cn(fieldClass, "font-mono")}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1">
                  <span className={labelClass}>Shadow</span>
                  <input
                    type="text"
                    placeholder="0 2px 8px rgba(0,0,0,0.15)"
                    value={activeSpecs.boxShadow}
                    onChange={(e) => updateSpec("boxShadow", e.target.value)}
                    className={cn(fieldClass, "font-mono")}
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className={labelClass}>Notes</span>
                  <textarea
                    rows={2}
                    placeholder="Primary action button"
                    value={draft.notes}
                    onChange={(e) => updateDraft({ notes: e.target.value })}
                    className={cn(fieldClass, "resize-none")}
                  />
                </label>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(null);
                      setIsEditing(false);
                    }}
                    className="px-3 h-8 text-xs font-medium rounded-full border border-neutral-300 dark:border-white/15 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="px-3 h-8 text-xs font-semibold rounded-full bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
                  >
                    {isEditing ? "Update spec" : "Save spec"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Specs{" "}
                    <span className="text-neutral-400 dark:text-neutral-500 font-normal">
                      ({annotations.length})
                    </span>
                  </h3>
                  {annotations.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setAnnotations([])}
                      className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {annotations.length === 0 ? (
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center py-8 border border-dashed border-neutral-200 dark:border-white/10 rounded-md">
                    No specs yet. Click an element on the image to start.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1.5">
                    {annotations.map((a, index) => (
                      <li
                        key={a.id}
                        className="flex items-center gap-2 rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.04] px-2 py-1.5"
                      >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-fuchsia-500 text-white text-[10px] font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {a.name}
                          </p>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 capitalize">
                            {a.type} ·{" "}
                            {Object.keys(a.specsByState).length === 1
                              ? Object.keys(a.specsByState)[0]
                              : `${Object.keys(a.specsByState).length} states`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => editAnnotation(a.id)}
                          title="Edit"
                          className="flex items-center justify-center w-6 h-6 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-white/10 flex-shrink-0"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteAnnotation(a.id)}
                          title="Delete"
                          className="flex items-center justify-center w-6 h-6 rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-500/10 flex-shrink-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            disabled={annotations.length === 0}
            className="flex items-center gap-1.5 px-3 h-8 text-xs font-medium rounded-full border border-neutral-300 dark:border-white/15 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy JSON"}
          </button>
          <button
            type="button"
            onClick={handleSendToAgent}
            disabled={annotations.length === 0}
            className={cn(
              "flex items-center gap-1.5 px-4 h-8 text-xs font-semibold rounded-full transition-all text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
              "bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-fuchsia-500/30 hover:shadow-md hover:shadow-fuchsia-500/40 hover:scale-[1.03]",
            )}
          >
            <Wand2 className="w-3.5 h-3.5" />
            Send specs to agent
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
