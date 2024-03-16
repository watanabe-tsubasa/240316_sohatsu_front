interface response {
  message: string;
}

export const fetchWithScan = async (JAN: string) => {
  const res = await fetch('https://cloudflare-workers-with-hono-on-bun.t-watanabe423.workers.dev/api/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "message": JAN// '4549414082166'
    })
  })
  const data = await res.json() as response;
  console.log(data);
  return data
};