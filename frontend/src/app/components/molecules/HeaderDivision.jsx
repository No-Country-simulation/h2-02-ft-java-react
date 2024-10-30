import DivisionNavbar from '../atoms/DivisionNavbar';

export default function HeaderDivision({ currentView, onViewChange }) {
  return (
    <header className="shadow-navbar relative w-full">
      <div className="flex w-full items-center justify-center pt-[60px] text-[22px] font-semibold normal-case text-blueWaki">
        <span>Divisiones</span>
      </div>
      <DivisionNavbar currentView={currentView} onViewChange={onViewChange} />
    </header>
  );
}
