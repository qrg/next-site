import { NextApiRequest, NextApiResponse } from 'next';
import setHeaders from '../../../lib/api-utils/set-headers';
import { getRawFileFromGitHub } from '../../../lib/api-utils/github';

const MANIFEST_PATH = '/lfades/next.js/new-docs/docs/manifest.json';

export default async function manifest(req: NextApiRequest, res: NextApiResponse) {
  if (setHeaders(req, res, 300)) return;

  try {
    res.json(await getRawFileFromGitHub(MANIFEST_PATH));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error ocurred'
    });
  }
}
