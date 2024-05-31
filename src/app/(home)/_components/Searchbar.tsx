import Input from "@/app/components/Input";
import SearchSvg from "@/../public/svg/search.svg";

export default function SearchBar() {
  return (
    <div className="flex items-center w-full">
      <Input
        type="text"
        placeholder="Search..."
        endAdornment={
          <div className="h-full w-6">
            <SearchSvg fill="#888888" />
          </div>
        }
      />
    </div>
  );
}
