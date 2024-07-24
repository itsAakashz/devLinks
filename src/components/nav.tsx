import Image from "next/image";
import { useState } from "react";
import Logo from "../../public/logo.png";
import { IoClose, IoMenu } from "react-icons/io5";
import { RiLinksFill } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";

// Define the type for props
interface NavbarProps {
  setActiveComponent: (component: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveComponent }) => {
  const [state, setState] = useState(false);
  const [activeLink, setActiveLink] = useState("links"); // Set default active link to "links"

  const handleLinkClick = (component: string) => {
    setActiveLink(component);
    setActiveComponent(component);
    setState(false); // Close the mobile menu on link click
  };

  return (
    <section className=" p-[24px] bg-[#FAFAFA]">
      <nav className="w-full border-b md:border-0 sticky top-0 bg-white z-[999]">
        <div className="items-center max-w-screen-2xl mx-auto md:flex">
          <div className="flex items-center  px-4 md:px-8 justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <Image src={Logo} width={26.67} height={26.67} alt="DevLinks Logo" />
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <IoClose className="h-6 w-6" />
                ) : (
                  <IoMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
              state
                ? "flex justify-center text-center pt-12 absolute h-screen w-full p-4 backdrop-blur-lg bg-black/70 text-white"
                : "hidden"
            }`}
          >
            <div className="flex justify-center items-center space-y-8 md:flex md:gap-x-6 md:space-y-0">
              <div
                className={`flex py-[11px] px-[27px] rounded-[8px] hover:cursor-pointer ${
                  activeLink === "links" ? "bg-[#EFEBFF]" : ""
                }`}
                onClick={() => handleLinkClick("links")}
              >
                <RiLinksFill className="mt-1 h-[15.63px] w-[15.63px]" />
                <p className="px-1">
                  Links
                </p>
              </div>
              <div
                className={`flex py-[11px] px-[27px] rounded-[8px] hover:cursor-pointer ${
                  activeLink === "profile" ? "bg-[#EFEBFF]" : ""
                }`}
                onClick={() => handleLinkClick("profile")}
              >
                <MdOutlineAccountCircle className="mt-1 h-[15.63px] w-[15.63px]" />
                <p className="px-1">
                  Profile Details
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:inline-block md:px-8">
            <Link
              href="/preview"
              className="py-[11px] px-[27px] font-semibold rounded text-base text-primary border border-primary hover:bg-primary-200 active:scale-95 duration-150"
            >
              Preview
            </Link>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
