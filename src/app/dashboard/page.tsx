"use client";

import useAuth from '../hooks/useAuth'; 
import Navbar from "../../components/nav";
import { LeftContainer } from '../../components/dashboard/leftContainer';
import { RightContainer } from '../../components/dashboard/rightContainer';
import { ProfileContainer } from '../../components/dashboard/profileContainer';
import { useState } from 'react';

const DashboardPage = () => {
  const { loading, authenticated } = useAuth();
  const [activeComponent, setActiveComponent] = useState("links"); // Set default active component to "links"

  if (loading) {
    return <div className='text-center text-[50px]'>Loading...</div>;
  }

  if (!authenticated) {
    return null; // Prevent rendering if not authenticated (redirect is handled in useAuth)
  }

  const renderActiveComponent = () => {
    if (activeComponent === "profile") {
      return <ProfileContainer />;
    }
    return <RightContainer/>;
  };

  return (
    <>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className='bg-[#FAFAFA]'>
        <div id="main" className='flex'>
          <LeftContainer />
          {renderActiveComponent()}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
