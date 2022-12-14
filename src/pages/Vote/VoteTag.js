import {React, useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "../VotePage.css"
import InstaPostFrame from "../../Frame/InstaPostFrame"
import InstaProfileFrame from "../../Frame/InstaProfileFrame"
import KakaoBackFrame from "../../Frame/KakaoBackFrame"
import KakaoProfileFrame from "../../Frame/KakaoProfileFrame"
import TwitterBackFrame from "../../Frame/TwitterBackFrame"
import TwitterProfileFrame from "../../Frame/TwitterProfileFrame"

// 태그투표에 쓸 태그
const _taging = [ {t1: "예쁘다", t2: 1},
    {t1: "귀엽다", t2: 2},
    {t1: "시크하다", t2: 3},
    {t1: "매력있다", t2: 4},
    {t1: "사랑스럽다", t2: 5},
    {t1: "활발하다", t2: 6},
    {t1: "요즘유행", t2: 7},
    {t1: "우아하다", t2: 8},
    {t1: "강아지상", t2: 9},
    {t1: "고양이상", t2: 10},
    {t1: "잘생겼다", t2: 20},
    {t1: "멋있다", t2: 21},
    {t1: "듬직하다", t2: 24},
    {t1: "요즘스타일", t2: 26},
    {t1: "섹시하다", t2: 27},
    {t1: "청량하다", t2: 28}]

// 제목 모음
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

// 태그투표
function VoteTag({voteID}) {

    // api에서 뽑은 데이터를 저장.
    /*
        - 제목
        - 투표 방식
        - 등록된 사진
    */
    const [endingPoint, setEndingPoint] = useState(0);
    const [feeling, setFeeling] = useState("");
    const [category, setCategory] = useState("");

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

            setEndingPoint(response.data.ending_point)
            setCategory(response.data.categorying)
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

    // 투표 사진 데이터 불러오기
    const fetchVotePic = async () => {
        //초기화
//        setImage1(null)
//        setImage2(null)
//        setImage3(null)
//        setImage4(null)

        setError(null)
        setLoading(true)

        getPic(1)
        getPic(2)
        getPic(3)
        getPic(4)

        setLoading(false);
    };

    useEffect(() => {
        fetchVotePic();
    }, []);

    const getPic = (_cnt) => {
        axios({
            method: "GET",
            url: "api/pictures/FullView",
            params: { id: voteID, cnt: _cnt},
            responseType: "blob",
        })
        .then((response) => {
            if(_cnt == 1){
                const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
                setImage1(url)
            }
            else if(_cnt == 2){
                const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
                setImage2(url)
            }
            else if(_cnt == 3){
                const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
                setImage3(url)
            }
            else{
                const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
                setImage4(url)
            }

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }


    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;


    // 사진에 태그를 달았을 때
    const onResult1Handler = (event) => {
        setResult1(event.currentTarget.value)
        console.log("1: "+ event.currentTarget.value)
    }

    const onResult2Handler = (event) => {
        setResult2(event.currentTarget.value)
        console.log("2: "+ event.currentTarget.value)
    }

    const onResult3Handler = (event) => {
        setResult3(event.currentTarget.value)
        console.log("3: "+ event.currentTarget.value)
    }

    const onResult4Handler = (event) => {
        setResult4(event.currentTarget.value)
        console.log("4: "+ event.currentTarget.value)
    }


    // Voter 정보 제출하는 버튼
    const onSubmitHandler = (event) => {

        console.log("제출이 될것이에요")
        axios
        .post("/api/voters", {
            user_id: sessionStorage.getItem("loginID"),
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

        // 투표 결과 페이지로
        navigate("/vote_result", {
            state: {
                id: voteID
            }
        })
    }

    return(
        <div className="vote2">
            <div className="vote__center2">
                <div className="vote__state">
                    남은 투표자수: {endingPoint}
                </div>
                <div className="createvote__big__head2">
                    {feeling}
                </div>
                <div className="createvote__small__head2">
                    투표 방식: 태그투표
                </div>
                <div className="vote__content2">
                    {(image1 != null) &&
                        <label key={1} className="createvote__content__entity">
                            <div>
                                { category == "인스타게시물" && <InstaPostFrame sourceImg={image1} />}
                                { category == "인스타프사" && <InstaProfileFrame sourceImg={image1}/>}
                                { category == "카톡프사" && <KakaoProfileFrame sourceImg={image1}/>}
                                { category == "카톡배사" && <KakaoBackFrame sourceImg={image1}/>}
                                { category == "트위터프사" && <TwitterProfileFrame sourceImg={image1}/>}
                                { category == "트위터헤더" && <TwitterBackFrame sourceImg={image1}/>}
                            </div>
                            <select value={result1} onChange={onResult1Handler}>
                                <option value="default" disabled>태그를 선택해주세요</option>
                                {_taging.map((tag) => (
                                    <option key={tag.t2} value={tag.t2}>
                                        {tag.t1}
                                    </option>
                                ))}
                            </select>
                        </label>
                    }
                    {(image2 != null) &&
                        <label key={2} className="createvote__content__entity">
                            <div>
                                { category == "인스타게시물" && <InstaPostFrame sourceImg={image2}/>}
                                { category == "인스타프사" && <InstaProfileFrame sourceImg={image2}/>}
                                { category == "카톡프사" && <KakaoProfileFrame sourceImg={image2}/>}
                                { category == "카톡배사" && <KakaoBackFrame sourceImg={image2}/>}
                                { category == "트위터프사" && <TwitterProfileFrame sourceImg={image2}/>}
                                { category == "트위터헤더" && <TwitterBackFrame sourceImg={image2}/>}
                            </div>
                            <select value={result2} onChange={onResult2Handler}>
                                <option value="default" disabled>태그를 선택해주세요</option>
                                {_taging.map((tag) => (
                                    <option key={tag.t2} value={tag.t2}>
                                        {tag.t1}
                                    </option>
                                ))}
                            </select>
                        </label>
                    }
                    {(image3 != null) &&
                        <label key={3} className="createvote__content__entity">
                            <div>
                                { category == "인스타게시물" && <InstaPostFrame sourceImg={image3}/>}
                                { category == "인스타프사" && <InstaProfileFrame sourceImg={image3}/>}
                                { category == "카톡프사" && <KakaoProfileFrame sourceImg={image3}/>}
                                { category == "카톡배사" && <KakaoBackFrame sourceImg={image3}/>}
                                { category == "트위터프사" && <TwitterProfileFrame sourceImg={image3}/>}
                                { category == "트위터헤더" && <TwitterBackFrame sourceImg={image3}/>}
                            </div>
                            <select value={result3} onChange={onResult3Handler}>
                                <option value="default" disabled>태그를 선택해주세요</option>
                                {_taging.map((tag) => (
                                    <option key={tag.t2} value={tag.t2}>
                                        {tag.t1}
                                    </option>
                                ))}
                            </select>
                        </label>
                    }
                    {(image4 != null) &&
                        <label key={4} className="createvote__content__entity">
                            <div>
                                { category == "인스타게시물" && <InstaPostFrame sourceImg={image4}/>}
                                { category == "인스타프사" && <InstaProfileFrame sourceImg={image4}/>}
                                { category == "카톡프사" && <KakaoProfileFrame sourceImg={image4}/>}
                                { category == "카톡배사" && <KakaoBackFrame sourceImg={image4}/>}
                                { category == "트위터프사" && <TwitterProfileFrame sourceImg={image4}/>}
                                { category == "트위터헤더" && <TwitterBackFrame sourceImg={image4}/>}
                            </div>
                            <select value={result4} onChange={onResult4Handler}>
                                <option value="default" disabled>태그를 선택해주세요</option>
                                {_taging.map((tag) => (
                                    <option key={tag.t2} value={tag.t2}>
                                        {tag.t1}
                                    </option>
                                ))}
                            </select>
                        </label>
                    }
                </div>
                <div className="createvote__button__container2">
                    <button onClick={onSubmitHandler} className="createvote__button2">제출하기</button>
                </div>
                <div className="caution">
                    <div className="caution-gray">타인이 올린 사진 및 개인 정보를 무단으로 캡쳐 및 유포할 경우, </div>
                    <div>vofil 서비스 영구 정지 및 민형사상 책임이</div>
                    <div className="caution-gray">따를 수 있습니다.</div>
                </div>
            </div>
        </div>
    );
}

export default VoteTag;