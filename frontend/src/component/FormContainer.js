const FormContainer = ({ children }) => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-[70%] mx-auto p-3">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
