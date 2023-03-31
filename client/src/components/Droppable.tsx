import React from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
};

export function Droppable(props: DroppableProps) {
  const { children, id, className } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    background: isOver && !(id === "ROOT") ? "#6161ab" : "",
    borderRadius: "10px",
  };

  return (
    <div ref={setNodeRef} className={className} style={style}>
      {children}
    </div>
  );
}
