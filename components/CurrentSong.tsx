import * as React from "react";
import { SiSpotify } from "react-icons/si";

export default function CurrentSong({track}:{track:any}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferer"
      href={
        track?.isPlaying
          ? track.songUrl
          : "https://open.spotify.com/user/31kdt6sl2iasi2mhtuxdpkqqscoa?si=75a37c65ed884222"
      }
      className="flex relative bg-gray-900 items-center space-x-4 w-72 rounded-lg hover:bg-gray-800 transition duration-300"
    >
      <div className="w-16">
        {track?.isPlaying ? (
          <img
            className="w-16 shadow-sm rounded-lg"
            src={track?.albumImageUrl}
            alt={track?.album}
          />
        ) : (
          <SiSpotify size={64} color={"#1ED760"} />
        )}
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="component font-bold">
            {track?.isPlaying
              ? track.title.length >= 22
                ? track.title.substring(0, 22) + "..."
                : track.title
              : "Not Listening"}
          </p>
          <p className="font-dark text-xs">
            {track?.isPlaying
              ? track.artist.length >= 28
                ? track.artist.substring(0, 28) + "..."
                : track.artist
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
