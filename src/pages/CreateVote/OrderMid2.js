import React, {useState} from 'react';
import {Link, Route, Switch, useNavigate, useLocation} from "react-router-dom";
import axios from 'axios';

function OrderMid2() {
    const location = useLocation()
    const voteID = location.state.id

    console.log("오더2에서 받은 아이디" + voteID)

    return(
        <div>
            <h2>사진을 넣어 봅시다.</h2>
            <div>{voteID}</div>
        </div>
    );

}

export default OrderMid2;