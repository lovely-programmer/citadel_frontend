import axios from "axios";

// const API_URL = "https://citadel-backend.onrender.com/api/upload/";

// const API_URL = "http://localhost:5000/api/upload/";

// * Upload Image
export const upload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(API_URL, formData);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// * Convert to base64
export const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};
