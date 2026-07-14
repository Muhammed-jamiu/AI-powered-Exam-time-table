import api from "./api";

export async function signup(userData) {
  const { data } = await api.post("/auth/signup", userData);
  return data;
}

export async function login(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function getCurrentUser(token) {
  const { data } = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
