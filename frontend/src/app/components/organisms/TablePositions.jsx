import PropTypes from 'prop-types';

export default function TablePositions({ standings, localName, visitorName }) {
  return (
    <div className="flex flex-col divide-y overflow-hidden rounded-large shadow-custom">
      <table className="w-full divide-y bg-grayCard text-left font-medium">
        <thead>
          <tr className="bg-white text-center">
            <th className="py-2 ps-4 text-left">Equipo</th>
            <th className="w-[28px] py-2">P</th>
            <th className="w-[50px] py-2">G/P</th>
            <th className="w-[40px] py-2">DG</th>
            <th className="w-[40px] py-2 pe-4">PTS</th>
          </tr>
        </thead>
        <tbody className="divide-y text-nowrap">
          {standings.map((team) => (
            <tr
              key={team.teamId}
              className={`text-center text-regularTable-14 font-normal text-grayWaki hover:bg-gray-50 ${
                team.teamName === localName || team.teamName === visitorName
                  ? 'bg-inputBorder'
                  : ''
              }`}
            >
              <td className="flex items-center gap-1 py-3 ps-4">
                <span className="w-5 text-blueWaki">{team.position}</span>
                <figure className="flex w-5 items-center justify-center">
                  <img
                    src={team.teamLogo}
                    alt={`${team.teamName} logo`}
                    className="h-5"
                  />
                </figure>
                <span className="text-label">
                  {team.teamName === 'Central Cordoba de Santiago'
                    ? 'Central Cba (SdE)'
                    : team.teamName}
                </span>
              </td>
              <td className="py-3">{team.all.played}</td>
              <td className="py-3">{`${team.all.win}-${team.all.lose}`}</td>
              <td className="py-3">
                {team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}
              </td>
              <td className="py-3 pe-4 font-semibold text-label">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TablePositions.propTypes = {
  standings: PropTypes.arrayOf(
    PropTypes.shape({
      teamId: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired,
      teamLogo: PropTypes.string.isRequired,
      teamName: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      goalsDiff: PropTypes.number.isRequired,
      all: PropTypes.shape({
        played: PropTypes.number.isRequired,
        win: PropTypes.number.isRequired,
        lose: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
