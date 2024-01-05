import { useState, useRef } from "react";
import uploadImg from '../../public/upload.png';

const ButtonHandler = ({ imageRef}) => {
  const [image, setImage] = useState(null); 
  const inputImageRef = useRef(null); 

  const onDrop = (e) =>{
    e.preventDefault();
    const file = e.dataTransfer.files[0]; 
    if (file) {
      const url = URL.createObjectURL(file); 
      imageRef.current.src = url; 
      imageRef.current.style.display = "block"; 
      setImage("image");
    }
  };
  const onDragOver = (e) =>{
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";

  };
  const onDragLeave = (e) =>{
    e.preventDefault();
  };

  const closeImage = () => {
    const url = imageRef.current.src;
    imageRef.current.src = "#"; // restore image source
    URL.revokeObjectURL(url); // revoke url

    setImage(null); // set image to null
    inputImageRef.current.value = ""; // reset input image
    imageRef.current.style.display = "none"; // hide image
  };

  return (
    /* Image Handler */
        <div className="box">
          <div className="dropzone" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <img src={uploadImg} alt="uploadImg" className="uploadImg"/>
            <h4>KÉO THẢ ẢNH VÀO ĐÂY</h4>
            <h4>hoặc</h4>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const url = URL.createObjectURL(e.target.files[0]); // create blob url
                imageRef.current.src = url; // set video source
                imageRef.current.style.display = "block"; // show video
                setImage("image");
              }}
              ref={inputImageRef}
            />
            <button
              onClick={() => {
                // if not image
                if (image === null) inputImageRef.current.click();
                // closing image image
                else if (image === "image") closeImage();
              }}
            >
              {image === "image" ? "Đóng" : "Tải"} ảnh 
            </button>
          </div>
        </div>
  );  
};

export default ButtonHandler;
