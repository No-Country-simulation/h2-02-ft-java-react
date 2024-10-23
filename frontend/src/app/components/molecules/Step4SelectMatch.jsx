export default function Step4SelectMatch({ handleSelectMatch }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-lg font-bold">Selecciona otro partido</h2>
      {/* Lista de partidos, se podría hacer dinámica */}
      <div className="flex flex-col gap-2">
        <button
          className="rounded-md bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200"
          onClick={() => handleSelectMatch('Partido 1')}
        >
          Barcelona vs Osasuna - 26 Sep
        </button>
        <button
          className="rounded-md bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200"
          onClick={() => handleSelectMatch('Partido 2')}
        >
          Real Madrid vs Atletico - 27 Sep
        </button>
      </div>
    </div>
  );
}
