export default function GoogleLoginButton() {
  return (
    <button className="relative flex h-[45px] w-full items-center justify-center rounded-full bg-inputBackground text-regularNav-16 normal-case text-[#06060691] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
        alt="Google Logo"
        className="absolute left-2 h-9 w-9 rounded-full bg-white p-1"
      />
      <span className="">Continuar con Google</span>
    </button>
  );
}
