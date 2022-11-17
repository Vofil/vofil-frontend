import {React, useState, useEffect} from "react"
import axios from 'axios';
import VoteNormal from "./Vote/VoteNormal"
import VoteTag from "./Vote/VoteTag"

const voteID = 321
// props로 투표 아이디 받아와서 vote api에서 검색함.
// 아이디 같은 엔트리 뽑아다가화면에 뿌리기
function VotePage() {

    // voteID로 api에서 kind 확인하고 렌더링
    const [kind, setKind] = useState(-1);

    // loading 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVoteIDLoad = () => {
        // 투표 아이디로 kind를 불러오자!
        axios
        .get("api/votes/confirm", { params:
            {
                id: voteID
            }
        })
        .then((response) => {
            // 응답 받은 데이터로 kind 셋팅하기
            setKind(response.data.kind)

            console.log("kind: " + response.data.kind)
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVoteIDLoad();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    return(
        <div>
            { kind == 0 && <VoteNormal voteID={voteID}/> }
            { kind == 1 && <VoteTag voteID={voteID}/> }
        </div>
    );
}

export default VotePage;