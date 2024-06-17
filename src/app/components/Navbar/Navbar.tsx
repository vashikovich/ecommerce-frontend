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
import Button from "@/app/components/Button";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../providers/AuthProvider";
import { Category } from "@/__generated__/graphql";
import ChevronSvg from "@/../public/svg/chevron.svg";

type ModalType = "CATEGORY" | "CART" | "ACCOUNT" | "NONE";

const Navbar = ({ categories }: { categories: Category[] }) => {
  const auth = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState<ModalType>("NONE");

  const toggleModal = (modal: ModalType) => {
    modalOpen === modal ? setModalOpen("NONE") : setModalOpen(modal);
  };

  return (
    <nav>
      {modalOpen === "CART" && (
        <CartModal onDismissModal={() => setModalOpen("NONE")} />
      )}
      {modalOpen === "ACCOUNT" && (
        <AccountModal onDismissModal={() => setModalOpen("NONE")} />
      )}
      {modalOpen === "CATEGORY" && (
        <CategoryModal
          categories={categories}
          onDismissModal={() => setModalOpen("NONE")}
        />
      )}
      <div className="fixed w-full z-40 h-32 lg:h-36">
        <div className="bg-blue-900 text-white px-4 flex items-center h-14 lg:h-20">
          <div
            className="mr-auto flex items-center lg:hidden h-full"
            onClick={() => toggleModal("CATEGORY")}
          >
            <BurgerButton isOpen={modalOpen === "CATEGORY"} />
          </div>
          <div className="lg:ml-4 flex-1 flex justify-center lg:justify-start items-center h-14 lg:h-20 w-1/2 mx-auto z-10">
            <div className="w-32 lg:w-40">
              <Link href="/">
                <Image src={LogoImg} alt="Logo" className="object-contain" />
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden lg:flex justify-center items-center h-14 lg:h-20 w-1/2">
            <SearchBar />
          </div>
          <div className="flex justify-end ml-auto space-x-2 lg:hidden">
            {/* {auth.user && ( */}
              <div className="h-6 w-6" onClick={() => toggleModal("CART")}>
                <CartSvg fill="white" />
              </div>
            {/* )} */}
            <div className="h-7 w-7" onClick={() => toggleModal("ACCOUNT")}>
              <AccountSvg fill="white" />
            </div>
          </div>
          <div className="lg:flex justify-end flex-1 ml-auto space-x-2 hidden z-10">
            {auth.user ? (
              <>
                <Button
                  className="flex gap-2"
                  variant="ghost-white"
                  circular
                  content="Cart"
                  onClick={() => toggleModal("CART")}
                  iconStart={
                    <div className="h-6 w-6">
                      <CartSvg fill="white" />
                    </div>
                  }
                />
                <Button
                  className="flex gap-2"
                  variant="ghost-white"
                  circular
                  onClick={() => toggleModal("ACCOUNT")}
                  content={
                    <div className="overflow-hidden text-ellipsis max-w-20">
                      {(auth.user.displayName ?? auth.user.email).slice()}
                    </div>
                  }
                  iconStart={
                    <div className="h-7 w-7">
                      <AccountSvg fill="white" />
                    </div>
                  }
                  iconEnd={
                    <div className="w-6 h-6 rotate-90">
                      <ChevronSvg />
                    </div>
                  }
                />
              </>
            ) : (
              <Link href="/user/login">
                <Button content="Sign in" variant="secondary" />
              </Link>
            )}
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
    </nav>
  );
};

export default Navbar;
