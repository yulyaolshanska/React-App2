import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BoardCard from "../../components/boardCard/BoardCart";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";
import { useAppDispatch } from "../../redux/store";
import { getAllTaskBoards } from "../../redux/taskBoard/taskBoardAsyncThunk";
import { selectTaskBoards } from "../../redux/taskBoard/taskBoardSelectors";
import styles from "./Home.module.scss";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTaskBoards());
  }, [dispatch]);

  const boards: TaskBoard[] = useSelector(selectTaskBoards);

  return (
    <div className={styles.pageContainer}>
      <button>Add new board</button>
      {boards &&
        boards.map((board) => <BoardCard key={board.id} board={board} />)}
    </div>
  );
};

export default HomePage;
