interface NotesContainerProps {
  children?: React.ReactNode;
}

export const NotesContainer = ({ children }: NotesContainerProps) => {
  return (
    <div className="w-full grid grid-auto-fill items-start p-4 gap-x-16 gap-y-8 overflow-y-auto place-items-center">
      {children}
    </div>
  );
};
