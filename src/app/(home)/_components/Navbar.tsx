"use client";
import Image from "next/image";
import CategoryBar from "./CategoryBar";
import { Category } from "@/lib/definitions";
import SearchBar from "./Searchbar";
import BurgerButton from "./BurgerButton";
import LogoImg from "@/../public/img/logo.png";
import CartSvg from "@/../public/svg/cart.svg";
import AccountSvg from "@/../public/svg/account.svg";
import CartModal from "./CartModal";
import AccountModal from "./AccountModal";
import CategoryModal from "./CategoryModal";
import NavbarModal from "./NavbarModal";

const Navbar = ({ categories }: { categories: Category[] }) => {
  return (
    <nav>
      <div className="relative bg-blue-900 text-white p-4 flex items-center z-50">
        <div className="flex-1 mr-auto">
          <BurgerButton />
        </div>
        <div className="flex-1 flex justify-center">
          <Image src={LogoImg} alt="Logo" />
        </div>
        <div className="flex justify-end flex-1 ml-auto space-x-2">
          <div className="h-6 w-6">
            <CartSvg fill="white" />
          </div>
          {/* <div className="relative"> */}
          <div className="h-7 w-7">
            <AccountSvg fill="white" />
          </div>
          {/* <button className="mr-4">Account</button> */}
          {/* <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <a href="/login" className="block px-4 py-2">
              Login
            </a>
            <a href="/register" className="block px-4 py-2">
              Register
            </a>
            <a href="/profile" className="block px-4 py-2">
              Profile
            </a>
          </div> */}
          {/* </div> */}
        </div>
      </div>
      {/* <div className="text-white px-6 py-4 flex justify-center">
        <SearchBar />
      </div> */}
      {/* <CategoryBar categories={categories} /> */}
      {/* <NavbarModal> */}
        {/* <CartModal /> */}
        {/* <AccountModal /> */}
        {/* <CategoryModal categories={categories} /> */}
      {/* </NavbarModal> */}
    </nav>
  );
};

export default Navbar;
