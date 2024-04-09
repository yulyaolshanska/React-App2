import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBoardHistory } from "../../redux/taskHistory/taskHistorySelectors";
import { formatDateWithTime } from "../../utils/formatDate";
import AddButton from "../buttons/addButton/AddButton";

const HistorySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (!e.target.closest(".history-sidebar")) {
          setIsOpen(false);
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const boardHistory = useSelector(selectBoardHistory);

  return (
    <AnimatePresence>
      <AddButton
        key={"history-button"}
        onClick={() => setIsOpen(!isOpen)}
        text="History"
      />
      {isOpen && (
        <>
          <motion.div
            key={"history-sidebar"}
            initial={{ translateX: 400 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: 400 }}
            transition={{
              duration: 0.1,
              type: "spring",
              damping: 30,
              stiffness: 200,
            }}
            className="max-w-[400px] w-full fixed h-screen bg-accent z-[1000] right-0 top-0 history-sidebar "
          >
            <div>
              <div className="w-full flex justify-between bg-white p-4 items-center">
                <div className="text-2xl font-semibold">History</div>
                <button
                  className="absolute right-5 top-5 w-6 h-6 flex items-center justify-center rounded-full bg-pink-800 text-white hover:bg-red-600"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  &times;
                </button>
              </div>

              <ul className="bg-white flex flex-col gap-6 pt-12 px-4 overflow-y-auto max-h-[93vh] h-screen">
                {boardHistory.length > 0 &&
                  boardHistory.map((history) => (
                    <li className="flex list-disc mb-3 ml-3" key={history.id}>
                      <p>{history.action}</p>
                      <span className=" ml-auto">
                        {formatDateWithTime(history.created_at)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key={"history-bg"}
            className="bg-black/30 z-20 fixed w-screen h-screen left-0 top-0"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;
