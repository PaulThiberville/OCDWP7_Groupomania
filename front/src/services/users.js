const baseUrl = "http://localhost:5000/api";
const { handleRefresh } = require("./auth");

exports.getOneUser = async (userId) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const rawResponse = await fetch(`${baseUrl}/users/${userId}`, {
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

exports.editUser = async (userId, firstName, lastName, bio, file) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);

    const rawResponse = await fetch(`${baseUrl}/users/update/${userId}`, {
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

exports.deleteUser = async (userId) => {
  try {
    await handleRefresh();
    const user = JSON.parse(localStorage.getItem("user"));
    const rawResponse = await fetch(`${baseUrl}/users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
