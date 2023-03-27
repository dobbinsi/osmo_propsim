import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type DraggableProps = {
  id: string;
  styles?: React.CSSProperties;
  name?: string;
  logo?: string;
  power: string;
};

export function Draggable(props: DraggableProps) {
  const { id, styles, name, logo, power } = props;
  //Read more about the useDraggable hook here: https://docs.dndkit.com/api-documentation/draggable/usedraggable
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id, //This unique id is required
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  const powerNumber = parseFloat(power);
  const powerDecimal = (powerNumber / Math.pow(10, 6)).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    <div
      //This callback ref is important, it tells dnd-kit that this is a draggable component
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      className="draggable"
      //It is important that you spread the listeners & attributes object on the
      //element you want to 'listen' for drag event.
      {...listeners}
      {...attributes}
    >
      <div className="val-container">
        <div className="logo-box">
          <img src={logo} className="vlogo" alt="logo" />
          <h4>{name}</h4>
        </div>
        <div className="vinfo">
          <div className="vinfo-power">
            <h5>{powerDecimal}</h5>
            <h5 className="osmolabel">OSMO</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
