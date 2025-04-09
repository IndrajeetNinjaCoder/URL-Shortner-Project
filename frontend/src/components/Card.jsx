// src/components/ui/card.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Card = () => {
  const [url, setUrl] = useState([]);
  const [click, setClick] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/url/all");
        setUrl(response.data);
        console.log(url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>This is Card</h1>
      <ul>
      {
        url.map((u) => {
          return (
            <li key={u._id}>
              // TODO: hit a get request to redirect whenever clicking on this shortID
              <a href={u.redirectURL} target="_blank">{u.shortID}</a>
            </li>
          )
        })
      }
      </ul>
    </>
  );
};
