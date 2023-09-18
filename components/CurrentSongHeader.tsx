import * as React from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { Waveform } from "@uiball/loaders";

export default function CurrentSongHeader() {
  const session = useSession();
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/current-song", fetcher, {
    refreshInterval: 500,
  });

  return (
    <div className="w-full flex items-center justify-center mt-4 mb-12">
      {data?.isPlaying ? (
        <div className="mr-4">
          <Waveform size={22} lineWeight={2} speed={1} color="#1ED760" />
        </div>) : (<div></div>)}
      <a
        target="_blank"
        rel="noopener noreferer"
        href={
          data?.isPlaying
            ? data.songUrl
            : "https://open.spotify.com/user/31kdt6sl2iasi2mhtuxdpkqqscoa?si=75a37c65ed884222"
        }
        className="flex border-2 border-zinc-800 relative bg-neutral-900 items-center space-x-4 w-56 rounded-lg hover:bg-zinc-800 transition duration-300"
      >
        {data?.isPlaying ? (
          <div className="w-12">
            <img
              className="w-12 rounded-lg"
              src={data?.albumImageUrl}
              alt={data?.album}
            />
          </div>
        ) : (
          <div className="w-16 px-1 py-1">
            <SiSpotify size={48} color={"#1ED760"} />
          </div>
        )}
        <div className="flex flex-row">
          <div className="flex-1">
            <p className="component text-xs font-bold">
              {data?.isPlaying
                ? data.title.length >= 22
                  ? data.title.substring(0, 22) + "..."
                  : data.title
                : "Not Listening"}
            </p>
            <p className="font-dark text-[0.65rem]">
              {data?.isPlaying
                ? data.artist.length >= 24
                  ? data.artist.substring(0, 24) + "..."
                  : data.artist
                : "Spotify"}
            </p>
          </div>
          {/* <div className="ml-4">
          <SiSpotify size={20} color={"#1ED760"} />
        </div> */}
        </div>
      </a>
    </div>
  );
}
