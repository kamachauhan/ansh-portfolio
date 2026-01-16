import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    path: string;
    name: string;
    type: 'image' | 'video' | 'pdf';
  }>;
  initialIndex: number;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  initialIndex = 0,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const currentItem = items[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items.length]);

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full max-h-[90vh] p-0 bg-black/95 border-0">
        <div className="relative w-full h-full flex flex-col">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Media display */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {currentItem.type === "image" && (
              <img
                src={currentItem.path}
                alt={currentItem.name}
                className="max-w-full max-h-full object-contain"
              />
            )}
            {currentItem.type === "video" && (
              <video
                src={currentItem.path}
                controls
                className="max-w-full max-h-full object-contain"
                autoPlay
              />
            )}
            {currentItem.type === "pdf" && (
              <div className="flex flex-col items-center justify-center text-white">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg">{currentItem.name}</p>
                <a
                  href={currentItem.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                >
                  Open PDF
                </a>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-4 bg-black/50">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="text-white text-sm">
              {currentIndex + 1} / {items.length}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Filename */}
          <div className="px-4 py-2 bg-black/50 text-white text-sm text-center truncate">
            {currentItem.name}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
