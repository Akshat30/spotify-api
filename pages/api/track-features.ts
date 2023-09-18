import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const FEATURE_ENDPOINT = `https://api.spotify.com/v1/audio-features/`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  let id;

  if (Array.isArray(query.id)) {
    id = query.id[0];
  } else {
    id = query.id;
  }

  const sess = await getServerSession(req, res, authOptions);
  const accesstoken = sess?.accessToken;

  if (req.method === "GET") {
    const response = await getNowPlaying(accesstoken!, id!);
    const parsed = await response.json();
      
    return res.status(200).json(parsed);
  }
};

export default handler;

export const getNowPlaying = async (
  refresh_token: string,
  id: string
) => {
  try {
    // Make the request to the Spotify API with the new access token
    const response = await fetch(
      FEATURE_ENDPOINT +
        id,
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
