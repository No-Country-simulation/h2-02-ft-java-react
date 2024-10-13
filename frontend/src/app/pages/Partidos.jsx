import LoginForm from '../components/organisms/LoginForm';
import Navbar from '../components/molecules/Navbar';

export default function Partidos() {
  return (
    <main className="flex w-full flex-col sm:min-w-[500px]">
      <LoginForm />
      <Navbar />
    </main>
  );
}
