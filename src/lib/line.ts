export function buildLiffUrl(liffId: string, params: Record<string, string>) {
  const search = new URLSearchParams(params);
  return `https://liff.line.me/${encodeURIComponent(liffId)}?${search.toString()}`;
}
