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
    // 사진 비율
    const [ratio, setRatio] = useState("");

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
                {blurState == false && cropState == false && zoomState == false && <div className="load_image"><img alt="image" src={imageToCrop} className="my-image"/></div>}
                {blurState == true &&
                    <ImageBlur
                        imageToCrop={croppedImage}
                        onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                        ratioFrame={ratio}
                    />
                }
                {cropState == true &&
                    <ImageCropper
                        imageToCrop={imageToCrop}
                        onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                        onRatio={(ratio) => setRatio(ratio)}
                    />
                }
                {zoomState == true &&
                    <ImageZoom
                        imageToZoom={croppedImage}
                        onImageZoomed={(croppedImage) => setCroppedImage(croppedImage)}
                        ratioFrame={ratio}
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
                    <button onClick={onCropMode} className="right__edit__button">1. 자르기</button>
                    <button onClick={onBlurMode} className="right__edit__button">2. 블러</button>
                    <button onClick={onZoomMode} className="right__edit__button">3. 크기조절</button>
                </div>
                <div className="right__edit__submit__container">
                    <button onClick={onSubmitHandler} className="right__edit__submit_button">편집 완료</button>
                </div>
            </div>
        </div>
    );

}

export default EditPicturesPage;