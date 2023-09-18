import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <div className="sm:container sm:mx-auto">
      <div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-6">
        {/* Header menu links and small screen hamburger menu */}
        <div className="flex justify-between items-center px-4 sm:px-0">
          <div>
            <Link
              href="/"
              className="block text-left font-general-semibold duration-300 text-xl mt-2 text-primary-dark dark:text-ternary-light hover:text-green-600 dark:hover:text-green-400  sm:mx-4 mb-2 sm:py-2"
              aria-label="Projects"
            >
              aj&apos;s spotify playground
            </Link>
          </div>

          {/* Small screen hamburger menu */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none"
              aria-label="Hamburger Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"
              >
                {showMenu ? (
                  <FiX className="text-3xl" />
                ) : (
                  <FiMenu className="text-3xl" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Header links small screen */}
        <div
          className={
            showMenu
              ? "block m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none transition duration-300"
              : "hidden"
          }
        >
          <Link
            href="/recommendations"
            className="block text-left text-lg text-primary-dark hover:text-green-600  sm:mx-4 mb-2 sm:py-2  border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
          >
            recommendations
          </Link>
          <Link
            href="/topsongs"
            className="block text-left text-lg text-primary-dark hover:text-green-600  sm:mx-4 mb-2 sm:py-2  border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
          >
            top songs
          </Link>
          <Link
            href="/topartists"
            className="block text-left text-lg text-primary-dark hover:text-green-600  sm:mx-4 mb-2 sm:py-2  border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
          >
            top artists
          </Link>
        </div>

        {/* Header links large screen */}
        <div className="font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
          <Link
            href="/recommendations"
            className="block text-left text-lg text-primary-dark hover:text-green-600  sm:mx-4 mb-2 sm:py-2 duration-300"
          >
            recommendations
          </Link>
          <Link
            href="/topsongs"
            className="block text-left text-lg text-primary-dark hover:text-green-600  sm:mx-4 mb-2 sm:py-2 duration-300"
          >
            top songs
          </Link>
          <Link
            href="/topartists"
            className="block text-left text-lg text-primary-dark hover:text-green-600  sm:mx-4 mb-2 sm:py-2 duration-300"
          >
            top artists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
