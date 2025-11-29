export async function uploadToCloudinary(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "MatchUPP");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/matchupp/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  return json.secure_url;
}

export async function deleteFromCloudinary(url) {
  try {
    // pega o public_id a partir da URL
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const publicId = filename.split(".")[0];

    const res = await fetch("/api/deleteImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });

    return await res.json();
  } catch (e) {
    console.log("Erro ao deletar Cloudinary:", e);
  }
}

