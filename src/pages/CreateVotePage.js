import React, {useState} from 'react';
import "./CreateVotePage.css";
import Order1 from "./CreateVote/Order1";
import Order2 from "./CreateVote/Order2";
import Order3 from "./CreateVote/Order3";
import Order4 from "./CreateVote/Order4";
import Order5 from "./CreateVote/Order5";
import Order6 from "./CreateVote/Order6";
import Order7 from "./CreateVote/Order7";
import OrderStart from "./CreateVote/OrderStart";
import OrderEnd from "./CreateVote/OrderEnd";
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
// 투표에 대한 정보를 props로 받아와 여기서 투표를 생성해서 백으로 보내준다
// 이 위에 투표 생성 선택지가 띄워짐

function VoteInfo({_voteName, _gender}){
    const [voteName, setVoteName] = useState("");
    const [gender, setGender] = useState(0);

    //setVoteName(_voteName);
    console.log(gender);
    console.log(_voteName);
}

function CreateVotePage({_voteName, _gender}) {
    const [voteName, setVoteName] = useState("");
    const [gender, setGender] = useState(0);

    //setVoteName(_voteName);

    console.log(_voteName);
    console.log(_gender);
    return(
        <OrderStart/>
    );
}

export default CreateVotePage;