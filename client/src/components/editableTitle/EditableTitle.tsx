import React, { useState, forwardRef } from "react";

export interface EditableTitleProps {
  id: number;
  initialValue: string;
  onSave: (id: number, newTitle: string) => void;
  handleClick?: () => void;
  isActive?: boolean;
}

const EditableTitle: React.ForwardRefRenderFunction<
  HTMLInputElement,
  EditableTitleProps
> = ({ initialValue, onSave, id, isActive, handleClick }, ref) => {
  const [title, setTitle] = useState(initialValue);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    onSave(id, title);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSave(id, title);
    }
  };

  return (
    <input
      ref={ref}
      className={`"text-xl font-bold  outline-none w-[230px] pr-12" ${
        isActive
          ? "border-solid border-t-1 border-l-0 border-r-0 border-b-1 border-t-0 border-cyan-600"
          : ""
      }`}
      type="text"
      id={`input-${id}`}
      name="title"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      onClick={handleClick}
    />
  );
};

export default forwardRef(EditableTitle);
