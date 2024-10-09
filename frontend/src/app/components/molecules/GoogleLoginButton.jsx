import Button from '../atoms/Button';

export default function GoogleLoginButton() {
  return (
    <Button className="flex w-full items-center justify-center bg-gray-100 text-gray-700">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
        alt="Google Logo"
        className="mr-2 h-6 w-6"
      />
      Continuar con Google
    </Button>
  );
}
