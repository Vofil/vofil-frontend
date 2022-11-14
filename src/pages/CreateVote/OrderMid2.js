import React, {useState} from 'react';
import {Link, Route, Switch, useNavigate, useLocation} from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import EditPicturesPage from "../EditPicturesPage";
import "./modal.css";
import "./OrderMid2.css";


function EditPicModal({vote_id, pic_cnt, reNum}) {
    // 모달 가시화 상태 관리
    const [state, setState] = useState(true) // true: 모달 실행, false: 모달 종료

    // 편집 사진 받아오기
    const [croppedImage, setCroppedImage] = useState(undefined)

    // 모달 가시화 상태 관리 메서드
    const closeModal = (event) => {
        setState(!state)
    }

    console.log("모달에서 받은 투표 아이디: " + vote_id)

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
                    reNum={reNum}
                />
            </Modal>
        </div>
    );
}

function OrderMid2() {
    // ordermid에서 투표 아이디, 등록 사진 개수 넘겨 받기
    const location = useLocation()
    const voteID = location.state.id       // 투표 아이디
    const picCnt = location.state.pic_cnt  // 등록 사진 개수

    // EditPicturePage에 전해줄 reNum 상태 관리
    const [reNum, setReNum] = useState(0);

    // 버튼 비활성화 상태 관리
    const [disable1, setDisable1] = useState(false);
    const [disable2, setDisable2] = useState(false);
    const [disable3, setDisable3] = useState(false);
    const [disable4, setDisable4] = useState(false);

    // 모달 상태
    const [visible, setVisible] = useState(false);

    // 편집 사진 받아오기
    const [croppedImage, setCroppedImage] = useState(undefined)

    // 사진 추가 버튼들
    const onPlusPic1Handler = (event) => {
        setVisible(!visible)
        setReNum(1)
        console.log(visible)
    }

    const onPlusPic2Handler = (event) => {
        setVisible(!visible)
        setReNum(2)
        console.log(visible)
    }

    const onPlusPic3Handler = (event) => {
        setVisible(!visible)
        setReNum(3)
        console.log(visible)
    }

    const onPlusPic4Handler = (event) => {
        setVisible(!visible)
        setReNum(4)
        console.log(visible)
    }

    return(
        <div className="createvote">
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    8. 사진을 추가해주세요!
                </div>
                <div className="createvote__content">
                    <div className="add__photo1">
                        <button onClick={onPlusPic1Handler} className="createvote__b">
                            <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                        </button>
                        {visible === true ? <EditPicModal vote_id={voteID} reNum={reNum}/> : null}
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
