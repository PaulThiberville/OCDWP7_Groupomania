import { configureStore, createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    offset: 0,
    date: Date.now(),
    posts: [],
    total: 0,
  },
  reducers: {
    setPosts: (state, action) => {
      action.payload.rows.forEach((post) => state.posts.push(post));
      state.total = action.payload.count - 1;
      state.offset = 2;
      state.date = Date.now();
    },
    addPosts: (state, action) => {
      const newPosts = action.payload.rows;
      newPosts.forEach((post) => {
        state.posts.push(post);
      });
      state.offset += 2;
    },
    clearPosts: (state, action) => {
      state.posts = [];
    },
    addPost: (state, action) => {
      const newPost = action.payload;
      newPost.Comments = [];
      state.total++;
      state.posts.unshift(newPost);
    },
    deletePost: (state, action) => {
      if (state.posts) {
        state.total--;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      }
    },
    editPost: (state, action) => {
      state.posts.forEach((post) => {
        if (post.id === action.payload.id) {
          post.text = action.payload.text;
          post.imageUrl = action.payload.imageUrl;
        }
      });
    },
    likePost: (state, action) => {
      state.posts.forEach((post) => {
        if (post.id === action.payload.id) {
          console.log("likePost:", action.payload);
          post.likes = action.payload.likes;
          post.usersLiked = action.payload.usersLiked;
        }
      });
    },
  },
});

const postSlice = createSlice({
  name: "post",
  initialState: null,
  reducers: {
    setPost: (state, action) => {
      state = action.payload;
      return state;
    },
    addComment: (state, action) => {
      state.Comments.unshift({ id: action.payload });
    },
    deleteComment: (state, action) => {
      state.Comments = state.Comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    clearPost: (state, action) => {
      state = null;
      return state;
    },
    editPost: (state, action) => {
      if (state) {
        state.text = action.payload.text;
        state.imageUrl = action.payload.imageUrl;
      }
    },
    likePost: (state, action) => {
      if (state) {
        state.likes = action.payload.likes;
        state.usersLiked = action.payload.usersLiked;
      }
    },
  },
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    offset: 0,
    date: Date.now(),
    comments: [],
    total: 0,
  },
  reducers: {
    setComments: (state, action) => {
      action.payload.rows.forEach((comment) => state.comments.push(comment));
      state.offset = 2;
      state.date = Date.now();
      state.total = action.payload.count;
    },
    addComments: (state, action) => {
      action.payload.rows.forEach((comment) => state.comments.push(comment));
      state.offset += 2;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
      state.total++;
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      state.total--;
    },
    editComment: (state, action) => {
      state.comments.forEach((comment) => {
        if (comment.id === action.payload.id) {
          comment.text = action.payload.text;
        }
      });
    },
    clearComments: (state, action) => {
      state.comments = [];
      state.total = 0;
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    offset: 0,
    date: Date.now(),
    posts: [],
    total: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPosts: (state, action) => {
      action.payload.rows.forEach((post) => state.posts.push(post));
      state.offset = 2;
      state.date = Date.now();
      state.total = action.payload.count;
    },
    addPosts: (state, action) => {
      const newPosts = action.payload.rows;
      newPosts.forEach((post) => {
        state.posts.push(post);
      });
      state.offset += 2;
    },
    clearPosts: (state, action) => {
      state.posts = [];
    },
    addPost: (state, action) => {
      const newPost = action.payload;
      if (newPost.UserId === state.user.id) state.posts.unshift(newPost);
      state.total++;
    },
    deletePost: (state, action) => {
      if (state.posts) {
        state.total--;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      }
    },
    editPost: (state, action) => {
      if (state.posts) {
        state.posts.forEach((post) => {
          if (post.id === action.payload.id) {
            post.text = action.payload.text;
            post.imageUrl = action.payload.imageUrl;
          }
        });
      }
    },
    likePost: (state, action) => {
      if (state.posts) {
        state.posts.forEach((post) => {
          if (post.id === action.payload.id) {
            console.log("likePost:", action.payload);
            post.likes = action.payload.likes;
            post.usersLiked = action.payload.usersLiked;
          }
        });
      }
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state = action.payload;
      return state;
    },
    deleteUser: (state, action) => {
      localStorage.removeItem("user");
      state = null;
      return state;
    },
  },
});

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    post: postSlice.reducer,
    comments: commentsSlice.reducer,
    profile: profileSlice.reducer,
    user: userSlice.reducer,
  },
});
