import crypto from "crypto";

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, timestamp: number) => {
  return `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_API_SECRET_CLOUDINARY}`;
};

export const deleteImage = async (url: string) => {
  let sufix: any = url.match(/workout\/(.+?)(\.[^.]+)$/i);
  sufix = !!sufix && sufix[1];
  const publicId = "workout/" + sufix;
  const timestamp = new Date().getTime();
  const signature = generateSHA1(generateSignature(publicId, timestamp));
  const requestUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/destroy`;

  const apiKey = process.env.NEXT_PUBLIC_API_KEY_CLOUDINARY as string;

  const formData = new FormData();

  formData.append("public_id", publicId);
  formData.append("signature", signature);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());

  try {
    await fetch(requestUrl, {
      method: "POST",
      body: formData,
    });

    return "Image deleted!";
  } catch (error) {
    return { error };
  }
};
