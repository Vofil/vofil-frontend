import React, {useState} from "react";
import axios from 'axios';
import ImageCropper from "../components/ImageCropper/index";
import ImageZoom from "../components/ImageZoom/index2";
import ImageBlur from "../components/ImageBlur/index3";
import "./EditPictures.css"

function EditPicturesPage({onImageCroppedToModal, onModalClose, passImageTrigger, voteID, reNum}) {
    // 로드한 크롭할 이미지 => 차후 편집할 이미지로 변경합니다.
    const [imageToCrop, setImageToCrop] = useState(null);
    // 크롭 된 이미지 => 차후 편집된 이미지로 변경합시다
    const [croppedImage, setCroppedImage] = useState(null);
    // 불러온 사진 이름
    const [imgName, setImageName] = useState("");

    // 편집 모드 버튼 상태 관리
    const [blurState, setBlurState] = useState(false)
    const [cropState, setCropState] = useState(false)
    const [zoomState, setZoomState] = useState(false)

    //받아온 사진
    const [reImage, setReImage] = useState(undefined);

    // 파일 로드 버튼
    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageName(event.target.files[0].name)

            const reader = new FileReader();

            reader.addEventListener('load', () =>
                setImageToCrop(reader.result)
            );

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    /*---------------------
      사진 편집 모드 변경 버튼
    ---------------------*/
    // 블러
    const onBlurMode = () => {
        console.log("블러 모드 입니다")
        setBlurState(true)
        setCropState(false)
        setZoomState(false)
    }

    // 자르기
    const onCropMode = () => {
        console.log("자르기 모드 입니다")
        setBlurState(false)
        setCropState(true)
        setZoomState(false)
    }

    // 크기 조절
    const onZoomMode = () => {
        console.log("크기 조절 모드입니다")
        setBlurState(false)
        setCropState(false)
        setZoomState(true)
    }

    /*-----------
       기타 버튼
    ------------*/
    // 편집 완료 버튼
    const onSubmitHandler = () => {

        console.log("제출 버튼이 눌렸습니다")

        onImageCroppedToModal(croppedImage)
        passImageTrigger(croppedImage)

        const byteString = atob(croppedImage.split(",")[1]);

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], {
            type: "image/jpeg"
        });
        const file = new File([blob], imgName);

        let formData = new FormData();

        formData.append("file", file)
        formData.append("id", voteID)
        formData.append("cnt", reNum)

        for (var pair of formData.entries()) {
            console.log(pair[0] + " : " + pair[1])
        }

        axios({
            method: 'post',
            url: "/api/pictures/checking",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            alert("파일을 저장하는데 실패했습니다");
            console.log('An error occurred:', error.response);
        });

        onModalClose(false)
        setImageToCrop(null)
        setCroppedImage(null)
        setImageName("")
        setZoomState(false)
        setCropState(false)
        setBlurState(false)
    }


    // DB에 저장된 사진 불러오기 입니다.
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
        <div className="edit">
            <div className="left__edit">
                {blurState == false && cropState == false && zoomState == false && <img alt="image" src={imageToCrop}/>}
                {blurState == true &&
                    <ImageBlur
                        imageToCrop={imageToCrop}
                        onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                    />
                }
                {cropState == true &&
                    <ImageCropper
                        imageToCrop={imageToCrop}
                        onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                    />
                }
                {zoomState == true &&
                    <ImageZoom
                        imageToZoom={imageToCrop}
                        onImageZoomed={(croppedImage) => setCroppedImage(croppedImage)}
                    />
                }
            </div>
            <div className="right__edit">
                <div className="right__edit__loadpicture">
                    <div className="right__edit__title">
                        파일을 로드해주세요
                    </div>
                    <form>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(event) => onUploadFile(event)}
                        />
                    </form>
                </div>
                <div className="right__edit__button__container">
                    <div className="right__edit__title">
                        편집 모드
                    </div>
                    <button onClick={onBlurMode} className="right__edit__button">블러</button>
                    <button onClick={onCropMode} className="right__edit__button">자르기</button>
                    <button onClick={onZoomMode} className="right__edit__button">크기조절</button>
                </div>
                <div className="right__edit__submit__container">
                    <button onClick={onSubmitHandler} className="right__edit__submit_button">편집 완료</button>
                </div>
            </div>
        </div>
    );


//    return (
//        <div className="edit">
//            <div className="left__edit">
//                {blurState == true && <div>블러창을 열게요</div>}
//                {cropState == true &&
//                    <ImageCropper
//                        imageToCrop={imageToCrop}
//                        onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
//                    />
//                }
//                {zoomState == true && <div>줌창 열게요</div>}
//            </div>
//            <div className="right__edit">
//                <div className="right__edit__loadpicture">
//                    <div className="right__edit__title">
//                        파일을 로드해주세요
//                    </div>
//                    <input
//                        type="file"
//                        accept="image/*"
//                        onChange={onUploadFile}
//                    />
//                </div>
//                <div className="right__edit__button__container">
//                    <div className="right__edit__title">
//                        편집 모드
//                    </div>
//                    <button onClick={onBlurMode} className="right__edit__button">블러</button>
//                    <button onClick={onCropMode} className="right__edit__button">자르기</button>
//                    <button onClick={onZoomMode} className="right__edit__button">크기조절</button>
//                </div>
//                <div className="right__edit__submit__container">
//                    <button onClick={onSubmitHandler} className="right__edit__submit_button">편집 완료</button>
//                </div>
//            </div>
//        </div>
//    );


    /*
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
    */
}

export default EditPicturesPage;