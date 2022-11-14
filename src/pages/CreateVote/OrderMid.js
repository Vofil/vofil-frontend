import React, {useState, useEffect, useContext, useReducer} from 'react';
import {Link, Route, Switch, useNavigate} from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import EditPicturesPage from "../EditPicturesPage";
import axios from 'axios';
import "./OrderMid.css";

/* ---------------------
투표 생성 선택지 배열 모음
----------------------*/
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

const _gender = [ {g1: "남자", g2: 3}, {g1: "여자", g2: 4}, {g1: "모든 성별", g2: 5}]
const _age = [ {a1: "10대", a2: 1}, {a1: "20대", a2: 2}, {a1: "30대", a2: 3}, {a1: "40대", a2: 4}, {a1: "50대", a2: 5} ]
const _kind = [ {k1: "일반투표", k2: 0}, {k1: "태그투표", k2: 1} ]
const _category = [ {c1: "카카오톡 프로필 사진" , c2: "카톡프사"},
    {c1: "카카오톡 배경 사진" , c2: "카톡배사"},
    {c1: "인스타그램 프로필 사진" , c2: "인스타프사"},
    {c1: "인스타그램 게시물" , c2: "인스타게시물"},
    {c1: "트위터 프로필 사진" , c2: "트위터프사"},
    {c1: "트위터 헤더" , c2: "트위터헤더"}]
const _pic_cnt = [{p1: "2개", p2: 2}, {p1: "3개", p2: 3}, {p1: "4개", p2: 4}]
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


