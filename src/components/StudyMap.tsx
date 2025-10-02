import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapNode } from "./MapNode";
import { MapConnections } from "./MapConnections";
import { ParticleBackground } from "./ParticleBackground";
import { ZoomControls } from "./ZoomControls";
import { useMapData } from "@/hooks/useMapData";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface StudyMapProps {
  subject: string;
  chapter: string;
  onBack: () => void;
}

export const StudyMap = ({ subject, chapter, onBack }: StudyMapProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { chapters, nodes } = useMapData();

  return (
    <div className="relative w-full h-full">
      <ParticleBackground />
      
      {/* Back Button & Header */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="bg-card/80 backdrop-blur-xl border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </Button>
        <div className="bg-card/80 backdrop-blur-xl border-2 border-primary/30 rounded-xl px-6 py-3">
          <h2 className="text-xl font-display font-bold text-primary">{subject}</h2>
          <p className="text-sm text-muted-foreground font-body">{chapter}</p>
        </div>
      </div>
      
      <TransformWrapper
        initialScale={0.6}
        minScale={0.3}
        maxScale={2}
        centerOnInit
        wheel={{ smoothStep: 0.01 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform, centerView }) => (
          <>
            <ZoomControls
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onReset={resetTransform}
            />
            
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full"
            >
              <svg
                className="absolute inset-0"
                style={{ width: "4000px", height: "3000px" }}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  
                  <linearGradient id="mission1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(180 100% 55%)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(180 100% 55%)" stopOpacity="0.35" />
                  </linearGradient>
                  
                  <linearGradient id="mission2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(265 85% 65%)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(265 85% 65%)" stopOpacity="0.35" />
                  </linearGradient>
                  
                  <linearGradient id="mission3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(35 100% 60%)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(35 100% 60%)" stopOpacity="0.35" />
                  </linearGradient>
                </defs>

                {/* Chapter boundaries */}
                {chapters.map((chapter) => (
                  <g key={chapter.id}>
                    <ellipse
                      cx={chapter.x}
                      cy={chapter.y}
                      rx={chapter.width / 2}
                      ry={chapter.height / 2}
                      fill={`url(#mission${chapter.id})`}
                      stroke={chapter.color}
                      strokeWidth="2"
                      strokeDasharray="10,5"
                      opacity="0.3"
                      filter="url(#glow)"
                    />
                    <text
                      x={chapter.x}
                      y={chapter.y - chapter.height / 2 - 30}
                      textAnchor="middle"
                      className="text-3xl font-display font-bold text-glow"
                      fill={chapter.color}
                    >
                      {chapter.title}
                    </text>
                  </g>
                ))}

                {/* Connections between nodes */}
                <MapConnections nodes={nodes} />

                {/* Nodes */}
                {nodes.map((node) => (
                  <MapNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNode === node.id}
                    onClick={() => setSelectedNode(node.id)}
                  />
                ))}
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
