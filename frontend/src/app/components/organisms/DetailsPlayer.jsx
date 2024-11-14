import React, { useState, useEffect, useRef } from 'react';
import PlayerInfo from '../molecules/PlayerInfo';
import PlayerStats from '../molecules/PlayerStats';
import PlayerTrophie from '../molecules/PlayerTrophie';
import { IoFilterOutline } from 'react-icons/io5';

export default function DetailsPlayer({ playerData }) {
  const [showStatsDropdown, setShowStatsDropdown] = useState(false);
  const [showTrophiesDropdown, setShowTrophiesDropdown] = useState(false);
  const [showStatsYearsDropdown, setShowStatsYearsDropdown] = useState(false);
  const [showTrophiesYearsDropdown, setShowTrophiesYearsDropdown] =
    useState(false);
  const [selectedStatsYear, setSelectedStatsYear] = useState('Totales');
  const [selectedTrophiesYear, setSelectedTrophiesYear] = useState('Totales');

  const statsDropdownRef = useRef(null);
  const trophiesDropdownRef = useRef(null);

  const playerInfo = {
    nationality: playerData.nationality,
    age:
      playerData.birth && playerData.birth.date
        ? new Date().getFullYear() -
          new Date(playerData.birth.date).getFullYear()
        : 'N/A',
    position: playerData.position,
  };

  const playerStats = {
    playerId: playerData.profileId,
    totalGoals: playerData.totalGoals,
    totalMinutes: playerData.totalMinutes,
    totalRedCards: playerData.totalRedCards,
    totalYellowCards: playerData.totalYellowCards,
    totalAssists: playerData.totalAssists,
    totalAppearances: playerData.totalAppearances,
  };

  const playerTrophies = playerData.trophies;

  const handleStatsFilterClick = () => {
    setShowStatsDropdown(!showStatsDropdown);
    setShowStatsYearsDropdown(false);
  };

  const handleTrophiesFilterClick = () => {
    setShowTrophiesDropdown(!showTrophiesDropdown);
    setShowTrophiesYearsDropdown(false);
  };

  const handleStatsYearSelect = (year) => {
    if (year === 'Anuales') {
      setShowStatsYearsDropdown(true);
      setShowStatsDropdown(false);
    } else {
      setSelectedStatsYear(year);
      setShowStatsDropdown(false);
      setShowStatsYearsDropdown(false);
    }
  };

  const handleTrophiesYearSelect = (year) => {
    if (year === 'Anuales') {
      setShowTrophiesYearsDropdown(true);
      setShowTrophiesDropdown(false);
    } else {
      setSelectedTrophiesYear(year);
      setShowTrophiesDropdown(false);
      setShowTrophiesYearsDropdown(false);
    }
  };

  const statsYears = Array.from(
    {
      length:
        parseInt(playerData.estadisticasHasta) -
        parseInt(playerData.estadisticasDesde) +
        1,
    },
    (_, i) => parseInt(playerData.estadisticasDesde) + i
  );

  const trophiesYears = Array.from(
    {
      length:
        parseInt(playerData.logrosHasta) - parseInt(playerData.logrosDesde) + 1,
    },
    (_, i) => parseInt(playerData.logrosDesde) + i
  );

  const handleClickOutside = (event) => {
    if (
      statsDropdownRef.current &&
      !statsDropdownRef.current.contains(event.target)
    ) {
      setShowStatsDropdown(false);
      setShowStatsYearsDropdown(false);
    }
    if (
      trophiesDropdownRef.current &&
      !trophiesDropdownRef.current.contains(event.target)
    ) {
      setShowTrophiesDropdown(false);
      setShowTrophiesYearsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-5 overflow-hidden px-5 pt-7 text-regular-16">
      <PlayerInfo playerInfo={playerInfo} />
      <div className="flex items-center justify-between">
        <h2 className="text-regularNav-16 font-medium text-label">
          Estadísticas
        </h2>
        <div className="relative" ref={statsDropdownRef}>
          <div
            className="flex cursor-pointer items-center"
            onClick={handleStatsFilterClick}
          >
            <IoFilterOutline className="text-purpleWaki" />
            <span className="ml-1 text-[14px] text-label">Filtrar</span>
          </div>
          {showStatsDropdown && (
            <div
              className="absolute bottom-full mb-2 w-[186.81px] divide-y divide-[#B1B1B180] overflow-hidden rounded-large bg-white shadow-custom"
              style={{ right: '5px' }}
            >
              <div className="flex items-center bg-white px-2 py-1">
                <IoFilterOutline className="text-purpleWaki" />
                <span className="ml-1 text-[14px] text-label">Filtrar</span>
              </div>
              <div
                className="cursor-pointer bg-[#EFEFF0] px-2 py-1 text-regular-14"
                onClick={() => handleStatsYearSelect('Totales')}
              >
                Totales
              </div>
              <div
                className="cursor-pointer bg-[#EFEFF0] px-2 py-1 text-regular-14"
                onClick={() => handleStatsYearSelect('Anuales')}
              >
                Anuales
              </div>
            </div>
          )}
          {showStatsYearsDropdown && (
            <div
              className="absolute bottom-full mb-2 max-h-[100px] w-[186.81px] overflow-y-auto rounded-lg bg-white shadow-lg"
              style={{ right: '5px' }}
            >
              {statsYears.map((year) => (
                <div
                  key={year}
                  className="cursor-pointer bg-[#EFEFF0] p-2"
                  onClick={() => handleStatsYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <PlayerStats playerStats={playerStats} selectedYear={selectedStatsYear} />
      <div className="flex items-center justify-between">
        <h2 className="text-regularNav-16 font-medium text-label">Logros</h2>
        <div className="relative" ref={trophiesDropdownRef}>
          <div
            className="flex cursor-pointer items-center"
            onClick={handleTrophiesFilterClick}
          >
            <IoFilterOutline className="text-purpleWaki" />
            <span className="ml-1 text-[14px] text-label">Filtrar</span>
          </div>
          {showTrophiesDropdown && (
            <div
              className="absolute bottom-full mb-2 w-[186.81px] divide-y divide-[#B1B1B180] overflow-hidden rounded-large bg-white shadow-custom"
              style={{ right: '5px' }}
            >
              <div className="flex items-center bg-white px-2 py-1">
                <IoFilterOutline className="text-purpleWaki" />
                <span className="ml-1 text-[14px] text-label">Filtrar</span>
              </div>
              <div
                className="cursor-pointer bg-[#EFEFF0] px-2 py-1 text-regular-14"
                onClick={() => handleTrophiesYearSelect('Totales')}
              >
                Totales
              </div>
              <div
                className="cursor-pointer bg-[#EFEFF0] px-2 py-1 text-regular-14"
                onClick={() => handleTrophiesYearSelect('Anuales')}
              >
                Anuales
              </div>
            </div>
          )}
          {showTrophiesYearsDropdown && (
            <div
              className="absolute bottom-full mb-2 max-h-[100px] w-[186.81px] overflow-y-auto rounded-lg bg-white shadow-lg"
              style={{ right: '5px' }}
            >
              {trophiesYears.map((year) => (
                <div
                  key={year}
                  className="cursor-pointer bg-[#EFEFF0] p-2"
                  onClick={() => handleTrophiesYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <PlayerTrophie
        playerTrophies={playerTrophies}
        selectedYear={selectedTrophiesYear}
      />
    </div>
  );
}
