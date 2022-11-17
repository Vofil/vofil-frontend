import {React, useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "../VotePage.css"

const _title = [{t1 : "소개팅에 사용할 사진 골라주세요!", t2 : "소개팅"},
    {t1 : "대학 오티에서 보여줄 사진 골라주세요~", t2 : "대학오티"},
    {t1 : "직장 팀원한테 무난하게 보일 사진 골라주세요..", t2 : "직장"},
    {t1 : "썸 상대한테 어필할 사진 추천 ㄱㄱ", t2 : "썸"},
    {t1 : "동아리 썸네일로 쓸 사진 골라주십쇼!", t2 : "동아리"},
    {t1 : "제일 예뻐보이는 사진으로 투표 부탁", t2 : "예쁜"},
    {t1 : "제일 귀여운 사진 골라주세여 >~<", t2 : "귀여운"},
    {t1 : "시크해보이는 걸로 골라줘.", t2 : "시크한"},
    {t1 : "어떤 사진이 제일 매력있어 보이나요??", t2 : "매력있는"},
    {t1 : "잘생긴 사진으로 골라주십쇼", t2 : "잘생긴"},
    {t1 : "멋있는 사진 투표받습니다", t2 : "멋있는"},
    {t1 : "사랑스러워 보이는 사진으로 골라주세요~", t2 : "사랑스러운"},
    {t1 : "어떤게 제일 섹시해 보이나요?", t2 : "섹시한"},
    {t1 : "듬직해 보이는 사진으로 추천해주십쇼", t2 : "듬직한"},
    {t1 : "힙해보이는 사진으로 투표 해주십쇼(합장)", t2 : "힙한"},
    {t1 : "카톡 프사로 쓸거 ㄱㄱ", t2 : "카톡프사"},
    {t1 : "ㅋ ㅏ 톡 배사 사진 추천", t2 : "카톡배사"},
    {t1 : "인스타 프사로 쓸건데 어떤게 제일 낫나요?(선글라스낀이모지)", t2 : "인스타프사"},
    {t1 : "인스타에 올릴 사진 골라주세요(합장)", t2 : "인스타게시물"},
    {t1 : "트위터 프사 어떤게 제일 나아?", t2 : "트위터프사"},
    {t1 : "트위터 배경 사진으로 쓸만한 사진 투표 부탁드립니다", t2 : "트위터배사"},]

// 일반투표
function VoteNormal({voteID}) {

    // api에서 뽑은 데이터를 저장.
    /*
        - 제목
        - 투표 방식
        - 등록된 사진
    */
    const [feeling, setFeeling] = useState("");
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    // loading 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Voter에 보내줄 데이터
    const [result1, setResult1] = useState(0);
    const [result2, setResult2] = useState(0);
    const [result3, setResult3] = useState(0);
    const [result4, setResult4] = useState(0);

    // 눌린 사진이 몇 번째 사진인가?
    const [numOfPic, setNumOfPic] = useState(-1);

    // 네비게이터를 만들겠소
    const navigate = useNavigate()

    // axios를 통해 사진 불러오기
    const fetchVote = async () => {
        // 제목 로드
        axios
        .get("api/votes/confirm", { params:
            {
                id: voteID
            }
        })
        .then((response) => {
             _title.map(function(element) {
                if (`${element.t2}` === response.data.feeling) {
                    setFeeling(`${element.t1}`)
                }
            });

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })

        // 사진 로드
        axios
        .get("api/pictures/confirm", { params:
            {
                id: voteID,
            }
        })
        .then((response) => {

            setImage1(response.data.re1)
            setImage2(response.data.re2)
            setImage3(response.data.re3)
            setImage4(response.data.re4)

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
        setLoading(false);
    };

    useEffect(() => {
        fetchVote();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    // 사진이 선택되었을 때
    const onSelectPic = (event) => {
        const tmp = event.currentTarget.value

        setNumOfPic(tmp)

        if(tmp == 1) {
            setResult1(1)
            setResult2(0)
            setResult3(0)
            setResult4(0)
        }
        else if(tmp == 2) {
            setResult1(0)
            setResult2(1)
            setResult3(0)
            setResult4(0)
        }
        else if(tmp == 3) {
            setResult1(0)
            setResult2(0)
            setResult3(1)
            setResult4(0)
        }
        else {
            setResult1(0)
            setResult2(0)
            setResult3(0)
            setResult4(1)
        }

        console.log(result4)
    }


    // Voter 정보 제출하는 버튼
    const onSubmitHandler = (event) => {

        console.log("제출이 될것이에요")

        axios
        .post("/api/voters", {
            user_id: "jisu",
            vote_id: voteID,
            result1: result1,
            result2: result2,
            result3: result3,
            result4: result4
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })

        axios
        .get("api/votes/update", {params:
            {
                id: voteID
            }
        })
        .then((response) => {
            console.log('well done!')
            return alert('제출되었습니다~^^')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })

        navigate("/");
    }


    return(
        <div className="createvote2">
            <div className="createvote__center2">
                <div className="createvote__big__head2">
                    {feeling}
                </div>
                <div className="createvote__small__head2">
                    투표 방식: 일반투표
                </div>
                <div className="createvote__content2">
                    {(image1 != null) &&
                        <label key={1} className="createvote__content__entity">
                            <input
                                type="radio"
                                className="radio__hidden"
                                value={1}
                                checked={numOfPic == 1}
                                onChange={onSelectPic}
                            />
                            <img alt="사진" src={image1}></img>
                        </label>
                    }
                    {(image2 != null) &&
                        <label key={2} className="createvote__content__entity">
                            <input
                                type="radio"
                                className="radio__hidden"
                                value={2}
                                checked={numOfPic == 2}
                                onChange={onSelectPic}
                            />
                            <img alt="사진" src={image2}></img>
                        </label>
                    }
                    {(image3 != null) &&
                        <label key={3} className="createvote__content__entity">
                            <input
                                type="radio"
                                className="radio__hidden"
                                value={3}
                                checked={numOfPic == 3}
                                onChange={onSelectPic}
                            />
                            <img alt="사진" src={image3}></img>
                        </label>
                    }
                    {(image4 != null) &&
                        <label key={4} className="createvote__content__entity">
                            <input
                                type="radio"
                                className="radio__hidden"
                                value={4}
                                checked={numOfPic == 4}
                                onChange={onSelectPic}
                            />
                            <img alt="사진" src={image4}></img>
                        </label>
                    }
                </div>
                <div className="createvote__button__container2">
                    <button onClick={onSubmitHandler} className="createvote__button2">제출하기</button>
                </div>
            </div>
        </div>
    );
}

export default VoteNormal;
