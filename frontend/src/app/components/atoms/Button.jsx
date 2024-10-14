export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`h-[35px] rounded bg-purpleWaki px-[1.075rem] py-1 font-medium normal-case text-white transition-colors ease-in-out hover:bg-purpleWakiHover ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
