import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { button } from "../../common/components/Button";

const ImageUploadContainer = styled.div`
   display: block;
`;

const ImageUploadWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
`;
const ImageUploadPreview = styled.div`
   width: 100%;
   height: 100%;
   max-width: 320px;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   margin: 30px 0;
   position: relative;
   > img,
   p {
      border: 1px solid #ccc;
      padding: 4px;
      width: 50%;
      aspect-ratio: 1;
   }
   > img {
      object-fit: cover;
   }
   > p {
      display: flex;
      justify-content: center;
      align-items: center;
   }
`;

const PickAvatarButton = styled.button`
   ${button}
   margin-bottom: 15px;
`;

const ImageUpload = ({ id, onInput, buttonText }) => {
   const [file, setFile] = useState();
   const [previewUrl, setPreviewUrl] = useState();
   const [isValid, setIsValid] = useState(false);

   const filePickerRef = useRef();

   const pickAvatarHandler = () => {
      filePickerRef.current.click();
   };

   const pickedAvatarHandler = (e) => {
      let pickedFile;
      let fileIsValid = isValid;
      if (e.target.files.length === 1) {
         pickedFile = e.target.files[0];
         setFile(pickedFile);
         setIsValid(true);
         fileIsValid = true;
      } else {
         setIsValid(false);
         fileIsValid = false;
      }
      onInput(id, pickedFile, fileIsValid);
   };

   useEffect(() => {
      if (!file) {
         return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
         setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
   }, [file]);

   return (
      <ImageUploadContainer>
         <input
            type="file"
            style={{ display: "none" }}
            id=""
            accept=".jpg,.png,.jpeg"
            ref={filePickerRef}
            onChange={pickedAvatarHandler}
         />
         <ImageUploadWrapper>
            <ImageUploadPreview>
               {previewUrl && <img src={previewUrl} alt="Preview" />}
               {!previewUrl && <p>Please pick an image.</p>}
            </ImageUploadPreview>
            <PickAvatarButton type="button" onClick={pickAvatarHandler}>
               {buttonText ? buttonText : "Pick image"}
            </PickAvatarButton>
         </ImageUploadWrapper>
      </ImageUploadContainer>
   );
};

export default ImageUpload;
