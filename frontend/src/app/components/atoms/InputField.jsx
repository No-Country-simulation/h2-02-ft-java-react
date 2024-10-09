export default function InputField({
  label,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-label">{label}</label>
      <input
        type={type}
        className={`h-[38px] w-full rounded-large border border-inputBorder bg-inputBackground px-4 py-2 ${className}`}
        {...props}
      />
    </div>
  );
}
