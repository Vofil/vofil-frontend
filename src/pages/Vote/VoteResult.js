import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import {React, useState, useEffect} from 'react'
// 투표 참여 후 투표 결과 페이지
// 투표 참여한 사람만 볼 수 있음
// <접근 경로>
// -- 내가 참여한 투표 -> 투표창 클릭
// -- 투표 직후
// <주의 사항>
// -- 투표 생성자는 투표가 완전 종료 되기 전까지 접근 할 수 없음.
// -- 투표 참여 전 유저는 접근할 수 없음.

function VoteResult() {

    //네비게이트로 받아온 투표 아이디입니다.
    const location = useLocation()
    const voteID = location.state.id

    // loading 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 사진벼롤 받아온 결과 저장
    const [re1, setRE1] = useState(0);
    const [re2, setRE2] = useState(0);
    const [re3, setRE3] = useState(0);
    const [re4, setRE4] = useState(0);


    // 최신 투표 데이터 저장하기
    const fetchVoteRe = async () => {
        //초기화
        setRE1(0)
        setRE2(0)
        setRE3(0)
        setRE4(0)

        setError(null)
        setLoading(true)

        for(var i = 1; i < 5; i++){
            axios
            .get("api/votes/result", { params:
                {
                    id: voteID,
                    cnt: i
                }
            })
            .then((response) => {
                if(i == 1){
                    setRE1(response.data)
                }
                else if(i == 2){
                    setRE2(response.data)
                }
                else if(i == 3){
                    setRE3(response.data)
                }
                else{
                    setRE4(response.data)
                }
                console.log('well done!')
            })
            .catch((error) => {
                console.log('An error occurred:', error.response);
            })
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVoteRe();
    }, []);

    return(
        <div>
            <h2>결과페이지 입니다</h2>
            <ul>
                <li>{re1}</li>
                <li>{re2}</li>
                <li>{re3}</li>
                <li>{re4}</li>
            </ul>
        </div>
    );
}

export default VoteResult;
