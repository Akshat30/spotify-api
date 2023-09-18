import { useRouter } from "next/router";
import * as React from "react";
import SmallSongDisplay from "@/components/SmallSongDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const id = router.query.id;

  const [trackData, setTrackData] = useState<any | null>({}); // Initialize songData state

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch("/api/track-features?id=" + id)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseData) => {
          // Update songData state with the fetched data
          setTrackData(responseData);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  }, [session.status]); // Run this effect whenever the 'data' changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-green-300 font-semibold">
        {/* {session.status === "authenticated"
          ? session.data.user?.name || "friend"
          : "stranger"}
        &apos;s */}
        song info for {id}
      </h1>
      <h1 className="text-4xl text-green-300 font-semibold">
        {/* {session.status === "authenticated"
          ? session.data.user?.name || "friend"
          : "stranger"}
        &apos;s */}
        {id}
      </h1>
      <div>
        {session.status === "authenticated" ? (
          <div className="mt-8">
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col">
                {Object.entries(trackData).map(
                  ([key, value]: [string, any], index): React.ReactNode => (
                    <h3
                      key={index}
                      className="text-md text-white-300 font-semibold ml-3 mt-1"
                    >
                      {key} : {value}
                    </h3>
                  )
                )}
              </div>
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
