"use server"
import { client } from "../../sanity/lib/client";

export const SaveWish = async (formData) => {
  try {
    if (!formData) {
      return {
        success: false,
        message: "No data provided"
      };
    }

    const username = formData.get('username');
    const message = formData.get('message');
    const image = formData.get('image');

    if (!username?.trim() || !message?.trim()) {
      return {
        success: false,
        message: "Username and message are required"
      };
    }

    let uploadedImage;
    
    // Handle image upload if present
    if (image && image.size > 0) {
      const imageAsset = await client.assets.upload('image', image, {
        filename: `wish-${Date.now()}-${image.name}`,
        contentType: image.type
      });

      uploadedImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      };
    }

    // Create the wish message
    const newWish = {
      _type: "wish_message",
      username: username.trim(),
      message: message.trim(),
      ...(uploadedImage && { image: uploadedImage })
    };

    // Save to Sanity
    const savedWish = await client.create(newWish);

    if (!savedWish?._id) {
      throw new Error("Failed to save wish message");
    }

    return {
      success: true,
      message: "Your wish has been sent successfully!",
      data: savedWish
    };

  } catch (error) {
    console.error("Error in SaveWish:", error);
    return {
      success: false,
      message: error.message || "An error occurred while saving your wish"
    };
  }
};