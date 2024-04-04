import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/home/Home"));
const BoardPage = lazy(() => import("./pages/board/BoardPage"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/board/:id" element={<BoardPage />}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
