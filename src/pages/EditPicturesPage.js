import React, {useState} from "react";
import axios from 'axios';
//import './App.css';
import ImageCropper from "../components/ImageCropper/index";

function EditPicturesPage({vote_id, pic_cnt}) {
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);
    const [res1, setRes1] = useState(undefined);
    const [res2, setRes2] = useState(undefined);
    const [res3, setRes3] = useState(undefined);
    const [res4, setRes4] = useState(undefined);


    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener('load', () =>
                setImageToCrop(reader.result)
            );

            reader.readAsDataURL(event.target.files[0]);
        }
        
    };

    const onSubmitHandler = (event) => {
        setRes1(croppedImage)
        console.log("편집 페이지" + croppedImage)

        const formData = new FormData()
        formData.append('multipartFiles', res1)

        console.log("멀티파일" + formData)

        axios
        .post("/api/pictures", {params:
           {
               file: formData,
               id: vote_id,
               cnt: 1
           }},
           {withCredentials: true}
        )
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
    }

    return (
        <div>
            <h2>사진편집기</h2>
            <input
                type="file"
                accept="image/*"
                onChange={onUploadFile}
            />
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
            <button onClick={onSubmitHandler}>편집한 사진 제출</button>
        </div>
    );
}

export default EditPicturesPage;