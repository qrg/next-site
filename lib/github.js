import fetch from './fetch';
import { RAW_GITHUB_URL, REPO_NAME, REPO_BRANCH } from './github-constants';

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
  const res = await fetch(RAW_GITHUB_URL + path);

  if (res.ok) return res.text();
  throw await getError(res);
}

export function getRawFileFromRepo(path) {
  return getRawFileFromGitHub(`/${REPO_NAME}/${REPO_BRANCH}${path}`);
}
