const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function submitInquiry(payload) {
  const response = await fetch(`${API_BASE}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to submit your inquiry. Please try again.");
  return data;
}

export async function getInquiries() {
  const response = await fetch(`${API_BASE}/inquiries`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to load inquiries.");
  return data.inquiries || [];
}

export async function updateInquiry(id, payload) {
  const response = await fetch(`${API_BASE}/inquiries/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to update inquiry.");
  return data.inquiry;
}
