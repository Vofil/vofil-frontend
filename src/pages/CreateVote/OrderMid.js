import React, {useState} from 'react';
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
        <div className="createvote2">
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    1. 제목의 키워드를 골라주세요!
                </div>
                <div className="createvote__small__head2">
                </div>
                <div className="createvote__content">

                </div>
            </div>
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    2. 어떤 성별로부터 투표 받고 싶나요?
                </div>
                <div className="createvote__content">

                </div>
            </div>
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    3. 어떤 나이대로부터 투표 받고 싶나요?
                </div>
                <div className="createvote__content">

                </div>
            </div>
            <div className="createvote__center">
                <div className="createvote__mid__head">
                    4. 어떤 방식으로 투표를 진행할까요?
                </div>
                <div className="createvote__content">

                </div>
            </div>
        </div>
    );
}

export default OrderMid;