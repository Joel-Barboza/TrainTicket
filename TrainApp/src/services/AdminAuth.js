export async function AdminAuth(username, password) {
  try {
    const response = await fetch(
      `http://localhost:5134/api/adminlogin?user=${encodeURIComponent(username)}&pswrd=${encodeURIComponent(password)}`
    );
    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reaching server to authenticate:", error);
    throw error;
  }
}

export async function AddUser(username, password) {
  try {
    const response = await fetch(
      `http://localhost:5134/api/login/new?user=${encodeURIComponent(username)}&pswrd=${encodeURIComponent(password)}`
    );
    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reaching server to authenticate:", error);
    throw error;
  }
}

export async function UserAuth(username, password) {
  try {
    const response = await fetch(
      `http://localhost:5134/api/login/existing?user=${encodeURIComponent(username)}&pswrd=${encodeURIComponent(password)}`
    );
    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reaching server to authenticate:", error);
    throw error;
  }
}