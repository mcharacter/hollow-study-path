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
        return "hsl(145 80% 55%)";
      case "current":
        return "hsl(180 100% 55%)";
      case "locked":
        return "hsl(222 30% 25%)";
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
        r="35"
        fill={node.status === "locked" ? "hsl(222 30% 12%)" : "hsl(222 40% 8%)"}
        stroke={getNodeColor()}
        strokeWidth={isSelected ? "5" : "3"}
        filter={node.status !== "locked" ? "url(#glow)" : undefined}
        className="transition-all duration-300"
      />

      {/* Inner circle for completed/current */}
      {node.status !== "locked" && (
        <circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill={getNodeColor()}
          opacity="0.4"
        />
      )}

      {/* Lock icon for locked nodes */}
      {node.status === "locked" && (
        <g>
          <rect
            x={node.x - 9}
            y={node.y - 5}
            width="18"
            height="14"
            rx="2"
            fill="hsl(222 30% 35%)"
          />
          <path
            d={`M ${node.x - 7} ${node.y - 5} v -7 a 7 7 0 0 1 14 0 v 7`}
            fill="none"
            stroke="hsl(222 30% 35%)"
            strokeWidth="2.5"
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
        y={node.y + 60}
        textAnchor="middle"
        className="text-base font-display font-semibold pointer-events-none"
        fill={node.status === "locked" ? "hsl(222 30% 40%)" : "hsl(180 100% 85%)"}
      >
        {node.title}
      </text>

      {/* Description on hover/select */}
      {isSelected && node.description && (
        <foreignObject
          x={node.x + 50}
          y={node.y - 70}
          width="280"
          height="auto"
        >
          <div className="bg-card/95 backdrop-blur-xl border-2 border-primary/50 rounded-xl p-5 text-sm text-foreground shadow-2xl glow-intense font-body">
            <h4 className="font-display font-bold text-primary mb-2">{node.title}</h4>
            <p className="text-muted-foreground leading-relaxed">{node.description}</p>
          </div>
        </foreignObject>
      )}
    </g>
  );
};
