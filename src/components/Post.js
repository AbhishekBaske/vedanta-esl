import React, { useState } from "react";
import { auth, firestore } from "../firebase";

const Post = () => {
  const [content, setContent] = useState("");
  const user = auth.currentUser;
  const display = user.displayName
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postRef = firestore.collection("posts").doc(user.uid);
      await postRef.set({
        name: display,
        content : content
      });
      console.log("Post created successfully!");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <h2>Share Your Knowledge</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Write your post here (limit: 1000 words)"
          rows={10}
          maxLength={1000}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Post;
