import { Link } from "react-router-dom";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";

interface BoardCardProps {
  board: TaskBoard;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  return (
    <Link
      to={`board/${board.id}`}
      //   className={`border-dashed border-4 border-gray-600 flex cursor-pointer rounded-lg w-64 h-32 m-8 justify-center bg-gray-300`}
    >
      <div className="flex items-center">
        <h1>{board.title}</h1>
      </div>
    </Link>
  );
};

export default BoardCard;
