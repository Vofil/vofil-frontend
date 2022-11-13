import React, {useState} from 'react';
import {Link, Route, Switch, useNavigate, useLocation} from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import EditPicturesPage from "../EditPicturesPage";
import "./modal.css";
import "./OrderMid2.css";


function EditPicModal({vote_id, pic_cnt}) {
    // 모달 가시화 상태 관리
    const [state, setState] = useState(true) // true: 모달 실행, false: 모달 종료

    // 편집 사진 받아오기
    const [croppedImage, setCroppedImage] = useState(undefined)

    // 모달 가시화 상태 관리 메서드
    const closeModal = (event) => {
        console.log(state)
        console.log("모달에서 출력합니다 bloblbobb: " + croppedImage)
        setState(!state)
    }

    console.log("모달에서 받은 투표 아이디: " + vote_id)
    //console.log("모달에서 출력합니다 bloblbobb: " + croppedImage)
    return (
        <div>
            <Modal
                visible={state}
                width="90%"
                height="90%"
                effect="fadeInDown"
                onClickAway={closeModal}
            >
                <div>
                    테스트
                    <button onClick={closeModal}>close</button>
                </div>
                <EditPicturesPage
                    onImageCroppedToModal={(croppedImage) => setCroppedImage(croppedImage)}
                    voteID={vote_id}
                />
            </Modal>
        </div>
    );
}

function OrderMid2() {
    // ordermid에서 투표 아이디 넘겨 받기
    const location = useLocation()
    const voteID = location.state.id
    const picCnt = location.state.pic_cnt

    // 버튼 비활성화 상태 관리
    const [disable1, setDisable1] = useState(false);
    const [disable2, setDisable2] = useState(false);
    const [disable3, setDisable3] = useState(false);
    const [disable4, setDisable4] = useState(false);

    // 모달 상태
    const [visible, setVisible] = useState(false);

    // 편집 사진 받아오기
    const [croppedImage, setCroppedImage] = useState(undefined)

    // pic_cnt에 따라 투표 생성 버튼 활성화 시키기
    /*
    if (picCnt >= 4) {
        setDisable1(true);
        setDisable2(true);
        setDisable3(true);
        setDisable4(true);
    }
    else if (picCnt >= 3) {
        setDisable1(true);
        setDisable2(true);
        setDisable3(true);
    }
    else if (picCnt >= 2) {
        setDisable1(true);
        setDisable2(true);
    }
    else {
        setDisable1(true);
        setDisable2(true);
        setDisable3(true);
        setDisable4(true);
    }
    */

    //테스트 버튼 이올시다 - 조만간 지울예정
    const onTest = (event) => {
        console.log("버튼이 눌렸습니다")
        axios
        .post("/api/pictures", {
            id: voteID,
            re1: null,
            re2: null,
            re3: null,
            re4: null,
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
    }

    // 사진 추가 버튼들
    const onPlusPic1Handler = (event) => {
        setVisible(!visible)
        console.log(visible)
    }

    const onPlusPic2Handler = (event) => {
        setVisible(!visible)
        console.log(visible)
    }

    const onPlusPic3Handler = (event) => {
        setVisible(!visible)
        console.log(visible)
    }

    const onPlusPic4Handler = (event) => {
        setVisible(!visible)
        console.log(visible)
    }

    return(
        <div className="createvote">
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    8. 사진을 추가해주세요!
                </div>
                <div className="createvote__content">
                    <button onClick={onTest}>테스트 버튼</button>
                </div>
                <div className="createvote__content">
                    <div className="add__photo1">
                        <button onClick={onPlusPic1Handler} className="createvote__b">
                            <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                        </button>
                        {visible === true ? <EditPicModal vote_id={voteID}/> : null}
                    </div>
                    <div className="add__photo2">
                        <button className="createvote__b">
                            <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                        </button>

                    </div>
                    <div className="add__photo3">
                        <button className="createvote__b">
                            <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                        </button>

                    </div>
                    <div className="add__photo4">
                        <button className="createvote__b">
                            <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default OrderMid2;


/*
<button onClick={onModalClick} className="createvote__button">사진 추가</button>
                        {modal_v === true ? <EditModal v={modal_v} vote_id={vote_id} pic_cnt={pic_cnt} /> : null}
*/