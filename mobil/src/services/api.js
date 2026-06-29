const API_URL = "http://192.168.1.106:8000/analyze";

export const analyzeImages = async (images) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ images }),
  });

  return await res.json();
};