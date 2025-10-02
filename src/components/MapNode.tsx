import { motion } from "framer-motion";

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
}

export const MapNode = ({ node, isSelected, onClick }: MapNodeProps) => {
  const getNodeColor = () => {
    switch (node.status) {
      case "completed":
        return "hsl(140 60% 50%)";
      case "current":
        return "hsl(180 100% 50%)";
      case "locked":
        return "hsl(220 15% 20%)";
    }
  };

  const getGlowIntensity = () => {
    if (node.status === "locked") return 0;
    if (node.status === "current") return 1;
    return 0.6;
  };

  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Glow effect */}
      {node.status !== "locked" && (
        <circle
          cx={node.x}
          cy={node.y}
          r="45"
          fill={getNodeColor()}
          opacity={getGlowIntensity() * 0.2}
          filter="url(#glow)"
        >
          <animate
            attributeName="r"
            values="45;50;45"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Main node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r="30"
        fill={node.status === "locked" ? "hsl(220 15% 12%)" : "hsl(220 15% 10%)"}
        stroke={getNodeColor()}
        strokeWidth={isSelected ? "4" : "2"}
        filter={node.status !== "locked" ? "url(#glow)" : undefined}
        className="transition-all duration-300"
      />

      {/* Inner circle for completed/current */}
      {node.status !== "locked" && (
        <circle
          cx={node.x}
          cy={node.y}
          r="20"
          fill={getNodeColor()}
          opacity="0.3"
        />
      )}

      {/* Lock icon for locked nodes */}
      {node.status === "locked" && (
        <g>
          <rect
            x={node.x - 8}
            y={node.y - 4}
            width="16"
            height="12"
            rx="2"
            fill="hsl(220 15% 30%)"
          />
          <path
            d={`M ${node.x - 6} ${node.y - 4} v -6 a 6 6 0 0 1 12 0 v 6`}
            fill="none"
            stroke="hsl(220 15% 30%)"
            strokeWidth="2"
          />
        </g>
      )}

      {/* Checkmark for completed */}
      {node.status === "completed" && (
        <path
          d={`M ${node.x - 8} ${node.y} l 6 6 l 10 -12`}
          fill="none"
          stroke={getNodeColor()}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Pulse for current node */}
      {node.status === "current" && (
        <circle
          cx={node.x}
          cy={node.y}
          r="10"
          fill={getNodeColor()}
          opacity="0.8"
        >
          <animate
            attributeName="r"
            values="10;15;10"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Node title */}
      <text
        x={node.x}
        y={node.y + 50}
        textAnchor="middle"
        className="text-sm font-medium pointer-events-none"
        fill={node.status === "locked" ? "hsl(220 15% 30%)" : "hsl(180 100% 80%)"}
      >
        {node.title}
      </text>

      {/* Description on hover/select */}
      {isSelected && node.description && (
        <foreignObject
          x={node.x + 40}
          y={node.y - 50}
          width="200"
          height="100"
        >
          <div className="bg-card border border-primary/30 rounded-lg p-3 text-xs text-foreground glow-soft">
            {node.description}
          </div>
        </foreignObject>
      )}
    </g>
  );
};
