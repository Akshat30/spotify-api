import * as React from "react";
import CurrentSong from "@/components/CurrentSong";
import SmallSongDisplay from "@/components/SmallSongDisplay";
import { signIn, signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/current-song", fetcher, {
    refreshInterval: 500,
  });

  const [songData, setSongData] = useState<any | null>(null); // Initialize songData state

  useEffect(() => {
    if (data && data.isPlaying) {
      // Fetch song recommendations when data is available and isPlaying is true

      fetch("/api/get-recommendations?id=" + data.id)
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
  }, [data]); // Run this effect whenever the 'data' changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {session.status === "authenticated" ? (
        <img
          alt="bruh"
          width="100"
          height="100"
          className="rounded-full h-24 w-24 mt-12"
          src={session.data.user?.image || ""}
        />
      ) : null}
      <h1 className="text-4xl text-green-300 font-semibold">
        Welcome,{" "}
        {session.status === "authenticated"
          ? session.data.user?.name || "friend"
          : "stranger"}
        !
      </h1>
      <div>
        {session.status === "authenticated" ? (
          <div className="mt-4">
            <div className="flex mt-4 items-center justify-center">
              <button
                className="bg-green-500 text-sm sm:text-lg hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                type="button"
                onClick={() => signOut()}
              >
                Sign out {session.data.user?.email}
              </button>
            </div>

            <div className="flex flex-col mt-8 items-center justify-center">
              <h3 className="text-xl text-white-300 font-semibold mb-2">
                Currently listening to:
              </h3>
              <CurrentSong data={data} />
            </div>
            {data?.isPlaying ? (
              <div className="flex flex-col mt-8 items-center justify-center mb-12">
                <h3 className="text-xl text-white-300 font-semibold mb-2">
                  Try listening to these songs:
                </h3>
                <p className="text-xs mb-2">(click on one)</p>
                {/* <button onClick={() => fetch("/api/pause-song")}>Pause</button> */}
                {songData?.map((track: any, index: any) => (
                  <div key={index} className="mt-2">
                    <SmallSongDisplay track={track} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col mt-8 items-center justify-center mb-12">
                <p className="text-sm mb-2">(go play some music!)</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex mt-4 items-center justify-center">
            <button
              type="button"
              className="bg-green-500 text-sm sm:text-lg hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              onClick={() => signIn("spotify")}
              disabled={session.status === "loading"}
            >
              Sign in with Spotify
            </button>
          </div>
        )}
      </div>

      {/* <h1 className="text-3xl font-bold text-center text-green-00 mb-8">
        You are currently listening to:
      </h1>
      <CurrentSong /> */}
    </div>
  );
}
