"use client"
import { useEffect } from 'react';
import type { NextPage } from 'next';
import ProfileCard from '../../components/profile/ProfileCard';
import PreviewNav from '../../components/profile/previewNav';
import useAuth from '../hooks/useAuth';

const PreviewPage: NextPage = () => {
  const { loading, authenticated } = useAuth();

  useEffect(() => {
    if (!loading && !authenticated) {
      window.location.href = '/login'; 
    }
  }, [authenticated, loading]);

  if (loading) {
    return <div>Loading...</div>; // Optionally, render a loading indicator while checking authentication
  }

  if (!authenticated) {
    return null; // Prevent rendering if the user is not authenticated and loading is complete
  }

  return (
    <>
      <PreviewNav />
      <ProfileCard />
    </>
  );
};

export default PreviewPage;
