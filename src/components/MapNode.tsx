import { Lock, CheckCircle2 } from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
  title: string;
  status: "locked" | "current" | "completed";
  chapter: number;
  description?: string;
}

interface MapNodeProps {
  node: Node;
  isSelected: boolean;
  onClick: () => void;
  mapStyle: "default" | "network" | "organic";
}

export const MapNode = ({ node, isSelected, onClick, mapStyle }: MapNodeProps) => {
  const getNodeColor = () => {
    switch (node.status) {
      case "locked":
        return "hsl(186 12% 25%)";
      case "current":
        return "hsl(157 72% 47%)";
      case "completed":
        return "hsl(157 72% 47%)";
      default:
        return "hsl(186 12% 25%)";
    }
  };

  const getGlowColor = () => {
    switch (node.status) {
      case "current":
        return "hsl(157 72% 67%)";
      case "completed":
        return "hsl(157 72% 67%)";
      default:
        return "none";
    }
  };
  
  const getNodeSize = () => {
    switch (mapStyle) {
      case "network":
        return { outer: 28, inner: 18 };
      case "organic":
        return { outer: 42, inner: 32 };
      default:
        return { outer: 35, inner: 25 };
    }
  };
  
  const size = getNodeSize();

  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Node shape based on style */}
      {mapStyle === "network" && (
        <>
          <circle
            cx={node.x}
            cy={node.y}
            r={size.outer}
            fill="none"
            stroke={getNodeColor()}
            strokeWidth="3"
            filter={node.status !== "locked" ? "url(#glow)" : "none"}
            className="transition-all duration-300"
            style={{ opacity: node.status === "locked" ? 0.3 : 1 }}
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={size.inner}
            fill={getNodeColor()}
            stroke={node.status !== "locked" ? getGlowColor() : getNodeColor()}
            strokeWidth="2"
            className="transition-all duration-300 cursor-pointer hover:brightness-125"
            style={{
              opacity: node.status === "locked" ? 0.5 : 1,
              filter: node.status !== "locked" ? `drop-shadow(0 0 8px ${getGlowColor()})` : "none",
            }}
          />
        </>
      )}
      
      {mapStyle === "organic" && (
        <>
          <ellipse
            cx={node.x}
            cy={node.y}
            rx={size.outer * 1.2}
            ry={size.outer * 0.8}
            fill="none"
            stroke={getNodeColor()}
            strokeWidth="4"
            filter={node.status !== "locked" ? "url(#glow)" : "none"}
            className="transition-all duration-300"
            style={{ opacity: node.status === "locked" ? 0.3 : 1 }}
            transform={`rotate(${node.id.charCodeAt(0) * 10} ${node.x} ${node.y})`}
          />
          <ellipse
            cx={node.x}
            cy={node.y}
            rx={size.inner * 1.2}
            ry={size.inner * 0.8}
            fill={getNodeColor()}
            stroke={node.status !== "locked" ? getGlowColor() : getNodeColor()}
            strokeWidth="2"
            className="transition-all duration-300 cursor-pointer hover:brightness-125"
            style={{
              opacity: node.status === "locked" ? 0.5 : 1,
              filter: node.status !== "locked" ? `drop-shadow(0 0 8px ${getGlowColor()})` : "none",
            }}
            transform={`rotate(${node.id.charCodeAt(0) * 10} ${node.x} ${node.y})`}
          />
        </>
      )}
      
      {mapStyle === "default" && (
        <>
          <circle
            cx={node.x}
            cy={node.y}
            r={size.outer}
            fill="none"
            stroke={getNodeColor()}
            strokeWidth="5"
            filter={node.status !== "locked" ? "url(#glow)" : "none"}
            className="transition-all duration-300"
            style={{ opacity: node.status === "locked" ? 0.3 : 1 }}
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={size.inner}
            fill={getNodeColor()}
            stroke={node.status !== "locked" ? getGlowColor() : getNodeColor()}
            strokeWidth="3"
            className="transition-all duration-300 cursor-pointer hover:brightness-125"
            style={{
              opacity: node.status === "locked" ? 0.5 : 1,
              filter: node.status !== "locked" ? `drop-shadow(0 0 8px ${getGlowColor()})` : "none",
            }}
          />
        </>
      )}

      {/* Status icons */}
      {node.status === "locked" && (
        <g transform={`translate(${node.x - 8}, ${node.y - 8})`}>
          <Lock className="w-4 h-4" color="hsl(220 13% 69%)" />
        </g>
      )}

      {node.status === "completed" && (
        <g transform={`translate(${node.x - 10}, ${node.y - 10})`}>
          <CheckCircle2 className="w-5 h-5" color={getGlowColor()} />
        </g>
      )}

      {/* Pulse for current node */}
      {node.status === "current" && (
        <circle
          cx={node.x}
          cy={node.y}
          r="15"
          fill={getNodeColor()}
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="15;20;15"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Node title */}
      <text
        x={node.x}
        y={node.y + 65}
        textAnchor="middle"
        className="text-base font-display font-black pointer-events-none select-none tracking-tight"
        fill={node.status === "locked" ? "hsl(220 13% 69%)" : "hsl(210 100% 97%)"}
        style={{
          textShadow: node.status !== "locked" ? `0 0 8px ${getGlowColor()}` : "none",
        }}
      >
        {node.title}
      </text>

      {/* Description on hover/select */}
      {(isSelected || node.status === "current") && node.description && (
        <foreignObject
          x={node.x - 140}
          y={node.y - 200}
          width="280"
          height="auto"
          className="pointer-events-none"
        >
          <div className="glass-card rounded-xl p-4 shadow-2xl border-primary/50">
            <h3 className="text-sm font-display font-black text-primary mb-2 tracking-tight">
              {node.title}
            </h3>
            <p className="text-xs font-body text-foreground/90 leading-relaxed font-light">
              {node.description}
            </p>
          </div>
        </foreignObject>
      )}
    </g>
  );
};
