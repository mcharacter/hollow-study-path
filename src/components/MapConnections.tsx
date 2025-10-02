interface Node {
  id: string;
  x: number;
  y: number;
  status: "locked" | "current" | "completed";
  connections?: string[];
}

interface MapConnectionsProps {
  nodes: Node[];
}

export const MapConnections = ({ nodes }: MapConnectionsProps) => {
  const getConnectionColor = (fromNode: Node, toNode: Node) => {
    if (fromNode.status === "completed" && toNode.status !== "locked") {
      return "hsl(140 60% 50%)";
    }
    if (fromNode.status === "current" || toNode.status === "current") {
      return "hsl(180 100% 50%)";
    }
    return "hsl(220 15% 20%)";
  };

  const getConnectionOpacity = (fromNode: Node, toNode: Node) => {
    if (fromNode.status === "locked" || toNode.status === "locked") {
      return "0.2";
    }
    return "0.5";
  };

  return (
    <g>
      {nodes.map((node) =>
        node.connections?.map((targetId) => {
          const targetNode = nodes.find((n) => n.id === targetId);
          if (!targetNode) return null;

          const color = getConnectionColor(node, targetNode);
          const opacity = getConnectionOpacity(node, targetNode);

          // Calculate control points for curved path
          const midX = (node.x + targetNode.x) / 2;
          const midY = (node.y + targetNode.y) / 2;
          const dx = targetNode.x - node.x;
          const dy = targetNode.y - node.y;
          const offset = Math.sqrt(dx * dx + dy * dy) * 0.2;
          const controlX = midX - dy * offset * 0.001;
          const controlY = midY + dx * offset * 0.001;

          return (
            <g key={`${node.id}-${targetId}`}>
              {/* Glow layer */}
              {node.status !== "locked" && targetNode.status !== "locked" && (
                <path
                  d={`M ${node.x} ${node.y} Q ${controlX} ${controlY} ${targetNode.x} ${targetNode.y}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="6"
                  opacity="0.1"
                  filter="url(#glow)"
                />
              )}
              
              {/* Main connection line */}
              <path
                d={`M ${node.x} ${node.y} Q ${controlX} ${controlY} ${targetNode.x} ${targetNode.y}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                opacity={opacity}
                strokeDasharray={node.status === "locked" ? "5,5" : "none"}
              />

              {/* Animated flow for active connections */}
              {node.status === "completed" && targetNode.status !== "locked" && (
                <circle r="4" fill={color}>
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={`M ${node.x} ${node.y} Q ${controlX} ${controlY} ${targetNode.x} ${targetNode.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })
      )}
    </g>
  );
};
