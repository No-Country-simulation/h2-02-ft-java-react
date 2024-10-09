import Button from '../atoms/Button';

export default function GoogleLoginButton() {
  return (
    <Button className="h-[45px] border border-inputBorder relative flex w-full items-center justify-center bg-inputBackground text-black rounded-full">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
        alt="Google Logo"
        className="absolute left-4 h-8 w-8 bg-white p-1 rounded-full"
      />
      <span className="mx-auto">Continuar con Google</span>
    </Button>
  );
}