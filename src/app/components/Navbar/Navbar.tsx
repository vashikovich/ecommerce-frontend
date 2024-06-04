"use client";
import Image from "next/image";
import CategoryBar from "./CategoryBar";
import SearchBar from "./Searchbar";
import BurgerButton from "./BurgerButton";
import LogoImg from "@/../public/img/logo.png";
import CartSvg from "@/../public/svg/cart.svg";
import AccountSvg from "@/../public/svg/account.svg";
import CartModal from "./CartModal";
import AccountModal from "./AccountModal";
import CategoryModal from "./CategoryModal";
import NavbarModal from "./NavbarModal";
import Button from "@/app/components/Button";
import { useState } from "react";
import { Category } from "@/__generated__/graphql";

type ModalType = "CATEGORY" | "CART" | "ACCOUNT" | "NONE";

const Navbar = ({ categories }: { categories: Category[] }) => {
  const [modalOpen, setModalOpen] = useState<ModalType>("NONE");

  const toggleModal = (modal: ModalType) => {
    modalOpen === modal ? setModalOpen("NONE") : setModalOpen(modal);
  };

  return (
    <nav>
      <div className="fixed w-full z-50 h-32 lg:h-36">
        <div className="bg-blue-900 text-white px-4 flex items-center h-14 lg:h-20">
          <div
            className="mr-auto flex items-center lg:hidden h-full"
            onClick={() => toggleModal("CATEGORY")}
          >
            <BurgerButton isOpen={modalOpen === "CATEGORY"} />
          </div>
          <div className="absolute inset-0 lg:ml-4 flex-1 flex justify-center lg:justify-start items-center h-14 lg:h-20 w-1/2 mx-auto">
            <div className="w-32 lg:w-40">
              <Image src={LogoImg} alt="Logo" className="object-contain" />
            </div>
          </div>
          <div className="absolute inset-0 flex-1 hidden lg:flex justify-center items-center h-14 lg:h-20">
            <div className="w-1/2">
              <SearchBar />
            </div>
          </div>
          <div className="flex justify-end ml-auto space-x-2 lg:hidden">
            <div className="h-6 w-6" onClick={() => toggleModal("CART")}>
              <CartSvg fill="white" />
            </div>
            <div className="h-7 w-7" onClick={() => toggleModal("ACCOUNT")}>
              <AccountSvg fill="white" />
            </div>
          </div>
          <div className="lg:flex justify-end flex-1 ml-auto space-x-2 hidden">
            <Button text="Sign in" variant="ghost-white" />
            <Button text="Register" variant="secondary" />
          </div>
        </div>
        {modalOpen === "NONE" && (
          <div className="px-4 py-3 flex justify-center lg:hidden bg-white">
            <SearchBar />
          </div>
        )}
        <div className="hidden lg:block">
          <CategoryBar categories={categories} />
        </div>
      </div>
      {modalOpen === "CART" && (
        <NavbarModal onOverlayClick={() => setModalOpen("NONE")}>
          <CartModal />
        </NavbarModal>
      )}
      {modalOpen === "ACCOUNT" && (
        <NavbarModal onOverlayClick={() => setModalOpen("NONE")}>
          <AccountModal />
        </NavbarModal>
      )}
      {modalOpen === "CATEGORY" && (
        <NavbarModal onOverlayClick={() => setModalOpen("NONE")}>
          <CategoryModal categories={categories} />
        </NavbarModal>
      )}
    </nav>
  );
};

export default Navbar;
