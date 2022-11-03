import React, {useState} from 'react';
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import "./CreateVotePage.css";
import Order2 from "./Order2";

function Order1() {
    const [title, setTitle] = useState("");

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

   //console.log(voteName);

    return(
        <div className="createvote">
            <div className="createvote__rightleft">
                <Link to="/create_vote/orderStart">
                    <button className="createvote__button">
                        <IoIosArrowBack/>
                    </button>
                </Link>
            </div>
            <div className="createvote__center">
                <div className="createvote__head">
                    1. 투표 제목을 입력해주세요
                </div>
                <div className="createvote__content">
                    <label htmlFor="소개팅" className="createvote__input_radio">소개팅</label>
                    <input name="voteFeeling" type="radio" value={"소개팅"} onChange={onTitleHandler} className="createvote__input__radio"/>
                </div>
            </div>
            <div className="createvote__rightleft">
                <Link to="/create_vote/order2">
                    <button className="createvote__button">
                        <IoIosArrowForward/>
                    </button>
                </Link>
            </div>
            <Order2 _title={title} />
        </div>
    );
}

export default Order1;
