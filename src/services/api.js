// services/api.js
const BASE_URL = "https://fakestoreapi.com";

const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchProducts = async (limit = null, sort = null) => {
  let url = `${BASE_URL}/products`;
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit);
  if (sort) params.append("sort", sort);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return await fetchWithErrorHandling(url);
};

export const fetchProductById = async (id) => {
  const url = `${BASE_URL}/products/${id}`;
  return await fetchWithErrorHandling(url);
};

