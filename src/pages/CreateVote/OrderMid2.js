import React, {useState, useEffect} from 'react';
import {Link, Route, Switch, useNavigate, useLocation} from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import EditPicturesPage from "../EditPicturesPage";
import "./modal.css";
import "./OrderMid2.css";
import InstaPostFrame from "../../Frame/InstaPostFrame"
import InstaProfileFrame from "../../Frame/InstaProfileFrame"
import KakaoBackFrame from "../../Frame/KakaoBackFrame"
import KakaoProfileFrame from "../../Frame/KakaoProfileFrame"
import TwitterBackFrame from "../../Frame/TwitterBackFrame"
import TwitterProfileFrame from "../../Frame/TwitterProfileFrame"


function EditPicModal({vote_id, pic_cnt, reNum, onImageCroppedToOrderMid2}) {
    // 모달 가시화 상태 관리
    const [state, setState] = useState(true) // true: 모달 실행, false: 모달 종료

    // 편집 사진 받아오기
    const [croppedImage, setCroppedImage] = useState(undefined)

    // 편집 이미지 order2에 전달 메서드
    const passImage = () => {
        onImageCroppedToOrderMid2(croppedImage)
    }

    console.log("모달에서 받은 투표 아이디: " + vote_id)

    return (
        <div>
            <Modal
                visible={state}
                width="1000px"
                height="600px"
                effect="fadeInDown"
            >
                <EditPicturesPage
                    onImageCroppedToModal={(croppedImage) => setCroppedImage(croppedImage)}
                    onModalClose={(state) => setState(state)}
                    passImageTrigger={(croppedImage) => onImageCroppedToOrderMid2(croppedImage)}
                    voteID={vote_id}
                    reNum={reNum}
                />
            </Modal>
        </div>
    );
}
//onClickAway={closeModal}
//<div>
//    <button onClick={closeModal}>편집완료</button>
//</div>

