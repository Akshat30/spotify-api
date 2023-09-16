import * as React from "react";
import SmallSongDisplay from "@/components/SmallSongDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();

  const [songData, setSongData] = useState<any | null>(null); // Initialize songData state

//   useEffect(() => {
//       fetch("/api/top-songs")
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Request failed with status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((responseData) => {
//           // Update songData state with the fetched data
//           setSongData(responseData);
//         })
//         .catch((error) => {
//           console.error("Error fetching recommendations:", error);
//         });
//   }, []); // Run this effect whenever the 'data' changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-green-300 font-semibold">
        {session.status === "authenticated"
          ? session.data.user?.name || "friend"
          : "stranger"}'s top songs!
      </h1>
      <div>
        {session.status === "authenticated" ? (
          <div className="mt-4">
              <div className="flex flex-col mt-8 items-center justify-center mb-12">
                {/* {songData?.map((track: any, index: any) => (
                  <div key={index} className="mt-2">
                    <SmallSongDisplay track={track} />
                  </div>
                ))} */}
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
