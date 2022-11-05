import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./CreateVotePage2.css";
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

function OrderMid() {
    const [title, setTitle] = useState("");
    const [gender, setGender] = useState(0);
    const [age, setAge] = useState(0);
    const [kind, setKind] = useState(0);
    const [endingPoint, setEndingPoint] = useState(0);
    const [category, setCategory] = useState("");
    const [picCnt, setPicCnt] = useState(0);

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onGenderHandler = (event) => {
        setGender(event.currentTarget.value)
    }

    const onAgeHandler = (event) => {
        setAge(event.currentTarget.value)
    }

    const onKindHandler = (event) => {
        setKind(event.currentTarget.value)
    }

    const onEndingPointHandler = (event) => {
        setEndingPoint(event.currentTarget.value)
    }

    const onCategoryHandler = (event) => {
        setCategory(event.currentTarget.value)
    }

    const onPicCntHandler = (event) => {
        setPicCnt(event.currentTarget.value)
    }

    return(
        <div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        1. 제목의 키워드를 골라주세요!
                    </div>
                    <div className="createvote__small__head">
                    </div>
                    <div className="createvote__content">

                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        2. 어떤 성별로부터 투표 받고 싶나요?
                    </div>
                    <div className="createvote__content">

                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        3. 어떤 나이대로부터 투표 받고 싶나요?
                    </div>
                    <div className="createvote__content">

                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        4. 어떤 방식으로 투표를 진행할까요?
                    </div>
                    <div className="createvote__content">

                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        5. 몇 개의 투표를 받으면 투표를 종료할까요?
                    </div>
                    <div className="createvote__content">

                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        6. 어떤 용도로 사진을 이용할 예정인가요?
                    </div>
                    <div className="createvote__content">

                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        7. 사진을 등록해주세요!
                    </div>
                    <div className="createvote__content">

                    </div>
                </div>
            </div>
            <div className="createvote__button__container">
                <Link to="/create_vote/orderEnd">
                    <button className="createvote__button">시작하기</button>
                </Link>
            </div>
        </div>
    );
}

export default OrderMid;