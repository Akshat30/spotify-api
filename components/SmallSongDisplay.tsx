import Link from "next/link";
import * as React from "react";
import { Tooltip } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SmallSongDisplay({ track }: { track: any }) {
  const artists = track.artists.map((artist: any) => artist.name).join(", ");
  return (
    <div className="flex flex-row">
      <button
        onClick={() => fetch("/api/play-song?uri=" + track.uri)}
        className="flex border border-zinc-800 relative text-left bg-neutral-900 items-center space-x-4 w-72 rounded-lg hover:bg-neutral-800 transition duration-300"
      >
        <div className="w-12">
          <img
            className="w-12 rounded-lg"
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
              {artists.length >= 30
                ? artists.substring(0, 30) + "..."
                : artists}
            </p>
          </div>
        </div>
      </button>
      {/* <Link href={"/song/" + track.id} className="ml-2 mt-3">
        <Tooltip title="song analysis">
          <BsThreeDotsVertical className="inline mr-2"></BsThreeDotsVertical>
        </Tooltip>
      </Link> */}
    </div>
  );
}
