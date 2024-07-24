"use client";

import Link from "next/link";


const previewNav = () => {
  return (
    <section className="w-auto h-[120px] border-[30px] border-[#633CFF]">
      <nav className="flex rounded-[12px] h-[78] w-[1450px] mx-auto pt-[16px] pr-[16px] pb-[16px] pl-[24px]">
            <Link
              href="/dashboard"
              className="text-[#633CFF] h-[46px] w-[159px] text-center py-[11px] px-[27px] rounded-[8px] border-[#633CFF] border-[1px]"
            >
              Back to Editor
            </Link>
         
            <Link
              href="/preview"
              className="text-white h-[46px] w-[133px] text-center py-[11px] px-[27px] font-semibold rounded-[8px] bg-[#633CFF] mr-[100px] mx-[70%]"
            >
              Share
            </Link>
      </nav>
    </section>
  );
};

export default previewNav;
