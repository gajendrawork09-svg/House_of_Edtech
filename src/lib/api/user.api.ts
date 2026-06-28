export const searchUsers = async (query: string) => {
  const response = await fetch(
    `/api/user/search?query=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};