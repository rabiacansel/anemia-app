const CLOUD_NAME = "dkgy9fdhk";
const UPLOAD_PRESET = "anemia_upload";

export const uploadToCloudinary = async (uri) => {
  const formData = new FormData();

  formData.append("file", {
    uri,
    type: "image/jpeg",
    name: "image.jpg",
  });

  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};