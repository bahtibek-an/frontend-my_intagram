import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "Your file size must be less than 2MB", "error");
        setSelectedFile('');
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectedFile(null);
    }
  };
  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImage;
