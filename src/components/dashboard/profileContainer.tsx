import React, { useState, useEffect, ChangeEvent } from 'react';
import { db, auth, storage } from '../../app/auth/firebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const ProfileContainer: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);

        // Query Firestore for the profile data associated with the user's email
        const q = query(collection(db, 'profiles'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const profileData = querySnapshot.docs[0].data();
          setFirstName(profileData.firstName);
          setLastName(profileData.lastName);
          setEmail(profileData.email);
          setProfilePicture(profileData.profilePicture);
          setDocId(querySnapshot.docs[0].id);
        }
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `profilePictures/${userEmail}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePicture(downloadURL);
    }
  };

  const handleSaveClick = async () => {
    if (!userEmail) {
      alert('You must be logged in to save profile details.');
      return;
    }

    const profileData = {
      firstName,
      lastName,
      email,
      profilePicture,
    };

    try {
      if (docId) {
        // Update existing profile
        await updateDoc(doc(db, 'profiles', docId), profileData);
      } else {
        // Add new profile
        const docRef = await addDoc(collection(db, 'profiles'), { ...profileData, email: userEmail });
        setDocId(docRef.id);
      }
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile: ', error);
      alert('Failed to save profile');
    }
  };

  return (
    <div className='w-[834px] h-[834px] bg-[#FFFFFF]'>
      <div id="upper" className='h-[80px] w-[728px] gap-[8px] mx-auto'>
        <p className='text-[32px] font-bold text-[#333333]-700 mt-[50px]'>Profile Details</p>
        <p className='text-[16px]-400 mt-[20px]'>
          Add/edit/remove links below and then share all your profiles with the world!
        </p>
      </div>
      <form>
        <div id="add-new-link" className='flex w-[728px] h-[233px] bg-[#FAFAFA] mx-auto rounded-[12px] p-[20px] mt-[25px]'>
          <div className="mx-[15px] my-[70px]">
            <p className="text-[#888888]-400 text-[16px]">Profile picture</p>
          </div>
          <label htmlFor="file-input">
            <img
              id='upload-image'
              src={profilePicture || './images/upload.png'}
              className='mx-[50px] h-[193px] w-[193px] justify-center cursor-pointer'
              alt='Profile'
            />
          </label>
          <input
            id="file-input"
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="text-[#888888]-400 text-[16px] my-[59px]">
            <p>Image must be below 1024x1024px.</p>
            <p>Use PNG or JPG format.</p>
          </div>
        </div>

        <div id="add-new-link" className='w-[728px] h-[208px] bg-[#FAFAFA] mx-auto rounded-[12px] p-[20px] mt-[25px]'>
          <div>
            <label className='mr-[170px]' htmlFor="first-name">First name*</label>
            <input
              id='first-name'
              type="text"
              placeholder='e.g John'
              className='h-[48px] w-[432px] rounded-[8px] border-[1px] py-[12px] px-[16px]'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='mt-3'>
            <label className='mr-[170px]' htmlFor="last-name">Last name*</label>
            <input
              id='last-name'
              type="text"
              placeholder='e.g. Appleseed'
              className='h-[48px] w-[432px] rounded-[8px] border-[1px] py-[12px] px-[16px]'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label className='mr-[210px]' htmlFor="email">Email</label>
            <input
              id='email'
              type="text"
              placeholder='e.g. email@example.com'
              className='h-[48px] w-[432px] rounded-[8px] border-[1px] py-[12px] px-[16px]'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className='h-[94px] mt-[110px]'>
        <button
          className='bg-[#633CFF] py-[11px] px-[27px] rounded-[8px] mt-[25px] mx-[690px] text-white'
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};
