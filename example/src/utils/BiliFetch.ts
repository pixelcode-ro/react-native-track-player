interface props {
  url: string;
  method: string | undefined;
  headers: any | undefined;
  body: any | undefined;
}

export default function BiliFetch({
  url,
  method = 'GET',
  headers = {},
  body,
}: props) {
  if (Object.entries(headers).length === 0) {
    if (/bilibili/.exec(url) || /bilivideo/.exec(url)) {
      headers = {
        referer: 'https://www.bilibili.com/',
      };
    }
  }
  headers['User-Agent'] =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62';
  console.debug({ method, headers, body });
  return fetch(url, { method, headers, body });
}
