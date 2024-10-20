export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600">Página no encontrada</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Volver al inicio
      </a>
    </main>
  );
}
