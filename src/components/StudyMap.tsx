import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapNode } from "./MapNode";
import { MapConnections } from "./MapConnections";
import { ParticleBackground } from "./ParticleBackground";
import { ZoomControls } from "./ZoomControls";
import { useMapData } from "@/hooks/useMapData";
import { ArrowLeft, Circle, GitBranch, Network } from "lucide-react";
import { Button } from "./ui/button";

type MapStyle = "default" | "network" | "organic";

interface StudyMapProps {
  subject: string;
  chapter: string;
  onBack: () => void;
}

export const StudyMap = ({ subject, chapter, onBack }: StudyMapProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyle>("default");
  const { chapters, nodes } = useMapData({ subject, chapter });

  return (
    <div className="relative w-full h-full">
      <ParticleBackground />
      
      {/* Back Button & Header */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="glass-card hover:border-primary hover:bg-primary/10 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </Button>
        <div className="glass-card rounded-xl px-6 py-3 shadow-xl">
          <h2 className="text-xl font-display font-black text-primary tracking-tight">{subject}</h2>
          <p className="text-sm text-muted-foreground font-body font-light">{chapter}</p>
        </div>
      </div>
      
      {/* Map Style Selector */}
      <div className="absolute top-6 right-6 z-50 glass-card rounded-xl p-3 shadow-xl">
        <div className="flex gap-2">
          <Button
            onClick={() => setMapStyle("default")}
            variant={mapStyle === "default" ? "default" : "ghost"}
            size="sm"
            className="transition-all duration-300"
          >
            <Circle className="w-4 h-4 mr-2" />
            Classic
          </Button>
          <Button
            onClick={() => setMapStyle("network")}
            variant={mapStyle === "network" ? "default" : "ghost"}
            size="sm"
            className="transition-all duration-300"
          >
            <Network className="w-4 h-4 mr-2" />
            Network
          </Button>
          <Button
            onClick={() => setMapStyle("organic")}
            variant={mapStyle === "organic" ? "default" : "ghost"}
            size="sm"
            className="transition-all duration-300"
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Organic
          </Button>
        </div>
      </div>
      
      <TransformWrapper
        initialScale={0.7}
        minScale={0.3}
        maxScale={2}
        centerOnInit
        centerZoomedOut
        wheel={{ smoothStep: 0.01 }}
        doubleClick={{ disabled: true }}
        limitToBounds={false}
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
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <svg
                className="mx-auto"
                style={{ width: "4000px", height: "3000px" }}
                viewBox="0 0 4000 3000"
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
                <MapConnections nodes={nodes} mapStyle={mapStyle} />

                {/* Nodes */}
                {nodes.map((node) => (
                  <MapNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNode === node.id}
                    onClick={() => setSelectedNode(node.id)}
                    mapStyle={mapStyle}
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
