import { Link } from 'react-router-dom';

export default function AnchorButton({
  to,
  children,
  className = '',
  ...props
}) {
  return (
    <Link
      to={to}
      className={`flex h-[35px] w-fit items-center justify-center rounded bg-purpleWaki px-[1.075rem] py-1 font-medium normal-case text-white transition-colors ease-in-out hover:bg-purpleWakiHover ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
