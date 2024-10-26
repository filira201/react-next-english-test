"use client";

import { useState } from "react";
import { AuthModal } from "../auth-modal/AuthModal";
import ProfileButton from "./ProfileButton";

const Header = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <div className="border border-sky-500">
      <p>Header</p>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <ProfileButton onOpen={() => setOpenAuthModal(true)} />
    </div>
  );
};

export default Header;
