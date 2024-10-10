import LoginForm from '../components/organisms/LoginForm';
import AuthNavbar from '../components/molecules/AuthNavbar';

export default function Login() {
  return (
    <main className="flex w-full flex-col overflow-hidden bg-white sm:m-2 sm:w-96 sm:border sm:border-inputBorder">
      <AuthNavbar />
      <LoginForm />
    </main>
  );
}
