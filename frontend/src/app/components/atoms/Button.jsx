export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`mx-auto h-[35px] rounded px-4 py-1 normal-case text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
