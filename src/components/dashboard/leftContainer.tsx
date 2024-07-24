import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../app/auth/firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';

interface Link {
  id: string;
  platformName: string;
}

export const LeftContainer: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);

        // Set up Firestore real-time listener for the links associated with the user's email
        const q = query(collection(db, 'links'), where('email', '==', user.email));
        const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
          const userLinks: Link[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            userLinks.push({ id: doc.id, platformName: data.platformName });
          });
          setLinks(userLinks);
        });

        return () => unsubscribeFirestore();
      } else {
        setUserEmail(null);
        setLinks([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div id="pc-left" className='hidden w-[560px] rounded-[12px] p-[24px] h-[834px] mx-10 bg-[#FFFFFF] lg:block'>
      <img src='./images/preview-section.png' className="absolute mx-auto mt-[50px]" alt="Preview"/>
      {links.map((link, index) => (
        <div
          key={link.id}
          className="relative w-[237px] h-[44px] rounded-[8px] py-[11px] px-[16px] mx-[34px] mt-[20px] text-white"
          style={{
            backgroundColor: `#${getColor(link.platformName)}`,
            marginTop: index === 0 ? '328px' : '20px'
          }}
        >
          {link.platformName}
        </div>
      ))}
    </div>
  );
};

// Helper function to get the background color based on the platform name
const getColor = (platformName: string) => {
  switch (platformName.toLowerCase()) {
    case 'github':
      return '1A1A1A';
    case 'youtube':
      return 'EE3939';
    case 'linkedin':
    case 'facebook':
    case 'frontend mentor':
      return '2D68FF';
    default:
      return '000000'; // Default color
  }
};

export default LeftContainer;
