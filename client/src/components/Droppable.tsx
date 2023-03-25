import React from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
};

export function Droppable(props: DroppableProps) {
  const { children, id, className } = props;
  //Read more about the useDroppable hook here: https://docs.dndkit.com/api-documentation/droppable/usedroppable
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    background: isOver && !(id === "ROOT") ? "#6161ab" : "",
    borderRadius: "10px",
  };

  return (
    //The callback "setNodeRef"  ref is important, it tells dnd-kit that this is a droppable component
    <div ref={setNodeRef} className={className} style={style}>
      {children}
    </div>
  );
}
