export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`mx-auto rounded px-4 py-1 normal-case transition-colors ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
