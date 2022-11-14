import React, {useState} from "react";
import axios from 'axios';
//import './App.css';
import ImageCropper from "../components/ImageCropper/index";

function EditPicturesPage({onImageCroppedToModal, voteID, reNum}) {
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);
    const [res1, setRes1] = useState(undefined);
    const [res2, setRes2] = useState(undefined);
    const [res3, setRes3] = useState(undefined);
    const [res4, setRes4] = useState(undefined);

    //받아온 사진
    const [reImage, setReImage] = useState(undefined);

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
        onImageCroppedToModal(croppedImage)

        axios
        .get("/api/pictures/checked", { params:
            {
                file: croppedImage,
                id: voteID,
                cnt: reNum
            }
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
    }

    const onPicPicHandler = (event) => {
        console.log("실행되었습ㄴ디ㅏ")

        axios
        .get("/api/pictures/show", { params:
            {
                id: voteID,
                cnt: reNum
            }
        })
        .then((response) => {
            console.log('well done!')
            setReImage(response.data)
            console.log(response.data)
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
            {
                reImage &&
                <div>
                    <h2>DB에서 받은 사진</h2>
                    <img
                        alt="dbPicture"
                        src={reImage}
                    />
                </div>
            }
            <button onClick={onSubmitHandler}>편집한 사진 제출</button>
            <button onClick={onPicPicHandler}>사진 받아올게여</button>
        </div>
    );
}

export default EditPicturesPage;