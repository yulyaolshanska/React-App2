import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoardCard from "../../components/boardCard/BoardCart";
import DropDown from "../../components/dropDown/DropDown";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";
import { useAppDispatch } from "../../redux/store";
import {
  addTaskBoard,
  deleteTaskBoard,
  getAllTaskBoards,
} from "../../redux/taskBoard/taskBoardAsyncThunk";
import { selectTaskBoards } from "../../redux/taskBoard/taskBoardSelectors";
import styles from "./Home.module.scss";

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
    const maxId = Math.max(...boards.map((board) => board.id), 0);
    const newId = maxId + 1;
    const newTaskBoard: TaskBoard = {
      id: newId,
      title: "New Board",
    };
    dispatch(addTaskBoard(newTaskBoard));
  };

  return (
    <div className={styles.pageContainer}>
      <button onClick={handleAddNewBoard}>Add new board</button>
      {boards &&
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
  );
};

export default HomePage;