function OrderMid() {

    const [user_id, setUserID] = useState(1);
    const [vote_id, setVoteID] = useState(null);

    const [feeling, setFeeling] = useState("");
    const [title_content, setTitleContent] = useState("");
    const [gender, setGender] = useState(0);
    const [age, setAge] = useState(0);
    const [kind, setKind] = useState(0);
    const [ending_point, setEndingPoint] = useState(0);
    const [categorying, setCategorying] = useState("");
    const [pic_cnt, setPicCnt] = useState(0);
    const [taging, setTaging] = useState("");

    const [taging_visible, setTagingVisible] = useState("false");


    const [disable, setDisable] = useState(true);
    //페이지 이동 함수
    const navigate = useNavigate();

    const onFeelingHandler = (event) => {
        console.log(event.currentTarget.value)
        setFeeling(event.currentTarget.value)
        titleContent(event.currentTarget.value)
    }

    const titleContent = (t) =>{
        console.log(t)
        _title.map(function(element) {
            if (`${element.t2}` === t) {
                setTitleContent(`${element.t1}`)
            }
        });
    }

    const onGenderHandler = (event) => {
        console.log(event.currentTarget.value)
        setGender(event.currentTarget.value)
    }

    const onAgeHandler = (event) => {
        console.log(event.currentTarget.value)
        setAge(event.currentTarget.value)
    }

    const onKindHandler = (event) => {
        console.log(event.currentTarget.value)
        setKind(event.currentTarget.value)
    }

    const onEndingPointHandler = (event) => {
        numberCheck(event.currentTarget.value)
    }

    const numberCheck = (n) => {
        let num = n || 0
        if (!isFinite(num)) return
        num = num.toString()

        if(num !== '0' && !num.includes('.')) {
            num = num.replace(/^0+/, '')
        }

        console.log(num)
        setEndingPoint(num)
    }

    const onCategoryingHandler = (event) => {
        console.log(event.currentTarget.value)
        setCategorying(event.currentTarget.value)
    }

    const onPicCntHandler = (event) => {
        console.log(event.currentTarget.value)
        setPicCnt(event.currentTarget.value)
    }

    // 태그 선택
    const onTagingHandler = (event) => {
        console.log(event.currentTarget.value)
        setTaging(event.currentTarget.value)
    }

    //중간 저장
    const onSubmitHandler = (event) => {
        event.preventDefault()
        axios
        .post("/api/votes", {
            user_id : "hyomin",
            id : null,
            gender : gender,
            age : age,
            ending_point : ending_point,
            kind : kind,
            pic_cnt : pic_cnt,
            result1 : null,
            result2 : null,
            result3 : null,
            result4 : null,
            categorying : categorying,
            feeling : feeling,
            taging : taging
        })
        .then((response) => {
            console.log("응답 받은 id: " + response.data)
            setVoteID(response.data)
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })

        setDisable(false)

        return alert('등록되었습니다~^*^')
    }

    // 다음 페이지로 넘어갑니다
    const onSubmitHandler2 = (event) => {
        console.log("투표 아이디 받아온거: " + vote_id)

        // picture 객체 생성하기
        console.log("픽처 객체가 생성되었습니다")
        axios
        .post("/api/pictures", {
            id: vote_id,
            re1: null,
            re2: null,
            re3: null,
            re4: null,
        })
        .then((response) => {
            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });

        // 다음 페이지 넘어가기
        navigate("/create_vote/orderMid2", {
            state: {
                id: vote_id,
                pic_cnt: pic_cnt
            }
        });
    };

    return(
        <div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        1. 제목의 키워드를 골라주세요!
                    </div>
                    <div className="createvote__small__head">
                        키워드를 골라주시면 투표 제목이 자동 생성됩니다.
                    </div>
                    <div className="create__print__title">{title_content}</div>
                    <div className="createvote__radio__container">
                        {_title.map(x =>
                            <label key={x.t1}>
                                <input
                                    type="radio"
                                    value={x.t2}
                                    checked={feeling === `${x.t2}`}
                                    onChange={onFeelingHandler}
                                />
                                {x.t2}
                            </label>
                        )}
                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        2. 어떤 성별로부터 투표 받고 싶나요?
                    </div>
                    <div className="createvote__radio__container">
                        {_gender.map(x =>
                            <label key={x.g1}>
                                <input
                                    type="radio"
                                    value={x.g2}
                                    checked={gender === `${x.g2}`}
                                    onChange={onGenderHandler}
                                />
                                {x.g1}
                            </label>
                        )}
                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        3. 어떤 나이대로부터 투표 받고 싶나요?
                    </div>
                    <div className="createvote__radio__container">
                        {_age.map(x =>
                            <label key={x.a1}>
                                <input
                                    type="radio"
                                    value={x.a2}
                                    checked={age === `${x.a2}`}
                                    onChange={onAgeHandler}
                                />
                                {x.a1}
                            </label>
                         )}
                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        4. 어떤 방식으로 투표를 진행할까요?
                    </div>
                    <div className="createvote__radio__container">
                        {_kind.map(x =>
                            <label key={x.k1}>
                                <input
                                    type="radio"
                                    value={x.k2}
                                    checked={kind === `${x.k2}`}
                                    onChange={onKindHandler}
                                />
                                {x.k1}
                            </label>
                        )}
                    </div>
                </div>
            </div>
            { kind == 1 &&
                <div className="createvote">
                    <div className="createvote__center">
                        <div className="createvote__mid__head">
                            4-1. 태그투표를 선택하셨군요! 내 사진이 어떤 태그를 받았으면 좋겠나요?
                        </div>
                        <div className="createvote__radio__container">
                            {_taging.map(x =>
                                <label key={x.t2}>
                                    <input
                                        type="radio"
                                        value={x.t1}
                                        checked={taging === `${x.t1}`}
                                        onChange={onTagingHandler}
                                    />
                                    {x.t1}
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            }
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        5. 몇 개의 투표를 받으면 투표를 종료할까요?
                    </div>
                    <div className="createvote__content">
                        <input
                            name="endingPoint"
                            type="range"
                            min="10"
                            max="100"
                            value={ending_point}
                            onChange={onEndingPointHandler}
                        />
                        {ending_point}
                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        6. 어떤 용도로 사진을 이용할 예정인가요?
                    </div>
                    <div className="createvote__radio__container">
                        {_category.map(x =>
                            <label key={x.c1}>
                                <input
                                    type="radio"
                                    value={x.c2}
                                    checked={categorying === `${x.c2}`}
                                    onChange={onCategoryingHandler}
                                />
                                {x.c1}
                            </label>
                        )}
                    </div>
                </div>
            </div>
            <div className="createvote">
                <div className="createvote__center">
                    <div className="createvote__mid__head">
                        7. 몇개의 사진을 등록할까요?
                    </div>
                    <div className="createvote__radio__container">
                        {_pic_cnt.map(x =>
                            <label key={x.p1}>
                                <input
                                    type="radio"
                                    value={x.p2}
                                    checked={pic_cnt === `${x.p2}`}
                                    onChange={onPicCntHandler}
                                />
                                {x.p1}
                            </label>
                        )}
                    </div>
                </div>
            </div>
            <div className="createvote__button__container">
                <button onClick={onSubmitHandler} className="createvote__button">중간 저장</button>
                <button onClick={onSubmitHandler2} disabled={disable} className="createvote__button">다음 단계</button>
            </div>
        </div>
    );
}

export default OrderMid;