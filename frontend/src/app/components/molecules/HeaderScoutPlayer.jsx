import ScoutPlayerNavbar from '../atoms/ScoutPlayerNavbar';

export default function HeaderScoutPlayer({ currentView, onViewChange }) {
  return (
    <header className="fixed top-0 z-50 w-full max-w-[570px] bg-white shadow-navbar">
      <div className="flex w-full items-center justify-center pt-[60px] text-[22px] font-semibold normal-case text-blueWaki">
        <span>Scout Players</span>
      </div>
      <ScoutPlayerNavbar activeTab={currentView} setActiveTab={onViewChange} />
    </header>
  );
}
