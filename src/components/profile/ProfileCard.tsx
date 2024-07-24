import Image from 'next/image';
import pfp from "../../../public/images/pfp-placeholder.png";

const ProfileCard = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     <div className="absolute h-[357px] w-[1502px] bg-[#633CFF] mb-[340px] rounded-b-[32px]">
     </div>
      <div className="relative bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-sm h-[569px] w-[349px] bg-[#FFFFFF]">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={pfp} 
            alt="Ben Wright"
            width={96}
            height={96}
            className="rounded-full"
          />
          <h1 className="text-2xl font-semibold">Ben Wright</h1>
          <p className="text-gray-500">ben@example.com</p>
          <div className="space-y-3 w-full">
            <a
              href="#"
              className="flex items-center justify-between bg-black text-white px-4 py-2 rounded-lg w-full"
            >
              GitHub
              <span>→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between bg-red-600 text-white px-4 py-2 rounded-lg w-full"
            >
              YouTube
              <span>→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
            >
              LinkedIn
              <span>→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
            >
              Dev.to
              <span>→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between bg-purple-600 text-white px-4 py-2 rounded-lg w-full"
            >
              Codewars
              <span>→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
            >
              freeCodeCamp
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileCard;

// Prompt: I have two collection Links, Profiles on firestore. Links contains email, platformName and url inside each documents. And Profiles contains  email, firstName, lastName and profilePicture. Query database with authenticated user email for email, Full name and profilePicture url and platformName and url. Update code according to this. 