import React, {useState, useReducer, useContext} from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import demoImage from "../../assets/yaong.jpg";

function ImageCropper(props) {
    const {imageToCrop, onImageCropped} = props;

    const [cropConfig, setCropConfig] = useState(
        // default crop config
        {
            unit: '%',
            //unit: 'px',
            //x: 130,
            //y: 50,
            width: 30,
            //height: 30,
            aspect: 16 / 9,
        }
    );

    const [imageRef, setImageRef] = useState();

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(
                imageRef,
                crop,
                'croppedImage.jpg' // destination filename
            );

            // calling the props function to expose
            // croppedImage to the parent component
            onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
        // creating the cropped image from the source image
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    // returning an error
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }

                    blob.name = fileName;
                    // creating a Object URL representing the Blob object given
                    const croppedImageUrl = window.URL.createObjectURL(blob);

                    //이미지 주소 받기 위해 추가
                    //dispatch(croppedImageUrl);

                    resolve(croppedImageUrl);
                    console.log(croppedImageUrl);
                }, 'image/jpg'
            );
        });
    }

    return (
        <div>
            <ReactCrop
                src={imageToCrop}
                crop={cropConfig}
                ruleOfThirds
                onImageLoaded={(imageRef) => setImageRef(imageRef)}
                onComplete={(cropConfig) => cropImage(cropConfig)}
                onChange={(cropConfig) => setCropConfig(cropConfig)}
                crossorigin="anonymous" // to avoid CORS-related problems
            />
        </div>
    );
}

ImageCropper.defaultProps = {
    onImageCropped: () => {}
}

export default ImageCropper;