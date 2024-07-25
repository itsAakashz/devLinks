"use client"
import { useEffect } from 'react';
import type { NextPage } from 'next';
import ProfileCard from '../../components/preview/ProfileCard';
import PreviewNav from '../../components/preview/previewNav';
import useAuth from '../hooks/useAuth';

const PreviewPage: NextPage = () => {
  const { loading, authenticated } = useAuth();

  useEffect(() => {
    if (!loading && !authenticated) {
      window.location.href = '/login'; 
    }
  }, [authenticated, loading]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!authenticated) {
    return null; 
  }

  return (
    <>
      <PreviewNav />
      <ProfileCard />
    </>
  );
};

export default PreviewPage;
