import * as React from "react";
import { SiSpotify } from "react-icons/si";

export default function SmallSongDisplay({ track }: { track: any }) {
  const artists = track.artists.map((artist: any) => artist.name).join(", ");
  return (
    <button
      onClick={() => fetch("/api/play-song?uri=" + track.uri)}
      className="flex relative text-left bg-gray-900 items-center space-x-4 w-72 rounded-lg hover:bg-gray-800 transition duration-300"
    >
      <div className="w-12">
        <img
          className="w-12 shadow-sm rounded-lg"
          src={track?.album.images[0].url}
          alt={track.album.name}
        />
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="component text-sm font-bold">
            {track.name.length >= 24
              ? track.name.substring(0, 24) + "..."
              : track.name}
          </p>
          <p className="font-dark text-xs">
            {artists.length >= 30 ? artists.substring(0, 30) + "..." : artists}
          </p>
        </div>
      </div>
    </button>
  );
}
