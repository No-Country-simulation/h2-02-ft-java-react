import { useState, useEffect } from 'react';
import FooterNavbar from '../components/organisms/FooterNavbar';
import ProfileHeader from '../components/molecules/ProfileHeader';
import ProfileList from '../components/organisms/ProfileList';
import RankingCard from '../components/molecules/RankingCard';
import { Outlet, useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const [isProfilePage, setIsProfilePage] = useState(true);

  useEffect(() => {
    setIsProfilePage(location.pathname === '/profile');
  }, [location.pathname]);

  return (
    <div className="flex justify-center">
      <main className="flex min-h-screen w-full flex-col overflow-hidden sm:max-w-[570px]">
        {isProfilePage && <ProfileHeader />}
        {isProfilePage && <RankingCard />}
        {isProfilePage && <ProfileList />}
        <div className="mb-[90px] flex-grow">
          <Outlet />
        </div>
        {isProfilePage && <FooterNavbar />}
      </main>
    </div>
  );
}
