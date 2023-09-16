import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sess = await getServerSession(req, res, authOptions);

  const accesstoken = sess?.accessToken;
  
  const response = await getUsersPlaylists(accesstoken!);
  const {items} = await response.json();

  return res.status(200).json({items});
};

export default handler;

export const getUsersPlaylists = async (refresh_token: string) => {
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
};