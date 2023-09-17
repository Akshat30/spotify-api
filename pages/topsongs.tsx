import * as React from "react";
import SmallSongDisplay from "@/components/SmallSongDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();

  const [songData, setSongData] = useState<any | null>(null); // Initialize songData state
  const [time, setTime] = useState<string | null>("short_term");

  useEffect(() => {
    if (session.status === "authenticated") {
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
    }
  }, [session.status,time]); // Run this effect whenever the 'data' changes

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
        your top songs
      </h1>
      <div>
        {session.status === "authenticated" ? (
          <div className="mt-8">
            <div className="flex flex-row items-center justify-center">
              <button
                onClick={() => handleTimeChange("short_term")}
                className={`sm:text-md ${
                  time === "short_term"
                    ? "bg-green-700 font-semibold"
                    : "bg-green-500 font-regular"
                } hover:bg-green-700 text-white py-2 px-3 rounded-lg transition duration-300`}
              >
                1 month
              </button>
              <div className="ml-4 mr-4"></div>
              <button
                onClick={() => handleTimeChange("medium_term")}
                className={`sm:text-md ${
                  time === "medium_term"
                    ? "bg-green-700 font-semibold"
                    : "bg-green-500 font-regular"
                } hover:bg-green-700 text-white py-2 px-3 rounded-lg transition duration-300`}
              >
                6 months
              </button>
              <div className="ml-4 mr-4"></div>
              <button
                onClick={() => handleTimeChange("long_term")}
                className={`sm:text-md ${
                  time === "long_term"
                    ? "bg-green-700 font-semibold"
                    : "bg-green-500 font-regular"
                } hover:bg-green-700 text-white py-2 px-3 rounded-lg transition duration-300`}
              >
                all time
              </button>
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
