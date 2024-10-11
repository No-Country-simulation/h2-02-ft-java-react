import InputField from '../atoms/InputField';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';
import GoogleLoginButton from '../molecules/GoogleLoginButton';

export default function LoginForm() {
  return (
    <form className="flex w-full flex-col justify-center p-8">
      <h2 className="mb-2 text-xl font-bold text-blue-600">Hola de nuevo,</h2>
      <p className="mb-6 text-gray-500">Por favor inicia sesión</p>

      <div className="flex flex-col gap-3">
        <InputField label="Ingresa tu email o teléfono" type="text" />
        <PasswordInput label="Contraseña" />
      </div>

      <div className="my-4 w-full text-center">
        <a href="#" className="text-sm text-blue-500">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button className="mb-6 h-[35px] bg-purpleWaki text-white hover:bg-purpleWakiHover">
        Iniciar sesión
      </Button>

      <div className="relative mb-4 flex items-center justify-center">
        <span className="text-black-400 relative z-10 bg-white px-2">
          o inicia sesión con
        </span>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black"></div>
        </div>
      </div>

      <GoogleLoginButton />
    </form>
  );
}
