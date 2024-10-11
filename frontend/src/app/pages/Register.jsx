import RegisterForm from '../components/organisms/RegisterForm';
import AuthNavbar from '../components/molecules/AuthNavbar';

export default function Register() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-white sm:m-2 sm:w-96 sm:border sm:border-inputBorder">
      <AuthNavbar />
      <RegisterForm />
    </div>
  );
}
