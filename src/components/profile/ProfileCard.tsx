import { useEffect, useState } from 'react';
import Image from 'next/image';
import { db, auth } from '../../app/auth/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import pfp from "../../../public/images/pfp-placeholder.png";

interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Link {
  platformName: string;
  url: string;
}

const ProfileCard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndLinks = async () => {
      if (!auth.currentUser) {
        console.error("No authenticated user found.");
        setLoading(false);
        return;
      }

      const email = auth.currentUser.email;
      console.log("Authenticated user email:", email);

      if (email) {
        try {
          // Fetch profile
          const profilesCollection = collection(db, 'profiles'); // Corrected collection name
          const profileQuery = query(profilesCollection, where('email', '==', email));
          const profileSnapshot = await getDocs(profileQuery);

          console.log("Profile query:", profileQuery);
          console.log("Profile snapshot size:", profileSnapshot.size);

          if (!profileSnapshot.empty) {
            const profileData = profileSnapshot.docs[0].data() as Profile;
            setProfile(profileData);
            console.log("Profile Data:", profileData);
          } else {
            console.log("No profile found for email:", email);
          }

          // Fetch links
          const linksCollection = collection(db, 'links'); // Corrected collection name
          const linksQuery = query(linksCollection, where('email', '==', email));
          const linksSnapshot = await getDocs(linksQuery);

          console.log("Links query:", linksQuery);
          console.log("Links snapshot size:", linksSnapshot.size);

          if (!linksSnapshot.empty) {
            const linksData = linksSnapshot.docs.map(doc => doc.data() as Link);
            setLinks(linksData);
            console.log("Links Data:", linksData);
          } else {
            console.log("No links found for email:", email);
          }
        } catch (error) {
          console.error("Error fetching profile and links:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No email found for authenticated user.");
        setLoading(false);
      }
    };

    fetchProfileAndLinks();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute h-[357px] w-[1502px] bg-[#633CFF] mb-[340px] rounded-b-[32px]"></div>
      <div className="relative bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-sm h-[569px] w-[349px] bg-[#FFFFFF]">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={profile?.profilePicture || pfp}
            alt={`${profile?.firstName} ${profile?.lastName}`}
            width={96}
            height={96}
            className="rounded-full"
          />
          <h1 className="text-2xl font-semibold">{profile?.firstName} {profile?.lastName}</h1>
          <p className="text-gray-500">{profile?.email}</p>
          <div className="space-y-3 w-full">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`flex items-center justify-between text-white px-4 py-2 rounded-lg w-full ${getPlatformColor(link.platformName)}`}
              >
                {link.platformName}
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'GitHub': return 'bg-black';
    case 'YouTube': return 'bg-red-600';
    case 'LinkedIn': return 'bg-blue-600';
    case 'Dev.to': return 'bg-gray-800';
    case 'Codewars': return 'bg-purple-600';
    case 'freeCodeCamp': return 'bg-indigo-600';
    default: return 'bg-gray-500';
  }
};

export default ProfileCard;
