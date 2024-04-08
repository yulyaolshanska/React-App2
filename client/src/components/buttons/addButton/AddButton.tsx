export interface AddButtonProps {
  onClick: () => void;
  text: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="ml-auto flex border-solid border-1 border-cyan-600 rounded-lg p-2 text-lg font-semibold bg-white  text-black hover:bg-[#66aee1] hover:text-white"
    >
      {text}
    </button>
  );
};

export default AddButton;
