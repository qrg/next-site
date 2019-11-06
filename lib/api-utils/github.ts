import { Response } from 'node-fetch';
import fetch from '../fetch';

const GITHUB_URL = 'https://raw.githubusercontent.com';

async function getError(res: Response) {
  const errorText = await getErrorText(res);
  const error = new Error(`GitHub raw download error (${res.status}): ${errorText}`);

  (error as any).headers = res.headers.raw();

  return error;
}

function getErrorText(res: Response) {
  try {
    return res.text();
  } catch (err) {
    return res.statusText;
  }
}

export async function getRawFileFromGitHub(path: string) {
  const res = await fetch(GITHUB_URL + path);

  if (res.ok) {
    return res.text();
  } else {
    throw await getError(res);
  }
}
