import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const REC_ENDPOINT = `https://api.spotify.com/v1/recommendations?`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  let genre;
  let sort;

  if (Array.isArray(query.genre)) {
    genre = query.genre[0];
  } else {
    genre = query.genre;
  }

  if (Array.isArray(query.sort)) {
    sort = query.sort[0];
  } else {
    sort = query.sort;
  }
    
  const sess = await getServerSession(req, res, authOptions);
  const accesstoken = sess?.accessToken;

  if (req.method === "GET") {
    const response = await getNowPlaying(accesstoken!, genre!, sort!);
    const parsed = await response.json();

    const data = {
      tracks: parsed.tracks,
    };

    return res.status(200).json(parsed.tracks);
  }
};

export default handler;

export const getNowPlaying = async (refresh_token: string, genre: string, sort: string) => {
  try {
    // Make the request to the Spotify API with the new access token
    const response = await fetch(
      REC_ENDPOINT + "limit=10&market=ES&" + "seed_genres=" + genre + "&" + sort,
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );

    if (!response.ok) {
      // Handle error response here if needed
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle errors here, e.g., log or throw them
    console.error("Error in getNowPlayingFetch:", error);
    throw error;
  }
};
