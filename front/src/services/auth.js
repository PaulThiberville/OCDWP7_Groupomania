const baseUrl = `http://localhost:4000`;

exports.handleRefresh = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (parseInt(user.expiresAt) <= Date.now()) {
      await refresh();
    }
  }
};

const refresh = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const rawResponse = await fetch(`${baseUrl}/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: user.refreshToken }),
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      if (user.accessToken && user.expiresAt) {
        user.accessToken = response.accessToken;
        user.expiresAt = response.expiresAt;
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (email, password) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.registerUser = async (firstName, lastName, email, password) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const rawResponse = await fetch(`${baseUrl}/logout`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: user.refreshToken }),
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
    }
  } catch (error) {
    console.log(error);
  }
};
