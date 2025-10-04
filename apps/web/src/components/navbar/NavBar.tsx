import NavItem from "./NavItem";
import UserProfile from "./UserProfile";

export default function NavBar() {
  return (
    <div className="flex w-full h-18 p-2 px-8 gap-4 justify-between bg-linear-to-b from-white from-40% to-transparent">
      <a href="/">
        <div className="h-full flex items-center">
          <img src="/icon_text.png" className="h-1/2" />
        </div>
      </a>
      <NavItem />
      <div className=" flex items-center">
        <UserProfile />
      </div>
    </div>
  );
}
