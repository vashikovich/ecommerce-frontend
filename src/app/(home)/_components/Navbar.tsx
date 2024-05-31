"use client";
import Image from "next/image";
import CategoryBar from "./CategoryBar";
import { Category } from "@/lib/definitions";
import SearchBar from "./Searchbar";
import BurgerButton from "./BurgerButton";
import LogoImg from "@/../public/img/logo.png";
import CartSvg from "@/../public/svg/cart.svg";

const Navbar = ({ categories }: { categories: Category[] }) => {
  return (
    <nav className="">
      <div className="bg-blue-900 text-white p-4 flex items-center">
        <div className="flex-1 mr-auto">
          <BurgerButton />
        </div>
        <div className="flex-1 flex justify-center">
          <Image src={LogoImg} alt="Logo" />
        </div>
        <div className="flex justify-end flex-1 ml-auto">
          <div className="h-full w-6">
            <CartSvg fill="white"/>
          </div>
          <div className="relative">
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
          </div>
        </div>
      </div>
      <div className="text-white px-6 py-4 flex justify-center">
        <SearchBar />
      </div>
      {/* <CategoryBar categories={categories} /> */}
    </nav>
  );
};

export default Navbar;
