import fetch from './fetch';

export default async function fetchDocsManifest() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/docs/manifest`);

  if (res.ok) return res.json();

  throw new Error(`Fetch for docs manifest failed with code: ${res.status}`);
}
