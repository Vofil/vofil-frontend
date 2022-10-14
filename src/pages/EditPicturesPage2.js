import React, {useState} from "react";
//import './App.css';
import ImageCropper from "../components/ImageCropper";

function EditPicturesPage2() {
    const [imageSrc, setImageSrc] = useState('');
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);

    const onUploadFile = (event) => {
        /*
        const reader = new FileReader();

        reader.addEventListener('load', () =>
            setImageToCrop(reader.result)
        );

        reader.readAsDataURL(event.target.files[0]);

        return new Promise((resolve) => {       
            reader.onload = () => {       
              setImageSrc(reader.result);
              resolve();
            };
        });
        */
        
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
                //accept="image/*"
                onChange={onUploadFile}
            />
            <div>
                {imageToCrop && <img src={imageToCrop} alt= "preview" />}
            </div>
            <div>
                <ImageCropper
                    imageToCrop={imageToCrop}
                    onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                />
            </div>
            <h2>Cropped Image</h2>
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