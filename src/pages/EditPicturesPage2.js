import React, {useState} from "react";
//import './App.css';
import ImageCropper from "../components/ImageCropper/index";

function EditPicturesPage2() {
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);

    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener('load', () =>
                setImageToCrop(reader.result)
            );

            reader.readAsDataURL(event.target.files[0]);
        }
        
    };

    return (
        <div>
            <h2>사진편집기</h2>
            <input
                type="file"
                accept="image/*"
                onChange={onUploadFile}
            />
            <div>
                <h2>로드된 사진</h2>
                {imageToCrop && <img src={imageToCrop} alt= "preview" />}
            </div>
            <div>
                <h2>사진 크롭구간</h2>
                <ImageCropper
                    imageToCrop={imageToCrop}
                    onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                />
            </div>
            <h2>크롭 결과물</h2>
            {
                croppedImage &&
                <div>
                    <h2>Cropped Image</h2>
                    <img
                        alt="Cropped"
                        src={croppedImage}
                    />
                </div>
            }
        </div>
    );
}

export default EditPicturesPage2;