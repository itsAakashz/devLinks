import React, { useState, ChangeEvent, useEffect } from 'react';
import { db, auth } from '../../app/auth/firebaseConfig';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Link {
  id: number;
  platformName: string;
  url: string;
  docId?: string; // Firestore document ID for updates and deletes
}

export const RightContainer: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [platformNames, setPlatformNames] = useState<{ [key: number]: string }>({});
  const [urls, setUrls] = useState<{ [key: number]: string }>({});
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Set up an observer on the Auth object to get the user's email and fetch existing links
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);

        // Query Firestore for the links associated with the user's email
        const q = query(collection(db, 'links'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const userLinks: Link[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const id = userLinks.length + 1;
          userLinks.push({ id, platformName: data.platformName, url: data.url, docId: doc.id });
        });
        setLinks(userLinks);

        // Set initial platform names and URLs
        const initialPlatformNames: { [key: number]: string } = {};
        const initialUrls: { [key: number]: string } = {};
        userLinks.forEach((link) => {
          initialPlatformNames[link.id] = link.platformName;
          initialUrls[link.id] = link.url;
        });
        setPlatformNames(initialPlatformNames);
        setUrls(initialUrls);
      } else {
        setUserEmail(null);
        setLinks([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleAddNewLinkClick = () => {
    setLinks([...links, { id: links.length + 1, platformName: '', url: '' }]);
  };

  const handleRemoveLinkClick = async (id: number) => {
    const link = links.find(link => link.id === id);
    if (link?.docId) {
      await deleteDoc(doc(db, 'links', link.docId));
    }
    setLinks(links.filter(link => link.id !== id));
    const updatedPlatformNames = { ...platformNames };
    const updatedUrls = { ...urls };
    delete updatedPlatformNames[id];
    delete updatedUrls[id];
    setPlatformNames(updatedPlatformNames);
    setUrls(updatedUrls);
  };

  const handlePlatformChange = (id: number, event: ChangeEvent<HTMLSelectElement>) => {
    setPlatformNames({ ...platformNames, [id]: event.target.value });
  };

  const handleUrlChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    setUrls({ ...urls, [id]: event.target.value });
  };

  const handleSaveClick = async () => {
    if (!userEmail) {
      alert('You must be logged in to save links.');
      return;
    }

    try {
      for (let link of links) {
        const platformName = platformNames[link.id];
        const url = urls[link.id];
        if (platformName && url) {
          if (link.docId) {
            // Update existing link
            console.log(`Updating link ${link.id}: ${platformName} - ${url}`);
            await updateDoc(doc(db, 'links', link.docId), {
              platformName,
              url,
              email: userEmail
            });
          } else {
            // Add new link
            console.log(`Saving link ${link.id}: ${platformName} - ${url}`);
            const docRef = await addDoc(collection(db, 'links'), {
              platformName,
              url,
              email: userEmail
            });
            link.docId = docRef.id; // Update link with the new document ID
          }
        }
      }
      // alert('Links saved successfully!');
    } catch (error) {
      console.error('Error saving links: ', error);
      // alert('Failed to save links');
    }
  };

  return (
    <div className='w-[834px] h-[auto] bg-[#FFFFFF]'>
      <div id="upper" className='h-[80px] w-[728px] gap-[8px] mx-auto'>
        <p className='text-[32px] font-bold text-[#333333]-700 mt-[50px]'>Customize your links</p>
        <p className='text-[16px]-400 mt-[20px]'>
          Add/edit/remove links below and then share all your profiles with the world!
        </p>
      </div>

      <div
        id="middle"
        className='w-[728px] h-[46px] m-3 mx-auto rounded-[8px] border-[#633CFF]-900 text-center cursor-pointer hover:bg-[#EFEBFF] py-[11px] px-[27px] mt-[30px] text-[#633CFF]'
        onClick={handleAddNewLinkClick}
      >
        + Add new link
      </div>

      {links.length === 0 && (
        <div id="image-container" className='w-[728px] h-[469px] bg-[#FAFAFA] mx-auto rounded-[12px] p-[20px] gap-12px] mt-[25px]'>
          <img src='./images/get-started.png' className='mx-auto mt-[50px]' alt='Get Started' />
          <div className='w-[448px] mx-auto mt-[50px]'>
            <p className='text-[32px] font-bold text-[#333333]-700 text-center'>Let’s get you started</p>
            <p className='text-[16px] text-center text-[#737373]-400 mt-[25px]'>
              Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them.
              We’re here to help you share your profiles with everyone!
            </p>
          </div>
        </div>
      )}

      {links.map(link => (
        <div key={link.id} id={`add-new-link-${link.id}`} className='w-[728px] h-[228px] bg-[#FAFAFA] mx-auto rounded-[12px] p-[20px] mt-[25px]'>
          <div className='flex justify-between w-full'>
            <div>
              <p>Link #{link.id}</p>
            </div>
            <div className='text-right cursor-pointer text-[#FF0000]' onClick={() => handleRemoveLinkClick(link.id)}>Remove</div>
          </div>
          <div className='mt-3'>
            <label className='text-[12px]'>Platform</label>
            <select
              id="Platform"
              name="Platform"
              className='h-[48px] w-full rounded-[8px] border-[1px] px-[16px] py-[12px] lg:h-[48px]'
              required
              value={platformNames[link.id] || ''}
              onChange={(event) => handlePlatformChange(link.id, event)}
            >
              <option value="">Select</option>
              <option value="GitHub">GitHub</option>
              <option value="YouTube">YouTube</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
              <option value="Frontend Mentor">Frontend Mentor</option>
            </select>
          </div>
          <div id="link-field" className='mt-2'>
            <label className='text-[12px]'>Link</label>
            <input id='name' type="text" placeholder='https://www.github.com/itsAakashz' className='h-[48px] w-[688px] rounded-[8px] border-[1px] py-[12px] px-[16px]' value={urls[link.id] || ''} onChange={(event) => handleUrlChange(link.id, event)} />
          </div>
        </div>
      ))}

      <div className='h-[94px] mt-[110px]'>
        <button className='bg-[#633CFF] py-[11px] px-[27px] rounded-[8px] mt-[25px] mx-[690px] text-white' onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};
