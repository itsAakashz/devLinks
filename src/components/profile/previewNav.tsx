"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";

const previewNav = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard');
      setModalIsOpen(false);
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
    });
  };

  return (
    <section className="w-auto h-[120px] border-[30px] border-[#633CFF] relative z-0">
      <nav className="flex rounded-[12px] h-[78px] w-[1450px] mx-auto pt-[16px] pr-[16px] pb-[16px] pl-[24px]">
        <Link
          href="/dashboard"
          className="text-[#633CFF] h-[46px] w-[159px] text-center py-[11px] px-[27px] rounded-[8px] border-[#633CFF] border-[1px]"
        >
          Back to Editor
        </Link>
        
        <button
          onClick={toggleModal}
          className="text-white h-[46px] w-[133px] text-center py-[11px] px-[27px] font-semibold rounded-[8px] bg-[#633CFF] mr-[100px] mx-[70%]"
        >
          Share
        </button>
      </nav>
     {/* Share model */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Share Modal"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-white p-6 rounded-lg max-w-[90%] max-h-[90%] w-[400px] h-[400px] flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">Share this content</h2>
          <button
            onClick={() => window.open(`mailto:?subject=Check this out&body=${window.location.href}`, '_blank')}
            className="text-[#633CFF] mb-2 h-[46px] w-full text-center py-[11px] px-[27px] rounded-[8px] border-[#633CFF] border-[1px]"
          >
            Share via Email
          </button>
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
            className="text-[#1DA1F2] mb-2 h-[46px] w-full text-center py-[11px] px-[27px] rounded-[8px] border-[#1DA1F2] border-[1px]"
          >
            Share on Twitter
          </button>
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
            className="text-[#1877F2] mb-2 h-[46px] w-full text-center py-[11px] px-[27px] rounded-[8px] border-[#1877F2] border-[1px]"
          >
            Share on Facebook
          </button>
          <button
            onClick={handleCopyLink}
            className="text-[#633CFF] h-[46px] w-full text-center py-[11px] px-[27px] rounded-[8px] border-[#633CFF] border-[1px]"
          >
            Copy Link
          </button>
          <button
            onClick={toggleModal}
            className="text-gray-500 h-[46px] w-full text-center py-[11px] px-[27px] mt-4 rounded-[8px] border-gray-500 border-[1px]"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default previewNav;
