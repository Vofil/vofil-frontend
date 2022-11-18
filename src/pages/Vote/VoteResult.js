import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import {React, useState, useEffect} from 'react'
import "./VoteResult.css"
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

    // 투표 제목, 투표 종류
    const [feeling, setFeeling] = useState("");
    const [kind, setKind] = useState(-1);

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
        axios
        .get("api/pictures/show", { params:
            {
                id: voteID,
                cnt: _cnt
            }
        })
        .then((response) => {
            if(_cnt == 1){
                setImage1(response.data)
            }
            else if(_cnt == 2){
                setImage2(response.data)
            }
            else if(_cnt == 3){
                setImage3(response.data)
            }
            else{
                setImage4(response.data)
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

//     return(
//        <div className="voteresult">
//            <div className="voteresult__center">
//                <div className="voteresult__state">
//                    투표 진행 중 or 투표 결과
//                </div>
//                <div className="voteresult__title">
//                    {feeling}
//                </div>
//                <div className="voteresult__kind">
//                    투표 종류: {kind}
//                </div>
//                <div className="voteresult__votelist">
//                    <div className="voteresult__vote">
//                        <div className="voteresult__img">
//                            <img alt="image" src={image1}/>
//                        </div>
//                        <div className="voteresult__cnt">{re1}</div>
//                    </div>
//
//
//                    <div className="voteresult__vote">
//                        <div className="voteresult__img">
//                            <img alt="image" src={image2}/>
//                        </div>
//                        <div className="voteresult__cnt">{re2}</div>
//                    </div>
//
//
//                    <div className="voteresult__vote">
//                        <div className="voteresult__img">
//                            <img alt="image" src={image3}/>
//                        </div>
//                        <div className="voteresult__cnt">{re3}</div>
//                    </div>
//                    <div className="voteresult__vote">
//                        <div className="voteresult__img">
//                            <img alt="image" src={image4}/>
//                        </div>
//                        <div className="voteresult__cnt">{re4}</div>
//                    </div>
//
//                </div>
//            </div>
//        </div>
//    );

    console.log("1: " + image1)
    console.log("2: " +image2)
    console.log("3: " +image3)
    console.log("4: " +image4)

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
                    { image1 != "" &&
                        <div className="voteresult__vote">
                            <div className="voteresult__img">
                                <img alt="image" src={image1}/>
                            </div>
                            <div className="voteresult__cnt">{re1}</div>
                        </div>
                    }
                    { image2 != "" &&
                        <div className="voteresult__vote">
                            <div className="voteresult__img">
                                <img alt="image" src={image2}/>
                            </div>
                            <div className="voteresult__cnt">{re2}</div>
                        </div>
                    }
                    { image3 != "" &&
                        <div className="voteresult__vote">
                            <div className="voteresult__img">
                                <img alt="image" src={image3}/>
                            </div>
                            <div className="voteresult__cnt">{re3}</div>
                        </div>
                    }
                    { image4 != "" &&
                        <div className="voteresult__vote">
                            <div className="voteresult__img">
                                <img alt="image" src={image4}/>
                            </div>
                            <div className="voteresult__cnt">{re4}</div>
                        </div>

                    }
                </div>
            </div>
        </div>
    );
}

export default VoteResult;
