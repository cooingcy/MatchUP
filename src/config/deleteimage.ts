import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { publicId } = await req.json();

    const result = await cloudinary.uploader.destroy(publicId);
    return Response.json({ success: true, result });
  } catch (e) {
    console.log("Erro:", e);
    return Response.json({ success: false });
  }
}
