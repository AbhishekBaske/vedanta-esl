import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, firestore } from '../firebase';
import { actions, fetchPosts, addPost, deletePost } from '../postSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  height: 150px;
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const Post = () => {
  const [content, setContent] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);
  const user = auth.currentUser;
  const display = user.displayName;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to create a post.');
      return;
    }

    try {
      await dispatch(addPost({ name: display, content }));
      console.log('Post created successfully!');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      navigate('/');
    } else {
      navigate(`/search/${searchText}`);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await dispatch(deletePost(postId));
      console.log('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container>
      <Heading>Share Your Knowledge</Heading>
      <Form onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={handleChange}
          placeholder="Write your post here (limit: 1000 words)"
          maxLength={1000}
        />
        <Button type="submit">Submit</Button>
      </Form>
      <div>
        <input
          type="text"
          placeholder="Search posts"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h3>{post.name}</h3>
              <p>{post.content}</p>
              {user && user.uid === post.id && (
                <Button onClick={() => handleDelete(post.id)}>Delete</Button>
              )}
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default Post;
