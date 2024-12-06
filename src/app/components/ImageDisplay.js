import { useEffect, useState } from "react";

const ImageDisplay = ({ imageName }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const token = localStorage.getItem("token");  // Assuming token is stored in localStorage
      const res = await fetch(`http://localhost:8080/images/${imageName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log("Image URL:", imageObjectURL);
        setImageUrl(imageObjectURL);
      } else {
        console.error("Error fetching image");
      }
    };

    fetchImage();
  }, [imageName]);

  return <img src={imageUrl} alt={imageName} width={200}/>;
};

export default ImageDisplay;
