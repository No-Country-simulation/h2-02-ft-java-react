export default function IconButton({ icon: Icon, ...props }) {
  return (
    <button className="text-gray-500" {...props}>
      <Icon size={20} />
    </button>
  );
}
