import InputField from '../atoms/InputField';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';
import GoogleLoginButton from '../molecules/GoogleLoginButton';

export default function LoginForm() {
  return (
    <form className="flex w-full flex-col justify-center p-[37.5px]">
      <h2 className="mb-1 text-semibold-22 font-semibold text-blueWaki">
        Hola de nuevo,
      </h2>
      <p className="mb-8 text-grayWaki">Por favor inicia sesión</p>

      <div className="flex flex-col gap-3">
        <InputField label="Ingresa tu email o teléfono" type="text" />
        <PasswordInput label="Contraseña" />
      </div>

      <div className="mt-4 w-full text-center">
        <a href="#" className="text-regular-13 text-blueWaki underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button className="mt-6 h-[35px] bg-purpleWaki text-white hover:bg-purpleWakiHover">
        Iniciar sesión
      </Button>

      <div className="relative my-8 flex items-center justify-center">
        <span className="relative z-10 bg-white px-2 text-grayWaki">
          O inicia sesión con
        </span>
        <div className="absolute inset-0 flex items-center">
          <div className="border-grayLineWaki w-full border-t"></div>
        </div>
      </div>

      <GoogleLoginButton />
    </form>
  );
}
