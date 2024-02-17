"use client";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
export default function Map() {
  let mapboxgl = require("mapbox-gl/dist/mapbox-gl");
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  function findCity(e: any) {
    if (e.key === "Enter") {
      console.log(e.currentTarget.value);
      const cityInfo = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${e.currentTarget.value}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
      console.log(cityInfo);
    }
  }
  function initMap() {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }
  useEffect(() => {
    //initMap();
  }, []);
  return (
    <div className="relative h-screen">
      <div
        id="search"
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">
                <CiSearch />
              </span>
            </div>
            <input
              onKeyPress={(e) => {
                findCity(e);
              }}
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search City"
            />
          </div>
        </div>
      </div>
      <div ref={mapContainer} className="h-full"></div>
    </div>
  );
}
