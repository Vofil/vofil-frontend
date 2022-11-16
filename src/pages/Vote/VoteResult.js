import axios from 'axios';

// 투표 참여 후 투표 결과 페이지
// 투표 참여한 사람만 볼 수 있음
// <접근 경로>
// -- 내가 참여한 투표 -> 투표창 클릭
// -- 투표 직후
// <주의 사항>
// -- 투표 생성자는 투표가 완전 종료 되기 전까지 접근 할 수 없음.
// -- 투표 참여 전 유저는 접근할 수 없음.

function VoteResult() {

    // result api 불러오기
    for(var i = 1, i < 5, i++){
        axios
        .get("api/votes/result", { params:
            {
                id: "투표 아이디",
                cnt: i
            }

        })
    }

    return();
}

export default VoteResult;
