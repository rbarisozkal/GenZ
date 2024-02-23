"use client";
import { useEffect, useState } from "react";
import { useNewsStore } from "../../store/news";
import { CiSearch } from "react-icons/ci";
import "./styles.scss";
export default function News() {
  const [news, setNews] = useState([]);
  const [phrase, setPhrase] = useState("");
  const topics = [
    { value: "Science", text: "Science" },
    { value: "sports", text: "Sports" },
    { value: "health", text: "Health" },
    { value: "entertainment", text: "Entertainment" },
    { value: "general", text: "General" },
    { value: "technology", text: "Technology" },
    { value: "business", text: "Business" },
  ];
  const getNewsByPhrase = async (phrase: string) => {
    //https://newsapi.org/v2/everything?q=Apple&from=2024-02-23&sortBy=popularity&apiKey=API_KEY
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const year = oneWeekAgo.getFullYear();
    const month = oneWeekAgo.getMonth() + 1; // Months are zero-indexed
    const day = oneWeekAgo.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    try {
      let response = await fetch(
        `https://newsapi.org/v2/everything?q=${phrase}&from=${formattedDate}&sortBy=popularity&pageSize=20
        &apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );

      if (response.ok) {
        let phraseRelatedArticles = await response.json();
        console.log(phraseRelatedArticles);
        setNews(phraseRelatedArticles.articles);
      } else {
        console.error(
          "Failed to fetch news:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  const getNews = async (topic: any) => {
    try {
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=tr&category=${topic}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );

      if (response.ok) {
        let topicRelatedArticles = await response.json();
        console.log(topicRelatedArticles);
        setNews(topicRelatedArticles.articles);
      } else {
        console.error(
          "Failed to fetch news:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    //getAllNews();
  }, []);
  return (
    <>
      <div className="flex flex-col px-4">
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4 px-4"
          placeholder="Search for news from last week..."
          onChange={(e) => setPhrase(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              getNewsByPhrase(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <div className="flex flex-wrap">
          {" "}
          {topics.map((topic) => {
            return (
              <span
                key={topic.value}
                onClick={() => getNews(topic.value)}
                className="topic"
              >
                {topic.text}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