function OrderMid2() {
    // ordermid에서 투표 아이디, 등록 사진 개수 넘겨 받기
    const location = useLocation()
    const voteID = location.state.id       // 투표 아이디
    const picCnt = location.state.pic_cnt  // 등록 사진 개수

    // EditPicturePage에 전해줄 reNum 상태 관리
    const [reNum, setReNum] = useState(0);

    // 카테고리
    const [category, setCategory] = useState("");

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
    const [croppedImage1, setCroppedImage1] = useState(null)
    const [croppedImage2, setCroppedImage2] = useState(null)
    const [croppedImage3, setCroppedImage3] = useState(null)
    const [croppedImage4, setCroppedImage4] = useState(null)

    //페이지 이동 함수
    const navigate = useNavigate();

    // axios를 통해 사진 불러오기
    const fetchVote = async () => {
        // 제목 로드
        axios
        .get("api/votes/confirm", { params:
            {
                id: voteID
            }
        })
        .then((response) => {
            setCategory(response.data.categorying)
            console.log(response.data.categorying)
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    };

    useEffect(() => {
        fetchVote();
    }, []);

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
        navigate("/orderEnd", {
            state: {
                id: voteID,
            }
        });
    }

    return(
        <div className="createvote">
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    8. 사진을 추가해주세요!
                </div>
                <div className="num-box">
                    <button onClick={onPlusPic1Handler} disabled={disable1} className={'createvote__b_' + (disable1 ? 'dis' : 'active')}>1</button>
                    <button onClick={onPlusPic2Handler} disabled={disable2} className={'createvote__b_' + (disable2 ? 'dis' : 'active')}>2</button>
                    <button onClick={onPlusPic3Handler} disabled={disable3} className={'createvote__b_' + (disable3 ? 'dis' : 'active')}>3</button>
                    <button onClick={onPlusPic4Handler} disabled={disable4} className={'createvote__b_' + (disable4 ? 'dis' : 'active')}>4</button>
                </div>
                <div>
                    {visible1 === true ?
                        <EditPicModal
                            vote_id={voteID}
                            reNum={reNum}
                            onImageCroppedToOrderMid2={(croppedImage1) => setCroppedImage1(croppedImage1)}
                        /> : null
                    }
                    {visible2 === true ?
                        <EditPicModal
                            vote_id={voteID}
                            reNum={reNum}
                            onImageCroppedToOrderMid2={(croppedImage2) => setCroppedImage2(croppedImage2)}
                        /> : null
                    }
                    {visible3 === true ?
                        <EditPicModal
                            vote_id={voteID}
                            reNum={reNum}
                            onImageCroppedToOrderMid2={(croppedImage3) => setCroppedImage3(croppedImage3)}
                        /> : null
                    }
                    {visible4 === true ?
                        <EditPicModal
                            vote_id={voteID}
                            reNum={reNum}
                            onImageCroppedToOrderMid2={(croppedImage4) => setCroppedImage4(croppedImage4)}
                        /> : null
                    }
                </div>
                <div className="sample-container">
                    {disable1 == false &&
                        <div className="sample">
                            { category == "인스타게시물" && <InstaPostFrame sourceImg={croppedImage1} />}
                            { category == "인스타프사" && <InstaProfileFrame sourceImg={croppedImage1}/>}
                            { category == "카톡프사" && <KakaoProfileFrame sourceImg={croppedImage1}/>}
                            { category == "카톡배사" && <KakaoBackFrame sourceImg={croppedImage1}/>}
                            { category == "트위터프사" && <TwitterProfileFrame sourceImg={croppedImage1}/>}
                            { category == "트위터헤더" && <TwitterBackFrame sourceImg={croppedImage1}/>}
                        </div>
                    }
                    {disable2 == false &&
                        <div className="sample">
                            { category == "인스타게시물" && <InstaPostFrame sourceImg={croppedImage2} />}
                            { category == "인스타프사" && <InstaProfileFrame sourceImg={croppedImage2}/>}
                            { category == "카톡프사" && <KakaoProfileFrame sourceImg={croppedImage2}/>}
                            { category == "카톡배사" && <KakaoBackFrame sourceImg={croppedImage2}/>}
                            { category == "트위터프사" && <TwitterProfileFrame sourceImg={croppedImage2}/>}
                            { category == "트위터헤더" && <TwitterBackFrame sourceImg={croppedImage2}/>}
                        </div>
                    }
                    {disable3 == false &&
                        <div className="sample">
                            { category == "인스타게시물" && <InstaPostFrame sourceImg={croppedImage3} />}
                            { category == "인스타프사" && <InstaProfileFrame sourceImg={croppedImage3}/>}
                            { category == "카톡프사" && <KakaoProfileFrame sourceImg={croppedImage3}/>}
                            { category == "카톡배사" && <KakaoBackFrame sourceImg={croppedImage3}/>}
                            { category == "트위터프사" && <TwitterProfileFrame sourceImg={croppedImage3}/>}
                            { category == "트위터헤더" && <TwitterBackFrame sourceImg={croppedImage3}/>}
                        </div>
                    }
                    {disable4 == false &&
                        <div className="sample">
                            { category == "인스타게시물" && <InstaPostFrame sourceImg={croppedImage4} />}
                            { category == "인스타프사" && <InstaProfileFrame sourceImg={croppedImage4}/>}
                            { category == "카톡프사" && <KakaoProfileFrame sourceImg={croppedImage4}/>}
                            { category == "카톡배사" && <KakaoBackFrame sourceImg={croppedImage4}/>}
                            { category == "트위터프사" && <TwitterProfileFrame sourceImg={croppedImage4}/>}
                            { category == "트위터헤더" && <TwitterBackFrame sourceImg={croppedImage4}/>}
                        </div>
                    }
                </div>
                <div className="createvote__button__container2">
                    <button onClick={onSubmitHandler} className="createvote__button">생성하기</button>
                </div>
            </div>
        </div>
    );

}

export default OrderMid2;



//<div className="createvote__content">
//        <div className="add__photo1">
//            { croppedImage1 == null ?
//                <button onClick={onPlusPic1Handler} disabled={disable1} className="createvote__b">
//                    1
//                </button>
//                : <img alt="croppedImg" src={croppedImage1} />
//            }
//            {visible1 === true ?
//                <EditPicModal
//                    vote_id={voteID}
//                    reNum={reNum}
//                    onImageCroppedToOrderMid2={(croppedImage1) => setCroppedImage1(croppedImage1)}
//                /> : null
//            }
//        </div>
//        <div className="add__photo2">
//            { croppedImage2 == null ?
//                <button onClick={onPlusPic2Handler} disabled={disable1} className="createvote__b">
//                    <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
//                </button>
//                : <img alt="croppedImg" src={croppedImage2} />
//            }
//            {visible2 === true ?
//                <EditPicModal
//                    vote_id={voteID}
//                    reNum={reNum}
//                    onImageCroppedToOrderMid2={(croppedImage2) => setCroppedImage2(croppedImage2)}
//                /> : null
//            }
//        </div>
//        <div className="add__photo3">
//            { croppedImage3 == null ?
//                <button onClick={onPlusPic3Handler} disabled={disable3} className="createvote__b">
//                    <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
//                </button>
//                : <img alt="croppedImg" src={croppedImage3} />
//            }
//            {visible3 === true ?
//                <EditPicModal
//                    vote_id={voteID}
//                    reNum={reNum}
//                    onImageCroppedToOrderMid2={(croppedImage3) => setCroppedImage3(croppedImage3)}
//                /> : null
//            }
//        </div>
//        <div className="add__photo4">
//            { croppedImage4 == null ?
//                <button onClick={onPlusPic4Handler} disabled={disable4} className="createvote__b">
//                    <BsPlusCircleFill color="rgb(122, 204, 185)" size="100%"/>
//                </button>
//                : <img alt="croppedImg" src={croppedImage4} />
//            }
//            {visible4 === true ?
//                <EditPicModal
//                    vote_id={voteID}
//                    reNum={reNum}
//                    onImageCroppedToOrderMid2={(croppedImage4) => setCroppedImage4(croppedImage4)}
//                /> : null
//            }
//        </div>
//    </div>
