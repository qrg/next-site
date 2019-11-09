import { NextApiRequest, NextApiResponse } from 'next';
import setHeaders from '../../../lib/api-utils/set-headers';
import { getRawFileFromRepo } from '../../../lib/github';

export default async function manifest(req: NextApiRequest, res: NextApiResponse) {
  if (setHeaders(req, res, 60)) return;

  try {
    res.json(await getRawFileFromRepo('/docs/manifest.json'));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error ocurred'
    });
  }
}
