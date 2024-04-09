import React, { useState, useEffect, useRef } from "react";

export interface DropDownProps {
  onAddClick?: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  mode: "list" | "task";
}

const DropDown: React.FC<DropDownProps> = ({
  onEditClick,
  onDeleteClick,
  onAddClick,
  mode,
}) => {
  const [isShowListMenu, setIsShowListMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    setIsShowListMenu((prev) => !prev);
  };

  const handleEdit = () => {
    onEditClick();
    setIsShowListMenu(false);
  };

  const handleAddCart = (): void => {
    if (onAddClick) {
      onAddClick();
    }
    setIsShowListMenu(false);
  };

  const handleDelete = (): void => {
    onDeleteClick();
    setIsShowListMenu(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsShowListMenu(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsShowListMenu(false);
    }
  };

  useEffect(() => {
    if (isShowListMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isShowListMenu]);

  return (
    <div ref={menuRef} className="absolute top-0 right-1">
      <button
        type="button"
        onClick={handleShowMenu}
        className="flex items-center gap-8 w-[20px] h-[30px] font-semibold"
      >
        ...
      </button>
      {isShowListMenu && (
        <div className="flex flex-col absolute left-0 top-full w-[160px] z-40 bg-white border-solid border-1 border-gray-400 rounded-md">
          <button
            type="button"
            onClick={() => handleEdit()}
            className="text-base leading-normal w-full text-left px-6 py-2"
          >
            Edit
          </button>
          {mode === "list" && (
            <button
              type="button"
              onClick={() => handleAddCart()}
              className="text-base leading-normal w-full text-left px-6 py-2"
            >
              Add new card
            </button>
          )}
          <button
            type="button"
            onClick={() => handleDelete()}
            className="text-base leading-normal w-full text-left px-6 py-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
