// ====================== PRODUCTION ======================
// export const endpoint =
//   "http://ec2-13-48-148-107.eu-north-1.compute.amazonaws.com/api";

// ====================== DEVELOPMENT ======================
export const endpoint = "http://localhost:8080/api/posts";

// ====================== GET ALL POSTS ======================
export const getFeedPosts = async () => {
  try {
    const options = {
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

// ====================== CREATE A POST ======================
export const createPost = async (postData) => {
  try {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
      body: postData,
    };
    const response = await fetch(endpoint, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

// ====================== DELETE A POST ======================
export const removePost = async (id) => {
  try {
    const options = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(endpoint + "/" + id, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
