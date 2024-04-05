import { Link } from "react-router-dom";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";
import { useAppDispatch } from "../../redux/store";
import { updateTaskBoard } from "../../redux/taskBoard/taskBoardAsyncThunk";
import EditableTitle from "../editableTitle/EditableTitle";
import styles from "./BoardCard.module.scss";
interface BoardCardProps {
  board: TaskBoard;
  children: React.ReactElement;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, children }) => {
  const dispatch = useAppDispatch();

  const handleBoardTitleSave = (id: number, newTitle: string): void => {
    if (newTitle) {
      dispatch(updateTaskBoard({ id, newTitle }));
      //  setActiveTitleInput(null);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.inputContainer}>
        <EditableTitle
          onSave={handleBoardTitleSave}
          id={board.id}
          initialValue={board.title}
        />
        {children}
      </div>
      <Link
        to={`board/${board.id}`}
        // className={`border-dashed border-4 border-gray-600 flex cursor-pointer rounded-lg w-64 h-32 m-8 justify-center bg-gray-300`}
      >
        <div className="flex items-center">
          <h2>Go to board</h2>
        </div>
      </Link>
    </div>
  );
};

export default BoardCard;
