import React, { useCallback, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Loader2, UploadCloud, X, Wand2 } from "lucide-react";
import { cn } from "../lib/utils";
import { getDevServerBaseUrl } from "../utils/config-loader";

interface DesignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Sends a prompt to the currently selected agent, same as the main chat input. */
  onSubmitAgent: (text: string) => void;
}

interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  path: string | null;
  status: "uploading" | "done" | "error";
  error?: string;
}

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export const DesignDialog: React.FC<DesignDialogProps> = ({
  open,
  onOpenChange,
  onSubmitAgent,
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [instructions, setInstructions] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = useCallback(async (file: File) => {
    const id = `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const previewUrl = URL.createObjectURL(file);

    setImages((prev) => [...prev, { id, file, previewUrl, path: null, status: "uploading" }]);

    try {
      const dataUrl = await fileToDataUrl(file);
      const response = await fetch(`${getDevServerBaseUrl()}/__inspector__/save-picked-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl, filename: file.name }),
      });

      if (!response.ok) throw new Error(await response.text());

      const { path } = await response.json();
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, path, status: "done" } : img)));
    } catch (err) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? {
                ...img,
                status: "error",
                error: err instanceof Error ? err.message : String(err),
              }
            : img,
        ),
      );
    }
  }, []);

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      files.forEach(uploadImage);
    },
    [uploadImage],
  );

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const readyImages = images.filter((img) => img.status === "done" && img.path);
  const isUploading = images.some((img) => img.status === "uploading");

  const handleGenerate = () => {
    if (readyImages.length === 0) return;

    const paths = readyImages.map((img) => img.path).join(", ");
    const prompt = instructions.trim()
      ? `Design a new screen based on the attached reference image(s): ${paths}. ${instructions.trim()}`
      : `Design a new screen based on the attached reference image(s): ${paths}.`;

    onSubmitAgent(prompt);

    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setInstructions("");
    onOpenChange(false);
  };

  const handleClose = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setInstructions("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60vw] max-w-[640px]" onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Design a New Screen</DialogTitle>
          <DialogDescription>
            Upload reference mockups or screenshots and describe what you want built.
          </DialogDescription>
        </DialogHeader>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-2 py-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors",
            isDraggingOver
              ? "border-fuchsia-500 bg-fuchsia-500/5"
              : "border-neutral-300 dark:border-white/15 hover:border-neutral-400 dark:hover:border-white/25",
          )}
        >
          <UploadCloud className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Click to upload or drag and drop images
          </p>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-3 max-h-[220px] overflow-y-auto">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-md overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.06]"
              >
                <img src={img.previewUrl} alt={img.file.name} className="w-full h-full object-cover" />
                {img.status === "uploading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                )}
                {img.status === "error" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-500/60 p-1">
                    <span className="text-[10px] text-white text-center">{img.error || "Failed"}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(img.id);
                  }}
                  className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Describe what you want built from these references (optional)..."
          rows={3}
          className="w-full resize-none rounded-md border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/5 p-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={readyImages.length === 0 || isUploading}
            className={cn(
              "flex items-center gap-1.5 px-4 h-9 text-sm font-semibold rounded-full transition-all text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
              "bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-fuchsia-500/30 hover:shadow-md hover:shadow-fuchsia-500/40 hover:scale-[1.03]",
            )}
          >
            <Wand2 className="w-4 h-4" />
            Generate Screen
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
