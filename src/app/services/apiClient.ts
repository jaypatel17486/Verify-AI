// Central API client — reads VITE_BACKEND_URL from the environment.
// When running on Azure SWA the variable is empty and relative paths are used.
// When running on Vercel set VITE_BACKEND_URL=https://orange-bush-018b1141e.7.azurestaticapps.net
const BASE_URL: string = (import.meta.env.VITE_BACKEND_URL as string) ?? '';

export async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed — HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed — HTTP ${res.status}`);
  return res.json() as Promise<T>;
}
