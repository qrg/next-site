import { NextApiRequest, NextApiResponse } from 'next';

export default function setHeaders(req: NextApiRequest, res: NextApiResponse, maxAge = 1): boolean {
  // set SPR/CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', `s-maxage=${maxAge}, stale-while-revalidate`);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'pragma');

  if (req.method === 'OPTIONS') {
    res.status(200);
    res.end();
    return true;
  }
  if (req.method !== 'GET') {
    res.status(405);
    res.setHeader('Allow', 'GET, OPTIONS');
    res.end();
    return true;
  }
  return false;
}
