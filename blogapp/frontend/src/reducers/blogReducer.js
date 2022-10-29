import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload;
      const blogToLike = state.find((n) => n.id === id);
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : likedBlog));
    },
    addComment(state, action) {
      const commentedBlog = action.payload;
      return state.map((blog) => (blog.id !== commentedBlog.id ? blog : commentedBlog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    addBlog(state, action) {
      state.push(action.payload)
    }
  },
});

export const { like, setBlogs, removeBlog, addBlog, addComment } = blogSlice.actions;

export default blogSlice.reducer;
