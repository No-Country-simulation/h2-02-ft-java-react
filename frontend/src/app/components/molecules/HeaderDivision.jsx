import { useState, useEffect } from 'react';
import DivisionNavbar from '../atoms/DivisionNavbar';

export default function HeaderDivision({ currentView, onViewChange }) {
  return (
    <div className="relative shadow-[0_0_10.2px_0_rgba(0,0,0,0.2)]">
      <div className="relative flex w-full items-center justify-center pt-[60px] text-[22px] font-semibold normal-case text-blueWaki">
        <span>Divisiones</span>
      </div>
      <DivisionNavbar currentView={currentView} onViewChange={onViewChange} />
    </div>
  );
}
