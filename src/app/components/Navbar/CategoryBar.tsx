import { Category } from "@/__generated__/graphql";
import Image from "next/image";
import NavbarModal from "./NavbarModal";
import { useState } from "react";
import classNames from "classnames";

const CategoryBar = ({ categories }: { categories: Category[] }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <div className="flex justify-center bg-white">
      {categories.map((category) => (
        <div key={category.id} className="relative">
          <div
            className="text-blue-900 cursor-pointer py-5 px-3 hover:bg-beige"
            onMouseEnter={() => setActiveCategory(category.id)}
          >
            <h6>{category.name}</h6>
          </div>
          {activeCategory === category.id && (
            <NavbarModal onOverlayClick={() => setActiveCategory(null)}>
              <div
                className={classNames( 
                  "relative mx-auto bg-white shadow-lg rounded-b max-w-screen-lg grid-cols-4 grid-flow-col grid p-6",
                  Math.ceil(category.subcategories.length / 4) === 1 &&
                    "grid-rows-1",
                  Math.ceil(category.subcategories.length / 4) === 2 &&
                    "grid-rows-2",
                  Math.ceil(category.subcategories.length / 4) === 3 &&
                    "grid-rows-3",
                  Math.ceil(category.subcategories.length / 4) === 4 &&
                    "grid-rows-4",
                  Math.ceil(category.subcategories.length / 4) === 5 &&
                    "grid-rows-5",
                  Math.ceil(category.subcategories.length / 4) === 6 &&
                    "grid-rows-6",
                  Math.ceil(category.subcategories.length / 4) === 7 &&
                    "grid-rows-7",
                  Math.ceil(category.subcategories.length / 4) === 8 &&
                    "grid-rows-8",
                  Math.ceil(category.subcategories.length / 4) === 9 &&
                    "grid-rows-9",
                  Math.ceil(category.subcategories.length / 4) === 10 &&
                    "grid-rows-10"
                )}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="flex items-center p-2">
                    <Image
                      src={subcategory.image}
                      alt={subcategory.name}
                      width={100}
                      height={100}
                      className="h-8 w-8 mr-2"
                    />
                    <span>{subcategory.name}</span>
                  </div>
                ))}
              </div>
            </NavbarModal>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
