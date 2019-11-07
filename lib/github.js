import fetch from './fetch';

const GITHUB_URL = 'https://raw.githubusercontent.com';
const REPO_PATH = '/lfades/next.js/new-docs';

function getErrorText(res) {
  try {
    return res.text();
  } catch (err) {
    return res.statusText;
  }
}

async function getError(res) {
  const errorText = await getErrorText(res);
  const error = new Error(`GitHub raw download error (${res.status}): ${errorText}`);

  error.headers = res.headers.raw();

  return error;
}

export async function getRawFileFromGitHub(path) {
  console.log('PATH', GITHUB_URL + path);
  const res = await fetch(GITHUB_URL + path);

  if (res.ok) return res.text();
  throw await getError(res);
}

export function getRawFileFromRepo(path) {
  return getRawFileFromGitHub(REPO_PATH + path);
}
