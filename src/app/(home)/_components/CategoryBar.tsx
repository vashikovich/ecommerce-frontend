import { Category } from "@/lib/definitions";
import Image from "next/image";

const CategoryBar = ({ categories }: { categories: Category[] }) => {
  //   const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="bg-beige p-4 flex space-x-4 overflow-x-auto">
      {categories.map((category) => (
        <div key={category.id} className="relative">
          <button
            className="text-blue-900"
            // onMouseEnter={() => setActiveCategory(category.id)}
            // onMouseLeave={() => setActiveCategory(null)}
          >
            {category.name}
          </button>
          {/* {activeCategory === category.id && ( */}
          <div className="absolute top-full mt-2 bg-white shadow-lg rounded">
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
          {/* )} */}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
