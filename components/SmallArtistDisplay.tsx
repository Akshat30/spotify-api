import * as React from "react";
import { SiSpotify } from "react-icons/si";

export default function SmallSongDisplay({ artist }: { artist: any }) {
  const genres = artist.genres.map((genre: any) => genre).join(", ");
  return (
    <button
      //   onClick={() => fetch("/api/play-song?uri=" + track.uri)}
      // hover:bg-neutral-800 transition duration-300
      className="flex relative text-left items-center space-x-4 w-72 rounded-lg"
    >
      <div className="w-14">
        <img
          className="w-14 rounded-full"
          src={artist?.images[0].url}
          alt={artist.name}
        />
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="component text-md font-bold">
            {artist.name.length >= 24
              ? artist.name.substring(0, 24) + "..."
              : artist.name}
          </p>
          <p className="font-dark text-xs">
            {genres.length >= 30 ? genres.substring(0, 30) + "..." : genres}
          </p>
        </div>
      </div>
    </button>
  );
}
