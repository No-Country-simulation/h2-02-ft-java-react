export default function NotFound() {
  return (
    <main className="flex min-h-svh w-svw flex-col items-center justify-center bg-grayCard">
      <h1 className="text-4xl font-bold text-label">404</h1>
      <p className="text-xl text-grayWaki">Página no encontrada</p>
      <a href="/" className="mt-4 text-blueWaki hover:underline">
        Volver al inicio
      </a>
    </main>
  );
}
