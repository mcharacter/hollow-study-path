import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const ZoomControls = ({ onZoomIn, onZoomOut, onReset }: ZoomControlsProps) => {
  return (
    <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
      <Button
        size="icon"
        onClick={onZoomIn}
        className="bg-card border border-primary/30 hover:bg-card/80 glow-soft"
      >
        <ZoomIn className="w-5 h-5 text-primary" />
      </Button>
      <Button
        size="icon"
        onClick={onZoomOut}
        className="bg-card border border-primary/30 hover:bg-card/80 glow-soft"
      >
        <ZoomOut className="w-5 h-5 text-primary" />
      </Button>
      <Button
        size="icon"
        onClick={onReset}
        className="bg-card border border-primary/30 hover:bg-card/80 glow-soft"
      >
        <Maximize2 className="w-5 h-5 text-primary" />
      </Button>
    </div>
  );
};
