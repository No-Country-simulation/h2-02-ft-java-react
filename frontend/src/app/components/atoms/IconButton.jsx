export default function IconButton({ icon: Icon, ...props }) {
  return (
    <button className="text-grayLightWaki" {...props}>
      <Icon size={20} />
    </button>
  );
}
