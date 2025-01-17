import { SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between gap-2 py-5">
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="O que você procura?"
          autoComplete="off"
          className="rounded-md flex justify-end px-3 py-2 w-[17rem] bg-background text-secondaryColor pr-8"
        />
        <span className="absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer text-secondaryColor">
          <SearchIcon size={20} />
        </span>
      </div>
      <Link className="bg-primaryColor rounded-md p-2" href="/user/sign-in">
        <UserIcon />
      </Link>
    </header>
  );
};

export default Header;
