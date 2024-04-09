import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";
import { useAppDispatch } from "../../redux/store";
import { updateTaskBoard } from "../../redux/taskBoard/taskBoardAsyncThunk";
import EditableTitle from "../editableTitle/EditableTitle";
interface BoardCardProps {
  board: TaskBoard;
  children: React.ReactElement;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, children }) => {
  const dispatch = useAppDispatch();
  const editTitleRef = useRef<HTMLInputElement>(null);
  const [activeTitleInput, setActiveTitleInput] = useState<number | null>(null);

  const handleBoardTitleSave = (id: number, newTitle: string): void => {
    if (newTitle) {
      dispatch(updateTaskBoard({ id, newTitle }));
      setActiveTitleInput(null);
    }
  };

  return (
    <div
      className={`border-solid border-2  flex border-cyan-600 flex-col cursor-pointer rounded-lg w-64 h-32 justify-center bg-cyan-100 relative p-5`}
    >
      <div className="mb-5">
        <EditableTitle
          ref={editTitleRef}
          isActive={activeTitleInput === board.id}
          handleClick={() => setActiveTitleInput(board.id)}
          onSave={handleBoardTitleSave}
          id={board.id}
          initialValue={board.title}
        />
        {children}
      </div>
      <Link to={`board/${board.id}`}>
        <div className="flex items-center">
          <h2>Go to board</h2>
        </div>
      </Link>
    </div>
  );
};

export default BoardCard;
