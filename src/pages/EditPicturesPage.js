import React, {useState} from "react";
import axios from 'axios';
//import './App.css';
import ImageCropper from "../components/ImageCropper/index";

function EditPicturesPage({onImageCroppedToModal, voteID}) {
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

        console.log("모달엣 준 투푶 아이디~: " + voteID)

        var fileName = String(croppedImage)
        console.log("문자열로 변경했습니다" + fileName)

        setRes1(croppedImage)
        console.log("편집 페이지" + croppedImage)
        console.log("res1: " + res1)

        const formData = new FormData()
        formData.append("file", croppedImage)

        // 보내줄 json 데이터
        const value = [{
            id: voteID,
            cnt: 1
        }]
//        formData.append(
//            "file",
//            new Blob([JSON.stringify(value)], {type: "application/json"})
//        )

        console.log("멀티파일" + formData)

        axios
        .get("/api/pictures/checked", { params:
            {
                file: croppedImage,
                id: voteID,
                cnt: 2
            }
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
        /*
        axios
        .get("/api/pictures/checked", null, { params:
            {
                file: "얄루",
                id: voteID,
                cnt: 1
            },
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
        */
        /*
        axios
        .post(`/api/pictures/clock`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
        */
        /*
        axios({
            method: "POST",
            url: `/api/pictures/clock`,
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
        */
    }

    const onPicPicHandler = (event) => {
        console.log("실행되었습ㄴ디ㅏ")

        axios
        .get("/api/pictures/show", { params:
            {
                id: 137,
                cnt: 2
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