// ====================== PRODUCTION ======================
// export const endpoint = 'http://ec2-13-48-148-107.eu-north-1.compute.amazonaws.com:5555/api';

// ====================== DEVELOPMENT ======================
export const endpoint = "https://andreeasteriu.github.io/data.json";

const auth = {
  isAuthenticated: undefined,
  userId: undefined,
  user: undefined,

  showModal: undefined,
  redirectTo: undefined,
};

export const getPosts = async () => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(endpoint + "/", options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const deletePost = async () => {
  try {
    const options = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(endpoint, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export default auth;
