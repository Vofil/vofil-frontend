import React, {useState} from 'react';
import Order1 from "./CreateVote/Order1";
import Order2 from "./CreateVote/Order2";
import Order3 from "./CreateVote/Order3";
import Order4 from "./CreateVote/Order4";
import Order5 from "./CreateVote/Order5";
import Order6 from "./CreateVote/Order6";
import Order7 from "./CreateVote/Order7";
import OrderStart from "./CreateVote/OrderStart";
import OrderEnd from "./CreateVote/OrderEnd";
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
// 투표에 대한 정보를 props로 받아와 여기서 투표를 생성해서 백으로 보내준다
// 이 위에 투표 생성 선택지가 띄워짐

function CreateVotePage() {

    const [data, setData] = useState({
        User_id: "tester01",
        id: 1,
        gender: 3,
        age: 2,
        endingPoint: 100,
        kind: 0,
        pic_cnt: 3,
        result1: null,
        result2: null,
        result3: null,
        result4: null,
        category: "카톡프사",
        title: "소개팅",
        Taging: "예쁘다",
    })

    const onDataHandler = (event) => {
        axios
        .post("/api/votes", data)
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });

      }

    return(
        <button onClick={onDataHandler}>데이터가 갑니다 슝</button>
    );
}

export default CreateVotePage;