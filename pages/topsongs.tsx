import * as React from "react";
import SmallSongDisplay from "@/components/SmallSongDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaClock, FaBars, FaThList} from "react-icons/fa";

export default function Home() {
  const session = useSession();

  const [songData, setSongData] = useState<any | null>(null); // Initialize songData state
  const [time, setTime] = useState<string | null>("short_term");
  const [limit, setLimit] = useState<string | null>("10");

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch(
        "/api/top-songs" + "?type=tracks" + "&limit=" + limit + "&time=" + time
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
  }, [session.status,time,limit]); // Run this effect whenever the 'data' changes

  const handleTimeChange = () => {
    if (time === "short_term") {
      setTime("medium_term");
    } else if (time === "medium_term") {
      setTime("long_term");
    } else {
      setTime("short_term");
    }
  };

  const handleLimitChange = () => {
    if (limit === "10") {
      setLimit("25");
    } else if (limit === "25") {
      setLimit("50");
    } else {
      setLimit("10");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
                onClick={() => handleTimeChange()}
                className="sm:text-md bg-green-500 font-semibold hover:bg-green-700 text-white py-2 px-3 rounded-lg transition duration-300"
              >
                <FaClock className="inline mr-2"></FaClock>
                {time === "short_term"
                  ? "1 month"
                  : time === "medium_term"
                  ? "6 months"
                  : "all time"}
              </button>
              <div className="ml-4 mr-4"></div>
              <button
                onClick={() => handleLimitChange()}
                className="sm:text-md bg-green-500 font-semibold hover:bg-green-700 text-white py-2 px-3 rounded-lg transition duration-300"
              >
                <FaBars className="inline mr-2"></FaBars>
                {limit === "10"
                  ? "10 songs"
                  : limit === "25"
                  ? "25 songs"
                  : "50 songs"}
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
