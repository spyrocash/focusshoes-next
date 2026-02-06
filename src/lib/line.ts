export function buildLiffUrl(liffId: string, params: Record<string, string>) {
  const search = new URLSearchParams(params);
  return `https://liff.line.me/${encodeURIComponent(liffId)}?${search.toString()}`;
}

export function buildChatWithOAUrl(liffId: string, text: string) {
  return `https://line.me/R/oaMessage/${encodeURIComponent(liffId)}?${text}`;
}
