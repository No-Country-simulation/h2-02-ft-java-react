import PlayerNavbar from '../atoms/PlayerNavbar';
import PageNavbar from './PageNavbar';

export default function HeaderPlayer({
  currentView,
  onViewChange,
  photo,
  name,
}) {
  return (
    <header className="mt-[80px] w-full max-w-[570px] bg-white shadow-navbar">
      <PageNavbar beforePage={'Scout players'} />
      <div className="flex w-full flex-col items-center justify-center pt-[60px] text-[22px] font-semibold normal-case text-label">
        <div className="mb-4 flex h-[125.31px] w-[125.31px] items-center justify-center rounded-full bg-purpleWaki">
          <img
            src={photo}
            alt={`${name}'s photo`}
            className="h-[115.31px] w-[115.31px] rounded-full object-cover"
          />
        </div>
        <span>{name}</span>
      </div>
      <PlayerNavbar activeTab={currentView} setActiveTab={onViewChange} />
    </header>
  );
}
