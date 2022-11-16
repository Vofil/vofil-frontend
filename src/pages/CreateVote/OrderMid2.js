import React, {useState, useEffect} from 'react';
import {Link, Route, Switch, useNavigate, useLocation} from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import EditPicturesPage from "../EditPicturesPage";
import "./modal.css";
import "./OrderMid2.css";


function EditPicModal({vote_id, pic_cnt, reNum, onImageCroppedToOrderMid2}) {
    // 모달 가시화 상태 관리
    const [state, setState] = useState(true) // true: 모달 실행, false: 모달 종료

    // 편집 사진 받아오기
    const [croppedImage, setCroppedImage] = useState(undefined)

    // 모달 가시화 상태 관리 메서드
    const closeModal = (event) => {
        setState(!state)
        onImageCroppedToOrderMid2(croppedImage)
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

    // 모달 상태 버튼 별로
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);

    // 편집 사진 받아오기 버튼 별로
    const [croppedImage1, setCroppedImage1] = useState("")
    const [croppedImage2, setCroppedImage2] = useState("")
    const [croppedImage3, setCroppedImage3] = useState("")
    const [croppedImage4, setCroppedImage4] = useState("")

    //페이지 이동 함수
    const navigate = useNavigate();

    // picCnt에 따른 버튼 비활성화
    const fetchButtonDisabled = async () => {
        if(picCnt == 4) {
            setDisable1(false)
            setDisable2(false)
            setDisable3(false)
            setDisable4(false)
        }
        else if(picCnt == 3) {
            setDisable1(false)
            setDisable2(false)
            setDisable3(false)
            setDisable4(true)
        }
        else if(picCnt == 2) {
            setDisable1(false)
            setDisable2(false)
            setDisable3(true)
            setDisable4(true)
        }
        else {
            setDisable1(true)
            setDisable2(true)
            setDisable3(true)
            setDisable4(true)
        }
    }

    useEffect(() => {
        fetchButtonDisabled();
    }, []);

    // 사진 추가 버튼들
    const onPlusPic1Handler = (event) => {
        setVisible1(!visible1)
        setReNum(1)
    }

    const onPlusPic2Handler = (event) => {
        setVisible2(!visible2)
        setReNum(2)
    }

    const onPlusPic3Handler = (event) => {
        setVisible3(!visible3)
        setReNum(3)
    }

    const onPlusPic4Handler = (event) => {
        setVisible4(!visible4)
        setReNum(4)
    }

    // 생성 완료 버튼
    const onSubmitHandler = (event) => {
        navigate("/create_vote/orderEnd", /*{
            state: {
                id: vote_id,
                pic_cnt: pic_cnt
            }
        }*/);
    }

    return(
        <div className="createvote">
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    8. 사진을 추가해주세요!
                </div>
                <div className="createvote__content">
                    <div className="add__photo1">
                        { croppedImage1 == "" ?
                            <button onClick={onPlusPic1Handler} disabled={disable1} className="createvote__b">
                                <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                            </button>
                            : <img alt="croppedImg" src={croppedImage1} />
                        }
                        {visible1 === true ?
                            <EditPicModal
                                vote_id={voteID}
                                reNum={reNum}
                                onImageCroppedToOrderMid2={(croppedImage1) => setCroppedImage1(croppedImage1)}
                            /> : null
                        }
                    </div>
                    <div className="add__photo2">
                        { croppedImage2 == "" ?
                            <button onClick={onPlusPic2Handler} disabled={disable1} className="createvote__b">
                                <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                            </button>
                            : <img alt="croppedImg" src={croppedImage2} />
                        }
                        {visible2 === true ?
                            <EditPicModal
                                vote_id={voteID}
                                reNum={reNum}
                                onImageCroppedToOrderMid2={(croppedImage2) => setCroppedImage2(croppedImage2)}
                            /> : null
                        }
                    </div>
                    <div className="add__photo3">
                        { croppedImage3 == "" ?
                            <button onClick={onPlusPic3Handler} disabled={disable3} className="createvote__b">
                                <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                            </button>
                            : <img alt="croppedImg" src={croppedImage3} />
                        }
                        {visible3 === true ?
                            <EditPicModal
                                vote_id={voteID}
                                reNum={reNum}
                                onImageCroppedToOrderMid2={(croppedImage3) => setCroppedImage3(croppedImage3)}
                            /> : null
                        }
                    </div>
                    <div className="add__photo4">
                        { croppedImage4 == "" ?
                            <button onClick={onPlusPic4Handler} disabled={disable4} className="createvote__b">
                                <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
                            </button>
                            : <img alt="croppedImg" src={croppedImage4} />
                        }
                        {visible4 === true ?
                            <EditPicModal
                                vote_id={voteID}
                                reNum={reNum}
                                onImageCroppedToOrderMid2={(croppedImage4) => setCroppedImage4(croppedImage4)}
                            /> : null
                        }
                    </div>
                </div>
                <div className="createvote__button__container2">
                    <button onClick={onSubmitHandler} className="createvote__button">생성하기</button>
                </div>
            </div>
        </div>
    );

}

export default OrderMid2;
