import {React, useState} from "react"
import VoteNormal from "./Vote/VoteNormal"
import VoteTag from "./Vote/VoteTag"

// props로 투표 아이디 받아와서 vote api에서 검색함.
// 아이디 같은 엔트리 뽑아다가화면에 뿌리기
function VotePage({voteID}) {

    // voteID로 api에서 kind 확인하고 렌더링
    const [kind, setKind] = useState(1);

     /*axios
    .get("api/votes", { params:
        {
            vote_id = voteID
        }
    })
    .then((response) => {
        // 응답 받은 데이터로 kind 셋팅하기
        setKind()

        console.log('well done!')
    })
    .catch((error) => {
        console.log('An error occurred:', error.response);
    })*/

    return(
        <div>
            { kind == 0 && <VoteNormal voteID={voteID}/> }
            { kind == 1 && <VoteTag voteID={voteID}/> }
        </div>
    );
}

export default VotePage;

//15 10 65 10