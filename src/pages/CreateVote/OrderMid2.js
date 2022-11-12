import React, {useState} from 'react';
import {Link, Route, Switch, useNavigate, useLocation} from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import EditPicturesPage from "../EditPicturesPage";
import "./modal.css";


function EditModal({v, vote_id, pic_cnt}) {
    const [state, setState] = useState(v) // true: 모달 실행, false: 모달 종료
    const onStateHandler = (event) => {
        setState(!state)
        //modal_v = !(modal_v)
    }

    /*
    useEffect(() => {
        console.log("props 업데이트");
        console.log(v + " " + vote_id + " " + pic_cnt)
        console.log("투표 아이디: " + vote_id)
        console.log("사진 개수: " + pic_cnt)
    }*/

    console.log("투표 아이디: " + vote_id)
    console.log("사진 개수: " + pic_cnt)
    return (
        <div>
            <Modal
                visible={state}
                width="90%"
                height="90%"
                effect="fadeInDown"
                onClickAway={onStateHandler}
            >
                <div>
                    테스트
                    <input
                        value='close' type='button' onClick={onStateHandler}
                    />
                </div>
                <EditPicturesPage vote_id={vote_id} pic_cnt={pic_cnt}/>
            </Modal>
        </div>
    );
}

function OrderMid2() {
    // ordermid에서 투표 아이디 넘겨 받기
    const location = useLocation()
    const voteID = location.state.id
    const picCnt = location.state.pic_cnt

    // pic_cnt 넘겨 받아서 투표 생성 버튼 활성화 시키기

    console.log("오더2에서 받은 아이디" + voteID)
    console.log("오더2에서 받은 사진개수" + picCnt)

    return(
        <div className="createvote">
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    사진을 추가해주세요!
                </div>
                <div className="createvote__content">
                    사진 추가할 거1
                    <BsPlusCircleFill/>
                </div>
                <div className="createvote__content">
                    사진 추가할 거2
                    <BsPlusCircleFill/>
                </div>
                <div className="createvote__content">
                    사진 추가할 거3
                </div>
                <div className="createvote__content">
                    사진 추가할 거4
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