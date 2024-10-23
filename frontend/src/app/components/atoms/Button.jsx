import clsx from 'clsx';

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'rounded py-1 font-medium normal-case transition-colors ease-in-out';
  const disabledStyles = 'opacity-50 cursor-not-allowed'; // También añadimos cursor-not-allowed cuando está deshabilitado

  const variants = {
    primary: clsx(
      'bg-purpleWaki text-white',
      !disabled && 'hover:bg-purpleWakiHover' // Aplicamos hover solo si no está deshabilitado
    ),
    outline: clsx(
      'border-2 border-purpleWaki bg-transparent text-purpleWaki',
      !disabled &&
        'hover:border-purpleWakiHover hover:bg-purpleWakiHover hover:text-white' // Aplicamos hover solo si no está deshabilitado
    ),
  };

  const sizes = {
    small: 'h-[30px] px-[0.85rem]',
    medium: 'h-[35px] px-[1.075rem]',
    large: 'h-[35px] px-1',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizes[size],
        variants[variant],
        disabled && disabledStyles,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
