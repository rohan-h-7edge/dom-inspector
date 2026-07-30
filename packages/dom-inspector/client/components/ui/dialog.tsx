"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  return <>{children}</>;
}

function DialogTrigger({ children, ...props }: React.ComponentProps<"button">) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

function DialogClose({ children, onClick, ...props }: React.ComponentProps<"button">) {
  return (
    <button type="button" onClick={onClick} {...props}>
      {children}
    </button>
  );
}

interface DialogContentProps extends React.ComponentProps<"div"> {
  showCloseButton?: boolean;
  container?: HTMLElement | null;
  onClose?: () => void;
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  onClose,
  ...props
}: DialogContentProps) {
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[1000000] bg-black/50 animate-in fade-in-0 duration-200"
        onClick={onClose}
      />
      {/* Content */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 z-[1000001] -translate-x-1/2 -translate-y-1/2",
          // Explicit solid colors, not the CSS-variable-driven `bg-background`
          // utility: inside a shadow root, `hsl(var(--background))`-style
          // utilities have been observed to fail to paint solid, letting
          // page content behind the dialog bleed through.
          "bg-white dark:bg-neutral-900 text-foreground",
          "border border-border/80 rounded-xl p-6 shadow-2xl shadow-black/20 ring-1 ring-black/5",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          "w-full max-w-lg", // Default width, can be overridden by className
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-full text-neutral-500 dark:text-neutral-300 bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-lg leading-none font-semibold text-neutral-900 dark:text-neutral-50",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)} {...props} />
  );
}

// Keep these exports for backwards compatibility but they're no longer needed
const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const DialogOverlay = () => null;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
