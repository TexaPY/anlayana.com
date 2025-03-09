import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const url = 'https://syan.anlayana.com/user-activity/526822284694913042';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API isteği başarısız oldu!");
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('API isteği başarısız oldu:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}