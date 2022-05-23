const baseUrl = "http://localhost:5000/api";
const { handleRefresh } = require("./auth");

const limits = 2;

exports.getAllPosts = async (_offset, date) => {
  try {
    await handleRefresh();
    const limit = limits;
    const offset = _offset;
    const user = JSON.parse(localStorage.getItem("user"));
    const rawResponse = await fetch(`${baseUrl}/posts/all`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({ offset, limit, date }),
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUserPosts = async (userId, _offset, date) => {
  try {
    await handleRefresh();
    const limit = limits;
    const offset = _offset;
    const user = JSON.parse(localStorage.getItem("user"));
    const rawResponse = await fetch(`${baseUrl}/posts/all/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({ offset, limit, date }),
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getOnePost = async (postId) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const rawResponse = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (text, file) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }
    formData.append("text", text);
    formData.append("userId", user.userId);

    const rawResponse = await fetch(`${baseUrl}/posts/create`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
      body: formData,
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (text, file, postId) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }
    formData.append("text", text);
    formData.append("userId", user.userId);

    const rawResponse = await fetch(`${baseUrl}/posts/update/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
      body: formData,
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.likePost = async (userId, like) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const rawResponse = await fetch(`${baseUrl}/posts/like/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({ like: like }),
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (postId) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const rawResponse = await fetch(`${baseUrl}/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
