import { Category } from "@/__generated__/graphql";
import Link from "next/link";
import SubscribeForm from "./SubscribeForm";

const Footer = ({ categories }: { categories: Category[] }) => {
  return (
    <footer className="bg-blue-900 text-white p-8 mt-8">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <ul className="grid grid-cols-2">
            {categories.map((category) => (
              <Link href={`/search?cat=${category.id}`} key={category.id}>
                <li className="mb-2">{category.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <SubscribeForm />
        </div>
      </div>
      <div className="text-center mt-8">
        &copy; {new Date().getFullYear()} GrocerTease. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
