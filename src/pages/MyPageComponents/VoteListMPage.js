import {React, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "../MainPage.css"

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


function VoteListMPage() {
    let [voteData, setVoteData] = useState([])
    let [voteData2, setVoteData2] = useState([])
    let [tmpBlob, setTmpBlob] = useState()

    // 선택된 것은..!
    const [v, setV] = useState(0)

    //네비게이터를 만들겠소
    const navigate = useNavigate()

    const fetchVoteMDataLoad = () => {
        axios
        .get("api/mypage/vote", { params:
            {
                user_id: sessionStorage.getItem("loginID")
            }
        })
        .then((response) => {
            response.data.map(function(element) {
                axios({
                    method: "GET",
                    url: "api/pictures/FullView",
                    params: { id: `${element.vote_id}`, cnt: 1},
                    responseType: "blob",
                })
                .then((response) => {
                    console.log("내부")
                    const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
                    element.pic = url;
                    setTmpBlob(url)
                    console.log(url)
                    console.log('well done!')
                })
                .catch((error) => {
                    console.log('An error occurred:', error.response);
                })
            })
            console.log(response.data)
            setVoteData2(response.data)
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })

    }

    useEffect(() => {
        fetchVoteMDataLoad();
    }, []);

    useEffect(() => {
        setVoteData(voteData2)
    }, [tmpBlob])


//    const fetchPicGet = (e) => {
//        e.map(function(element) {
//            axios({
//                method: "GET",
//                url: "api/pictures/FullView",
//                params: { id: `${element.vote_id}`, cnt: 1},
//                responseType: "blob",
//            })
//            .then((response) => {
//                console.log("내부")
//                const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
//                element.pic = url;
//                console.log('well done!')
//            })
//            .catch((error) => {
//                console.log('An error occurred:', error.response);
//            })
//        })
//        setVoteData(e)
//        console.log(e)
//    }

//    useEffect(() => {
//        fetchPicGet();
//    }, []);

    const onSetVHandler = (event) => {
        setV(event.currentTarget.value)
        console.log("맞춤투표: " + event.currentTarget.value)
//        navigate("/vote", {
//            state: {
//                id: event.currentTarget.value
//            }
//        })
        canAccess(event.currentTarget.value)
    }

    // 접근 가능한가?? 불리언 판단 true: 투표하기 페이지로, false: 투표 결과페이지로
    const canAccess = (Vid) => {
        axios
        .get("/api/voters/bool", { params:
            {
                id: sessionStorage.getItem("loginID"),
                Vid: Vid
            }
        })
        .then((response) => {
            console.log("불리언: " + response.data)
            if(response.data == true){
                console.log("투표하기 페이지로 가야합ㄴ디ㅏ.")
                console.log("투표 아이디: " + Vid)
                // 투표하기 페이지로
                navigate("/vote", {
                    state: {
                        id: Vid
                    }
                })
            }
            else {
                // 투표 결과 페이지로
                navigate("/vote_result", {
                    state: {
                        id: Vid
                    }
                })
            }
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }


    return (
        <div>
            <div className="main__page">
                <div className="vote_category2">
                    <div className="vote_category__title">내가 만든 투표</div>
                    {sessionStorage.getItem("loginID") != null &&
                        <div className="vote__list__container2">
                            {voteData != null &&
                                voteData.map( x => (
                                    _title.map( y => (
                                        (`${y.t2}` == `${x.title}`) &&
                                            <label key={x.vote_id}>
                                                <input
                                                    type="radio"
                                                    className="radio__hidden__vote"
                                                    value={x.vote_id}
                                                    checked={v === `${x.vote_id}`}
                                                    onChange={onSetVHandler}
                                                />
                                                    <div className="vote__container">
                                                        <div className="thumbnail"><img alt="사진" src={x.pic} className="thumbimg"/></div>
                                                        {console.log("렌더링시: " + `${x.pic}`)}
                                                        <div className="vote__title">{y.t1}</div>
                                                    </div>
                                            </label>
                                    ))
                                ))
                            }
                            {voteData == null &&
                                <div>텅 비었다</div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );

//    return (
//        <div>
//            <h2>내가 만든 투표1</h2>
//            { voteData.map( x => (
//                <div>
//                    <div>{x.vote_id}</div>
//                    <div>{x.title}</div>
//                    <div>{x.re1}</div>
//                </div>
//            ))}
//        </div>
//    );
}

export default VoteListMPage;