const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-yellow-500 ${sizes[size]}`}></div>
    </div>
  );
};

export default Loader;
