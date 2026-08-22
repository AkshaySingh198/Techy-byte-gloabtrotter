const API_BASE_URL = '/api/v1';

function getAuthHeader() {
  const token = localStorage.getItem('globetrotter_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function registerUser(userData) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  if (data.data?.accessToken) {
    localStorage.setItem('globetrotter_token', data.data.accessToken);
  }
  return data.data;
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  if (data.data?.accessToken) {
    localStorage.setItem('globetrotter_token', data.data.accessToken);
  }
  return data.data;
}

export async function getMe() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { ...getAuthHeader() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Unauthorized');
  return data.data;
}

export async function fetchCities() {
  const res = await fetch(`${API_BASE_URL}/cities`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch cities');
  return data.data;
}

export async function createTrip(tripData) {
  const res = await fetch(`${API_BASE_URL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(tripData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create trip');
  return data.data;
}

export async function fetchUserTrips() {
  const res = await fetch(`${API_BASE_URL}/trips`, {
    headers: { ...getAuthHeader() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch trips');
  return data.data;
}

export async function getTrips() {
  return fetchUserTrips();
}

export async function getRouteSuggestions(startCity, endCity, budgetTier = 'mid') {
  const res = await fetch(`${API_BASE_URL}/suggestions/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start_city: startCity, end_city: endCity, budget_tier: budgetTier })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch suggestions');
  return data.data;
}

export async function fetchBlogs() {
  const res = await fetch(`${API_BASE_URL}/blogs`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch blogs');
  return data.data;
}

export function logout() {
  localStorage.removeItem('globetrotter_token');
}
