import React, {useEffect, useState, useReducer, useContext} from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import demoImage from "../../assets/yaong.jpg";
import "../edit.css";

function ImageCropper(props) {
    const {imageToCrop, onImageCropped, onRatio} = props;

    const [w, wSet] = useState(0);
    const [h, hSet] = useState(0);

    const [r, rSet] = useState(1);

    const [cropConfig, setCropConfig] = useState(
        // default crop config
        {
            unit: '%',
            //unit: 'px',
            //x: 130,
            //y: 50,
            width: 30,
            //height: 30,
            aspect: 1 / 1,
        }
    );

    const [imageRef, setImageRef] = useState();

    const crop1 = () => {
        setCropConfig(
            {
                unit: '%',
                //unit: 'px',
                //x: 130,
                //y: 50,
                width: 30,
                //height: 30,
                aspect: 1 / 1,
            }
        )
        rSet(1)
    }

    const crop2 = () => {
        setCropConfig(
            {
                unit: '%',
                //unit: 'px',
                //x: 130,
                //y: 50,
                width: 30,
                //height: 30,
                aspect: 1 / 2,
            }
        )
        rSet(2)
    }

    const crop3 = () => {
        setCropConfig(
            {
                unit: '%',
                //unit: 'px',
                //x: 130,
                //y: 50,
                width: 30,
                //height: 30,
                aspect: 3 / 1,
            }
        )
        rSet(3)
    }

    useEffect(() => {
        var img = new Image()
        img.src = imageToCrop
        wSet(img.width)
        hSet(img.height)
        console.log(img.width)
        console.log(img.height)
    }, [])

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
            onRatio(r);
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

                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = function() {
                        console.log(reader.result);
                        document.querySelector('img').src = reader.result;
                        resolve(reader.result)
                    };



                    blob.name = fileName;
                    console.log(blob.name)
                    // creating a Object URL representing the Blob object given
                    const croppedImageUrl = window.URL.createObjectURL(blob);

                    //resolve(reader.result)
                    //resolve(blob);
                    //resolve(croppedImageUrl);
                    console.log(croppedImageUrl);
                }, 'image/png, image/jpeg, image/jpg'
            );
        });
    }

    return (
        <div className="edit_window">
            <div className="edit_window_crop">
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
            <div className="edit_detail">
                <div className="edit_title">?????? ??????</div>
                <button onClick={crop1} className="crop_button">????????????</button>
                <button onClick={crop2} className="crop_button">1 : 2</button>
                <button onClick={crop3} className="crop_button">3 : 1</button>

                <div className="text_Box">
                    <div className="text_title">[????????????]</div>
                    <div className="text_content">- ?????? ????????? ??????</div>
                    <div className="text_content">- ??????????????? ?????????</div>
                    <div className="text_title">[ 1 : 2 ]</div>
                    <div className="text_content">- ???????????? ?????? ??????</div>
                    <div className="text_title">[ 3 : 1 ]</div>
                    <div className="text_content">- ????????? ??????</div>
                </div>
            </div>
        </div>
    );
}

ImageCropper.defaultProps = {
    onImageCropped: () => {}
}

export default ImageCropper;


//className="edit-window-image"
//style={{width: w, height: h}}