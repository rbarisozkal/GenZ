"use client";
import { useEffect, useState } from "react";
import { useNewsStore } from "../../store/news";
export default function News() {
  const [news, setNews] = useState([]);
  const getAllNews = async () => {
    let response = fetch(
      `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    console.log((await response).json());
  };
  useEffect(() => {
    console.log();
    getAllNews();
  }, []);
  return <h1>News</h1>;
}
