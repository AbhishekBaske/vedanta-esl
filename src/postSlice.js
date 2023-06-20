import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from './firebase';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const snapshot = await firestore.collection('posts').get();
  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
});

export const addPost = createAsyncThunk('posts/addPost', async (post) => {
  const { name, content } = post;
  const docRef = await firestore.collection('posts').add({
    name,
    content,
  });
  const snapshot = await docRef.get();
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await firestore.collection('posts').doc(postId).delete();
  return postId;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { actions } = postSlice;
export default postSlice.reducer;
