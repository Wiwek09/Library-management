import React, { useEffect, useState } from "react";
import axiosInstance from "../api/confiig";

const DashBoard = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get("/book");
      setBookList(response.data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex"}}>
      {bookList.map((book, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              boxShadow: "0px 0px 5px #ccc",
              marginLeft: "20px",
            }}
          >
            <img
              src={book.image}
              alt={`image ${index}`}
              style={{ height: "250px", width: "250px", objectFit: "contain" }}
            />
            <br />
            {book.name}
          </div>
        );
      })}
    </div>
  );
};

export default DashBoard;
