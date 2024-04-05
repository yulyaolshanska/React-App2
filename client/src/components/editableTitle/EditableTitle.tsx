import React, { useState } from "react";
import styles from "./EditableTitle.module.scss";

interface EditableTitleProps {
  id: number;
  initialValue: string;
  onSave: (id: number, newTitle: string) => void;
  isActive?: boolean;
}

const EditableTitle: React.FC<EditableTitleProps> = ({
  initialValue,
  onSave,
  id,
  isActive,
}) => {
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
      className={`${styles.boardTitleInput} ${
        isActive ? styles.activeInput : ""
      }`}
      type="text"
      id={`input-${id}`}
      name="title"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
    />
  );
};

export default EditableTitle;
