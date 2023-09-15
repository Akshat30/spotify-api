import * as React from "react";
import { SiSpotify } from "react-icons/si";

export default function CurrentSong({data}:{data:any}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferer"
      href={
        data?.isPlaying
          ? data.songUrl
          : "https://open.spotify.com/user/erence21?si=yTsrZT5JSHOp7tn3ist7Ig"
      }
      className="flex relative bg-gray-900 items-center space-x-4 w-72 rounded-lg hover:bg-gray-800 transition duration-300"
    >
      <div className="w-16">
        {data?.isPlaying ? (
          <img
            className="w-16 shadow-sm rounded-lg"
            src={data?.albumImageUrl}
            alt={data?.album}
          />
        ) : (
          <SiSpotify size={64} color={"#1ED760"} />
        )}
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="component font-bold">
            {data?.isPlaying
              ? data.title.length >= 22
                ? data.title.substring(0, 22) + "..."
                : data.title
              : "Not Listening"}
          </p>
          <p className="font-dark text-xs">
            {data?.isPlaying
              ? data.artist.length >= 28
                ? data.artist.substring(0, 28) + "..."
                : data.artist
              : "Spotify"}
          </p>
        </div>
        {/* <div className="ml-4">
          <SiSpotify size={20} color={"#1ED760"} />
        </div> */}
      </div>
    </a>
  );
}
