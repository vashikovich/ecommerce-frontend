import { Category } from "@/lib/definitions";

const Footer = ({ categories }: { categories: Category[] }) => {
  return (
    <footer className="bg-blue-900 text-white p-8 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <ul>
            {categories.slice(0, 10).map(category => (
                <li key={category.id} className="mb-2">
                  {category.name}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-coral">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-coral">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-coral">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-coral">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded w-full bg-white text-black mb-2"
            />
            <button
              type="submit"
              className="w-full bg-coral text-white py-2 px-4 rounded hover:bg-blue-900"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-8">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
