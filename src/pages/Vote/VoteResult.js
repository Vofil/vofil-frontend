import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import {React, useState, useEffect} from 'react'

import "./VoteResult.css"
import InstaPostFrame from "../../Frame/InstaPostFrame"
import InstaProfileFrame from "../../Frame/InstaProfileFrame"
import KakaoBackFrame from "../../Frame/KakaoBackFrame"
import KakaoProfileFrame from "../../Frame/KakaoProfileFrame"
import TwitterBackFrame from "../../Frame/TwitterBackFrame"
import TwitterProfileFrame from "../../Frame/TwitterProfileFrame"

import AgeChart from "../../Chart/AgeChart"
import GenderChart from "../../Chart/GenderChart"
import TagChart from "../../Chart/TagChart"
import TitleChart from "../../Chart/TitleChart"

// 투표 참여 후 투표 결과 페이지
// 투표 참여한 사람만 볼 수 있음
// <접근 경로>
// -- 내가 참여한 투표 -> 투표창 클릭
// -- 투표 직후
// <주의 사항>
// -- 투표 생성자는 투표가 완전 종료 되기 전까지 접근 할 수 없음.
// -- 투표 참여 전 유저는 접근할 수 없음.

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

function VoteResult() {

    //네비게이트로 받아온 투표 아이디입니다.
    const location = useLocation()
    const voteID = location.state.id

    // loading 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 투표 제목, 투표 종류, 사진 용도
    const [feeling, setFeeling] = useState("");
    const [kind, setKind] = useState(-1);
    const [category, setCategory] = useState("");

    // 사진 이미지
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    // 사진별로 받아온 결과 저장
    const [re1, setRE1] = useState(0);
    const [re2, setRE2] = useState(0);
    const [re3, setRE3] = useState(0);
    const [re4, setRE4] = useState(0);

    // 투표 결과 분석
    const [voteReGender1, setVoteReGender1] = useState([])
    const [voteReGender2, setVoteReGender2] = useState([])
    const [voteReGender3, setVoteReGender3] = useState([])
    const [voteReGender4, setVoteReGender4] = useState([])

    const [voteReAge1, setVoteReAge1] = useState([])
    const [voteReAge2, setVoteReAge2] = useState([])
    const [voteReAge3, setVoteReAge3] = useState([])
    const [voteReAge4, setVoteReAge4] = useState([])

    const [voteReTitle11, setVoteReTitle11] = useState([])
    const [voteReTitle12, setVoteReTitle12] = useState([])
    const [voteReTitle13, setVoteReTitle13] = useState([])
    const [voteReTitle14, setVoteReTitle14] = useState([])

    const [voteReTitle21, setVoteReTitle21] = useState([])
    const [voteReTitle22, setVoteReTitle22] = useState([])
    const [voteReTitle23, setVoteReTitle23] = useState([])
    const [voteReTitle24, setVoteReTitle24] = useState([])

    const [voteReTitle31, setVoteReTitle31] = useState([])
    const [voteReTitle32, setVoteReTitle32] = useState([])
    const [voteReTitle33, setVoteReTitle33] = useState([])
    const [voteReTitle34, setVoteReTitle34] = useState([])

    const [tagRe1, setTagRe1] = useState([])
    const [tagRe2, setTagRe2] = useState([])
    const [tagRe3, setTagRe3] = useState([])
    const [tagRe4, setTagRe4] = useState([])

    const [c1, setC1] = useState(1);
    const [c2, setC2] = useState(0);
    const [c3, setC3] = useState(0);


    const onClick1 = () => {
        setC1(1)
        setC2(0)
        setC3(0)
    }

    const onClick2 = () => {
         setC1(0)
         setC2(1)
         setC3(0)
    }

    const onClick3 = () => {
        setC1(0)
        setC2(0)
        setC3(1)
    }

    // 투표 사진 데이터 저장하기(feeling, kind)
    const fetchVoteInfo = async () => {
        //초기화
        setFeeling("")
        setKind(-1)

        setError(null)
        setLoading(true)

        axios
        .get("api/votes/confirm", { params:
            {
                id: voteID,
            }
        })
        .then((response) => {
            _title.map(function(element) {
                if (`${element.t2}` == response.data.feeling) {
                    setFeeling(`${element.t1}`)
                }
            });


            if(response.data.kind == 0){
                setKind("일반 투표")
            }
            else{
                setKind("태그 투표")
            }

            setCategory(response.data.categorying)

        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })

        setLoading(false);
    };

    useEffect(() => {
        fetchVoteInfo();
    }, []);

    // 투표 사진 데이터 저장하기
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


    // 최신 투표 결과 데이터 저장하기
    const fetchVoteRe = async () => {
        //초기화
//        setRE1(0)
//        setRE2(0)
//        setRE3(0)
//        setRE4(0)

        setError(null)
        setLoading(true)

        getRe(1)
        getRe(2)
        getRe(3)
        getRe(4)

        setLoading(false);
    };

    const getRe = (_cnt) => {
        axios
        .get("api/votes/result", { params:
            {
                id: voteID,
                cnt: _cnt
            }
        })
        .then((response) => {
            if(_cnt == 1){
                setRE1(response.data)
            }
            else if(_cnt == 2){
                setRE2(response.data)
            }
            else if(_cnt == 3){
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

    useEffect(() => {
        fetchVoteRe();
    }, []);

    // 투표 결과 분석 - 성별
    const fetchVoteGender = async () => {
        getGenderRe(1)
        getGenderRe(2)
        getGenderRe(3)
        getGenderRe(4)
    };

    const getGenderRe = (_cnt) => {
        axios
        .get("api/votes/graph", { params:
            {
                id: voteID,
                cnt: _cnt
            }
        })
        .then((response) => {
            if(_cnt == 1){
                console.log(response.data)
                setVoteReGender1(response.data)
            }
            else if(_cnt == 2){
                console.log(response.data)
                setVoteReGender2(response.data)
            }
            else if(_cnt == 3){
                console.log(response.data)
                setVoteReGender3(response.data)
            }
            else{
                console.log(response.data)
                setVoteReGender4(response.data)
            }

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVoteGender();
    }, []);

    //투표 결과 분석 - 연령
    const fetchVoteAge = async () => {
        getAgeRe(1)
        getAgeRe(2)
        getAgeRe(3)
        getAgeRe(4)
    };

    const getAgeRe = (_cnt) => {
        axios
        .get("api/votes/graphAge", { params:
            {
                id: voteID,
                cnt: _cnt
            }
        })
        .then((response) => {
            if(_cnt == 1){
                console.log(response.data)
                setVoteReAge1(response.data)
            }
            else if(_cnt == 2){
                console.log(response.data)
                setVoteReAge2(response.data)
            }
            else if(_cnt == 3){
                console.log(response.data)
                setVoteReAge3(response.data)
            }
            else{
                console.log(response.data)
                setVoteReAge4(response.data)
            }

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVoteAge();
    }, []);

    //투표 결과 분석 - 칭호 kind1
    const fetchVoteTitle1 = async () => {
        getTitleRe1(1)
        getTitleRe1(2)
        getTitleRe1(3)
        getTitleRe1(4)
    };

    const getTitleRe1 = (_cnt) => {
        axios
        .get("api/votes/graphNick", { params:
            {
                id: voteID,
                cnt: _cnt,
                kind: 1
            }
        })
        .then((response) => {
            if(_cnt == 1){
                console.log(response.data)
                setVoteReTitle11(response.data)
            }
            else if(_cnt == 2){
                console.log(response.data)
                setVoteReTitle12(response.data)
            }
            else if(_cnt == 3){
                console.log(response.data)
                setVoteReTitle13(response.data)
            }
            else{
                console.log(response.data)
                setVoteReTitle14(response.data)
            }

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVoteTitle1();
    }, []);

    //투표 결과 분석 - 칭호 kind2
    const fetchVoteTitle2 = async () => {
        getTitleRe2(1)
        getTitleRe2(2)
        getTitleRe2(3)
        getTitleRe2(4)
    };

    const getTitleRe2 = (_cnt) => {
        axios
        .get("api/votes/graphNick", { params:
            {
                id: voteID,
                cnt: _cnt,
                kind: 2
            }
        })
        .then((response) => {
            if(_cnt == 1){
                console.log(response.data)
                setVoteReTitle21(response.data)
            }
            else if(_cnt == 2){
                console.log(response.data)
                setVoteReTitle22(response.data)
            }
            else if(_cnt == 3){
                console.log(response.data)
                setVoteReTitle23(response.data)
            }
            else{
                console.log(response.data)
                setVoteReTitle24(response.data)
            }

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVoteTitle2();
    }, []);

    //투표 결과 분석 - 칭호 kind3
    const fetchVoteTitle3 = async () => {
        getTitleRe3(1)
        getTitleRe3(2)
        getTitleRe3(3)
        getTitleRe3(4)
    };

    const getTitleRe3 = (_cnt) => {
        axios
        .get("api/votes/graphNick", { params:
            {
                id: voteID,
                cnt: _cnt,
                kind: 3
            }
        })
        .then((response) => {
            if(_cnt == 1){
                console.log(response.data)
                setVoteReTitle31(response.data)
            }
            else if(_cnt == 2){
                console.log(response.data)
                setVoteReTitle32(response.data)
            }
            else if(_cnt == 3){
                console.log(response.data)
                setVoteReTitle33(response.data)
            }
            else{
                console.log(response.data)
                setVoteReTitle34(response.data)
            }

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVoteTitle3();
    }, []);


    //투표 태그 결과 분석
    const fetchTagRe = async () => {
        getTagRe(1)
        getTagRe(2)
        getTagRe(3)
        getTagRe(4)
    };

    const getTagRe = (_cnt) => {
        axios
        .get("api/votes/tagGraph", { params:
            {
                id: voteID,
                cnt: _cnt,
            }
        })
        .then((response) => {
            if(_cnt == 1){
                console.log(response.data)
                setTagRe1(response.data)
            }
            else if(_cnt == 2){
                console.log(response.data)
                setTagRe2(response.data)
            }
            else if(_cnt == 3){
                console.log(response.data)
                setTagRe3(response.data)
            }
            else{
                console.log(response.data)
                setTagRe4(response.data)
            }

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchTagRe();
    }, []);

    if(kind == "태그 투표"){
        return(
            <div className="voteresult">
                <div className="voteresult__center">
                    <div className="voteresult__state">
                        투표 진행 중 or 투표 결과
                    </div>
                    <div className="voteresult__title">
                        {feeling}
                    </div>
                    <div className="voteresult__kind">
                        투표 종류: {kind}
                    </div>
                    <div className="voteresult__votelist">
                        <div className="voteresult__button_box">
                            <button onClick={onClick1} className="voteresult__graph__button">나이</button>
                            <button onClick={onClick2} className="voteresult__graph__button">성별</button>
                            <button onClick={onClick3} className="voteresult__graph__button">칭호</button>
                        </div>
                        <div className="voteresult__vote">
                            <div className="voteresult__analBox">
                                <div className="voteresult__graph__box">
                                    {c1 == 1 && <AgeChart data={voteReAge1}/>}
                                    {c2 == 1 && <GenderChart data={voteReGender1}/>}
                                    {c3 == 1 && <TitleChart data1={voteReTitle11} data2={voteReTitle21} data3={voteReTitle31}/>}
                                </div>
                            </div>
                        </div>

                        { image1 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image1}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image1}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image1}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image1}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image1}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image1}/>}
                                </div>
                                <div className="voteresult__tag">
                                    <TagChart data={tagRe1}/>
                                </div>
                            </div>
                        }
                        { image2 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image2}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image2}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image2}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image2}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image2}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image2}/>}
                                </div>
                                <div className="voteresult__tag">
                                    <TagChart data={tagRe2}/>
                                </div>
                            </div>
                        }
                        { image3 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image3}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image3}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image3}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image3}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image3}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image3}/>}
                                </div>
                                <div className="voteresult__tag">
                                    <TagChart data={tagRe3}/>
                                </div>
                            </div>
                        }
                        { image4 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image4}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image4}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image4}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image4}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image4}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image4}/>}
                                </div>
                                <div className="voteresult__tag">
                                    <TagChart data={tagRe4}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <div className="voteresult">
                <div className="voteresult__center">
                    <div className="voteresult__state">
                        투표 진행 중 or 투표 결과
                    </div>
                    <div className="voteresult__title">
                        {feeling}
                    </div>
                    <div className="voteresult__kind">
                        투표 종류: {kind}
                    </div>
                    <div className="voteresult__votelist">
                        <div className="voteresult__button_box">
                            <button onClick={onClick1} className="voteresult__graph__button">나이</button>
                            <button onClick={onClick2} className="voteresult__graph__button">성별</button>
                            <button onClick={onClick3} className="voteresult__graph__button">칭호</button>
                        </div>
                        { image1 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image1}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image1}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image1}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image1}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image1}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image1}/>}
                                </div>
                                <div className="voteresult__analBox">
                                    <div className="voteresult__graph__box">
                                        {c1 == 1 && <AgeChart data={voteReAge1}/>}
                                        {c2 == 1 && <GenderChart data={voteReGender1}/>}
                                        {c3 == 1 && <TitleChart data1={voteReTitle11} data2={voteReTitle21} data3={voteReTitle31}/>}
                                    </div>
                                    <div className="voteresult__cnt">총 득표 수: {re1}</div>
                                </div>
                            </div>
                        }
                        { image2 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image2}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image2}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image2}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image2}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image2}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image2}/>}
                                </div>
                                <div className="voteresult__analBox">
                                    <div className="voteresult__graph__box">
                                        {c1 == 1 && <AgeChart data={voteReAge2}/>}
                                        {c2 == 1 && <GenderChart data={voteReGender2}/>}
                                        {c3 == 1 && <TitleChart data1={voteReTitle12} data2={voteReTitle22} data3={voteReTitle32}/>}
                                    </div>
                                    <div className="voteresult__cnt">총 득표 수: {re2}</div>
                                </div>
                            </div>
                        }
                        { image3 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image3}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image3}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image3}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image3}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image3}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image3}/>}
                                </div>
                                <div className="voteresult__analBox">
                                    <div className="voteresult__graph__box">
                                        {c1 == 1 && <AgeChart data={voteReAge3}/>}
                                        {c2 == 1 && <GenderChart data={voteReGender3}/>}
                                        {c3 == 1 && <TitleChart data1={voteReTitle13} data2={voteReTitle23} data3={voteReTitle33}/>}
                                    </div>
                                    <div className="voteresult__cnt">총 득표 수: {re3}</div>
                                </div>
                            </div>
                        }
                        { image4 != "" &&
                            <div className="voteresult__vote">
                                <div className="voteresult__img">
                                    { category == "인스타게시물" && <InstaPostFrame sourceImg={image4}/>}
                                    { category == "인스타프사" && <InstaProfileFrame sourceImg={image4}/>}
                                    { category == "카톡프사" && <KakaoProfileFrame sourceImg={image4}/>}
                                    { category == "카톡배사" && <KakaoBackFrame sourceImg={image4}/>}
                                    { category == "트위터프사" && <TwitterProfileFrame sourceImg={image4}/>}
                                    { category == "트위터헤더" && <TwitterBackFrame sourceImg={image4}/>}
                                </div>
                                <div className="voteresult__analBox">
                                    <div className="voteresult__graph__box">
                                        {c1 == 1 && <AgeChart data={voteReAge4}/>}
                                        {c2 == 1 && <GenderChart data={voteReGender4}/>}
                                        {c3 == 1 && <TitleChart data1={voteReTitle14} data2={voteReTitle24} data3={voteReTitle34}/>}
                                    </div>
                                    <div className="voteresult__cnt">총 득표 수: {re4}</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default VoteResult;



//<PieChartComponent
//                                            title={"투표 연령"}
//                                            description={"연령에 따른 투표 분석"}
//                                            analData={voteReGender1}
//                                        />


//{ (kind == "태그 투표") &&
//                                    <div className="voteresult__tag">
//                                        {tagRe1 != null &&
//                                            tagRe1.map( x => (
//                                                <div className="voteresult__agepercentageBox">
//                                                    <div>{x.name}</div>
//                                                    <div>{x.percentage}</div>
//                                                </div>
//                                            ))
//                                        }
//                                    </div>
//                                }