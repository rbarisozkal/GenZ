import Link from "next/link";
import logo from "../../public/assets/logo.jpeg";
export default function Navbar() {
  return (
    <div className="flex flex-row justify-between w-full px-12 py-2 bg-purple-700 text-white">
      <div className="text-yellow-400 text-4xl font-extrabold italic w-24">
        <img src={logo.src} alt="" />
      </div>
      <div className="flex justify-between items-center w-1/3 px-4 md:w-1/2 sm:w-3/4 max-[640px]:w-3/4">
        <Link href="/news" className="nav-link">
          News
        </Link>
        <Link href="/map" className="nav-link">
          Weather Map
        </Link>
        <Link href="/genz" className="nav-link">
          GenZ News
        </Link>
        <Link href="/" className="nav-link">
          Register
        </Link>
      </div>
    </div>
  );
}
