import React, {useState} from 'react';
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import "../CreateVotePage.css";
import VoteInfo from "../CreateVotePage";

function Order2() {

    const [gender, setGender] = useState(0);

    const onGenderHandler = (event) => {
        setGender(event.currentTarget.value)
    }

    return(
        <div className="createvote">
            <div className="createvote__rightleft">
                <Link to="/create_vote/order1">
                    <button className="createvote__button">
                        <IoIosArrowBack/>
                    </button>
                </Link>
            </div>
            <div className="createvote__center">
                <div className="createvote__head">
                    2. 어떤 성별로부터 투표 받고 싶나요?
                </div>
                <div className="createvote__content">
                    <label htmlFor="male" className="createvote__input_radio">남성</label>
                    <input name="gender" type="radio" value={3} onChange={onGenderHandler} className="createvote__input__radio"/>
                </div>
            </div>
            <div className="createvote__rightleft">
                <button className="createvote__button">
                    <IoIosArrowForward/>
                </button>
            </div>
            <VoteInfo _gender={gender} />
        </div>
    );
}

export default Order2;

