import React, { useState } from "react";
import "../assets/sass/form.scss";
import axiosInstance from "../api/confiig";

const AddBook = () => {
  const [formData, setFormData] = useState();
  const [imageData, setImageData] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();

    try{
    const response = await axiosInstance.post(
      "/book/add",
      {
        ...formData,
        image: imageData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if(response.data.id){
      console.log(response);
      e.target.reset();
      setFormData({});
      setImageData();
    }
    setImageData(null);
    console.log("Response", response);
  } catch(err){
    console.log(err);
  }
};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "15px",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
        onSubmit={addBook}
      >
        Name
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required
        />
        Author
        <input
          type="text"
          name="author"
          onChange={handleChange}
          value={formData.author}
          required
        />
        Genre
        <input
          type="text"
          name="genre"
          onChange={handleChange}
          required
        />
        Description
        <textarea
          name="description"
          rows={10}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="image"
          onChange={(e) => setImageData(e.target.files[0])}
          accept=".png, .jpeg, .jpg"
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddBook;
