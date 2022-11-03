import React, {useState} from 'react';
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import "../CreateVotePage.css";
import VoteInfo from "../CreateVotePage";

function Order1() {
    const [voteName, setVoteName] = useState("");

    const onVoteNameHandler = (event) => {
        setVoteName(event.currentTarget.value)
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
                    <input
                        name="voteName"
                        type="text"
                        placeholder="예시: 카톡 프사로 쓸 귀여운 사진"
                        value={voteName}
                        onChange={onVoteNameHandler}
                        className="createvote__input"
                    />
                </div>
            </div>
            <div className="createvote__rightleft">
                <Link to="/create_vote/order2">
                    <button className="createvote__button">
                        <IoIosArrowForward/>
                    </button>
                </Link>
            </div>
            <VoteInfo _voteName={voteName} />
        </div>
    );
}

export default Order1;
