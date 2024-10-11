import Button from '../atoms/Button';

export default function GoogleLoginButton() {
  return (
    <Button className="relative flex h-[45px] w-full items-center justify-center rounded-full border border-inputBorder bg-inputBackground text-black">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
        alt="Google Logo"
        className="absolute left-4 h-8 w-8 rounded-full bg-white p-1"
      />
      <span className="mx-auto">Continuar con Google</span>
    </Button>
  );
}
