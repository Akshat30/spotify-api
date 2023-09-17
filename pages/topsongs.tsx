import * as React from "react";
import SmallSongDisplay from "@/components/SmallSongDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();

  const [songData, setSongData] = useState<any | null>(null); // Initialize songData state
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/top-songs" + "?time=" + time)
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
  }, [time]); // Run this effect whenever the 'data' changes

  const handleTimeChange = (selectedTime: string) => {
    setTime(selectedTime);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-green-300 font-semibold">
        {/* {session.status === "authenticated"
          ? session.data.user?.name || "friend"
          : "stranger"}
        &apos;s */}
        top songs of all time:
      </h1>
      <div>
        {session.status === "authenticated" ? (
          <div className="mt-4">
            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="dropdown-menu"
                    aria-haspopup="true"
                    onClick={() => {}}
                  >
                    Select Time Period
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 6.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 8.414V16a1 1 0 11-2 0V8.414L6.707 10.707a1 1 0 01-1.414-1.414l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-menu"
                >
                  <div className="py-1" role="none">
                    <button
                      onClick={() => handleTimeChange("short_term")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Short Term
                    </button>
                    <button
                      onClick={() => handleTimeChange("medium_term")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Medium Term
                    </button>
                    <button
                      onClick={() => handleTimeChange("long_term")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Long Term
                    </button>
                  </div>
                </div>
              </div>
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
