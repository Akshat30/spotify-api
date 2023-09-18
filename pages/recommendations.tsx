import * as React from "react";
import SmallSongDisplay from "@/components/SmallSongDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaClock, FaBars, FaThList } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Home() {
  const session = useSession();

  const [songData, setSongData] = useState<any | null>(null); // Initialize songData state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGenre, setGenre] = useState("pop"); // Default title
  const [sort, setSort] = useState("popular"); // Default title

  const genres = [
    "chill",
    "happy",
    "country",
    "drum-and-bass",
    "edm",
    "hip-hop",
    "house",
    "indie",
    "pop",
    "rock",
    "romance",
    "sad",
  ];

  interface Sorts {
    [key: string]: string;
    danceable: string;
    energetic: string;
    calm: string;
    popular: string;
    "lesser known": string;
    fast: string;
    slow: string;
  }

  const sorts: Sorts = {
    danceable: "min_danceability=0.6",
    energetic: "min_energy=0.6",
    calm: "max_energy=0.5",
    popular: "min_popularity=60",
    "lesser known": "max_popularity=40",
    fast: "min_tempo=160",
    slow: "max_tempo=80",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleGenreClick = (genre: string) => {
    setGenre(genre);
    closeDropdown();
  };
  const handleSortClick = (sort: string) => {
    setSort(sort);
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch(
        "/api/get-specific-recommendations?genre=" +
          selectedGenre +
          "&sort=" +
          sorts[sort]
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseData) => {
          // Update songData state with the fetched data
          setSongData(responseData);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  }, [session.status, selectedGenre, sort]); // Run this effect whenever the 'data' changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-green-300 font-semibold">
        {/* {session.status === "authenticated"
          ? session.data.user?.name || "friend"
          : "stranger"}
        &apos;s */}
        recommendations
      </h1>
      <div>
        {session.status === "authenticated" ? (
          <div className="mt-8">
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-row">
                <h3 className="text-xl text-white-300 font-semibold mr-3 mt-1">
                  I want
                </h3>
                <div className="relative inline-block text-center">
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className={`inline-flex justify-center items-center px-2 py-1 rounded-md shadow-sm text-xl font-medium text-white-300 bg-green-500 hover:bg-green-700 z-10`}
                    id="dropdown-button"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="flex items-center">
                      <span className="flex-grow">{selectedGenre}</span>
                      <span className="pl-2">&#9662;</span>
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="absolute w-32 rounded-md shadow-lg bg-white z-20"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="dropdown-button"
                    >
                      {genres.map((genre) => (
                        <button
                          onClick={() => handleGenreClick(genre)}
                          className="block text-center w-full border-t rounded-lg px-4 py-2 text-xs text-gray-700 bg-gray-100 hover:bg-gray-300 hover:text-gray-900"
                          role="menuitem"
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-xl text-white-300 font-semibold ml-3 mt-1">
                  songs that are:
                </h3>
              </div>
            </div>
            <div className="mt-8 w-84 flex flex-wrap gap-4 justify-center items-center">
              {Object.entries(sorts).map(([key]) => (
                <button
                  onClick={() => handleSortClick(key)}
                  className={`sm:text-sm font-regular py-1 px-2 rounded-lg transition duration-300 ${
                    key === sort
                      ? "text-white bg-green-900"
                      : "text-gray-100 bg-green-500 hover:bg-green-700"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="flex flex-col mt-8 items-center justify-center mb-12">
              {songData?.map((track: any, index: any) => (
                <div key={index} className="mt-2">
                  <SmallSongDisplay track={track} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex mt-4 items-center justify-center">
            <p>Please sign in!</p>
          </div>
        )}
      </div>
    </div>
  );
}
