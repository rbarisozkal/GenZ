"use client";
import { useEffect, useState } from "react";
import { useNewsStore } from "../../store/news";
import { CiSearch } from "react-icons/ci";
import "./styles.scss";
export default function News() {
  const [news, setNews] = useState([]);
  const topics = [
    { value: "art", text: "Arts/Music" },
    { value: "sports", text: "Sports" },
    { value: "politics", text: "Politics" },
    { value: "culture", text: "Culture" },
  ];
  const getNews = (topic: any) => {
    console.log(topic);
  };
  const getAllNews = async () => {
    let response = fetch(
      `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    console.log((await response).json());
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
          placeholder="Search for topics..."
        />
        <div>
          {" "}
          {topics.map((topic) => {
            console.log(topic);
            return (
              <span onClick={() => getNews(topic.value)} className="topic">
                {topic.text}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
