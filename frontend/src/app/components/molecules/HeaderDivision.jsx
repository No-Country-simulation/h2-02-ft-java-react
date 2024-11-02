import DivisionNavbar from '../atoms/DivisionNavbar';

export default function HeaderDivision({ currentView, onViewChange }) {
  return (
    <header className="fixed top-0 w-full bg-white shadow-navbar">
      <div className="flex w-full items-center justify-center pt-[60px] text-[22px] font-semibold normal-case text-blueWaki">
        <span>Divisiones</span>
      </div>
      <DivisionNavbar activeTab={currentView} setActiveTab={onViewChange} />
    </header>
  );
}
