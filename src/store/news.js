import { create } from "zustand";
export const useNewsStore = create((set) => ({
  news: 0,
  getAllNews: async () => {
    const response = await fetch(
      "https://newsapi.org/v2/everything?apiKey=8425bc3a23c54aaeb0a401e6b1d892de"
    );
    set({ news: await response.json() });
  },
}));
