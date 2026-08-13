const API_BASE = "http://localhost:5000/api";

export function getToken() {
  return sessionStorage.getItem("auth_token");
}

export function setToken(token) {
  sessionStorage.setItem("auth_token", token);
}

export function removeToken() {
  sessionStorage.removeItem("auth_token");
}

export async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers
    });
  } catch {
    throw new Error(
      "Cannot connect to the server. Please make sure the backend is running on port 5000."
    );
  }

  const data = await response.json().catch(() => ({
    message: "The server returned an invalid response."
  }));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}
