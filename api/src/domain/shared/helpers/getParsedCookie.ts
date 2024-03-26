export const getParsedCookie = (cookie: string): string | null => {
  const tokenRegex = /refresh_token=([^;]+)/;
  try {
    const parsedCookie = tokenRegex.exec(cookie)[1];
    return parsedCookie;
  } catch (error) {
    return null;
  }
};
