import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapNode } from "./MapNode";
import { MapConnections } from "./MapConnections";
import { ParticleBackground } from "./ParticleBackground";
import { ZoomControls } from "./ZoomControls";
import { useMapData } from "@/hooks/useMapData";

export const StudyMap = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { chapters, nodes } = useMapData();

  return (
    <div className="relative w-full h-full">
      <ParticleBackground />
      
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
                    <stop offset="0%" stopColor="hsl(180 100% 50%)" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="hsl(180 100% 50%)" stopOpacity="0.3" />
                  </linearGradient>
                  
                  <linearGradient id="mission2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(280 80% 60%)" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="hsl(280 80% 60%)" stopOpacity="0.3" />
                  </linearGradient>
                  
                  <linearGradient id="mission3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(40 100% 60%)" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="hsl(40 100% 60%)" stopOpacity="0.3" />
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
                      className="text-2xl font-bold text-glow"
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
