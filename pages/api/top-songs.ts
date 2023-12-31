import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  let time, limit, type;

  if (Array.isArray(query.time)) {
    time = query.time[0];
  } else {
    time = query.time;
  }

  if (Array.isArray(query.limit)) {
    limit = query.limit[0];
  } else {
    limit = query.limit;
  }

  if (Array.isArray(query.type)) {
    type = query.type[0];
  } else {
    type = query.type;
  }

  const sess = await getServerSession(req, res, authOptions);
  const accesstoken = sess?.accessToken;

  if (req.method === "GET") {
    const response = await getTopSongs(accesstoken!, time!, limit!, type!);
    const parsed = await response.json();

    return res.status(200).json(parsed.items);
  }
};

export default handler;

export const getTopSongs = async (refresh_token: string, time: string, limit : string, type: string) => {
  try {
    // Make the request to the Spotify API with the new access token
    const response = await fetch(
      TRACKS_ENDPOINT + type + "?limit=" + limit + "&time_range=" + time,
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
