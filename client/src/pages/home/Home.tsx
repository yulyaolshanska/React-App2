import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoardCard from "../../components/boardCard/BoardCart";
import AddButton from "../../components/buttons/addButton/AddButton";
import DropDown from "../../components/dropDown/DropDown";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";
import { useAppDispatch } from "../../redux/store";
import {
  addTaskBoard,
  deleteTaskBoard,
  getAllTaskBoards,
} from "../../redux/taskBoard/taskBoardAsyncThunk";
import { selectTaskBoards } from "../../redux/taskBoard/taskBoardSelectors";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeTitleInput, setActiveTitleInput] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getAllTaskBoards());
  }, [dispatch]);

  const boards: TaskBoard[] = useSelector(selectTaskBoards);

  const handleDeleteTaskBoard = (id: number) => {
    dispatch(deleteTaskBoard(id));
  };

  const focusInput = (id: number) => {
    setActiveTitleInput(id);
    const input = document.getElementById(
      `input-${id}`
    ) as HTMLInputElement | null;
    if (input) {
      input.focus();
    }
  };

  const handleAddNewBoard = () => {
    let maxId = 0;
    if (boards.length > 0) {
      maxId = Math.max(...boards.map((board) => board.id), 0);
    }
    const newId = maxId + 1;
    const newTaskBoard: TaskBoard = {
      id: newId,
      title: "New Board",
    };
    dispatch(addTaskBoard(newTaskBoard));
  };

  return (
    <div className="p-5">
      <AddButton onClick={handleAddNewBoard} text="+ Add new board" />
      {boards.length === 0 ? (
        <div>You don't have any boards</div>
      ) : (
        <div className="flex gap-5 flex-wrap p-5">
          {boards.length > 0 &&
            boards.map((board) => (
              <BoardCard key={board.id} board={board}>
                <DropDown
                  onEditClick={() => focusInput(board.id)}
                  onDeleteClick={() => handleDeleteTaskBoard(board.id)}
                  mode="task"
                />
              </BoardCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
