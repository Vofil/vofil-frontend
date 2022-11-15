import {React, useState} from "react"
import "../VotePage.css"

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

// 태그투표
function VoteTag({voteID}) {

    // api에서 받아온 image 모음
    var imageSet = []

    // api에서 뽑은 데이터를 저장.
    /*
        - 제목
        - 투표 방식
        - 등록된 사진
    */
    const [feeling, setFeeling] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    // Voter에 보내줄 데이터
    const [result1, setResult1] = useState(0);
    const [result2, setResult2] = useState(0);
    const [result3, setResult3] = useState(0);
    const [result4, setResult4] = useState(0);

    // 눌린 사진이 몇 번째 사진인가?
    const [numOfPic, setNumOfPic] = useState(-1);

    //테스트 케이스입니다. 지울것입니다.
    imageSet.push({i1: 1, i2: "img1"})
    imageSet.push({i1: 2, i2: "img2"})
    imageSet.push({i1: 3, i2: "img3"})
    imageSet.push({i1: 4, i2: ""})

    // 사진 정보를 자 가져다가 배열 생성 => 효민이한테 부탁하기
    /*axios
    .get("api/votes", { params:
        {
            vote_id = voteID
        }
    })
    .then((response) => {
        // 응답 받은 데이터로 image1~image4 셋팅하기
        setImage1()
        setImage2()
        setImage3()
        setImage4()

        // 응답 받은 데이터를 배열에 넣어주자
        imageSet.push({i1: 1, i2: })
        imageSet.push({i1: 2, i2: })
        imageSet.push({i1: 3, i2: })
        imageSet.push({i1: 4, i2: })

        // 응답 받은 데이터로 제목 셋팅하기
        setFeeling()

        console.log('well done!')
    })
    .catch((error) => {
        console.log('An error occurred:', error.response);
    })*/

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
        /*
        axios
        .post("/api/voters", {
            user_id: "유저 아이디",
            vote_id: voteID,
            result1: result1,
            result2: result2,
            result3: result3,
            result4: result4
        })
        */
    }


    return(
        <div className="createvote2">
            <div className="createvote__center2">
                <div className="createvote__big__head2">
                    투표 제목
                </div>
                <div className="createvote__small__head2">
                    투표 방식: 태그투표
                </div>
                <div className="createvote__content2">
                    {imageSet.map(x =>
                        (x.i2 != "") &&
                        <label key={x.i1} className="createvote__content__entity">
                            <h1>{x.i2}</h1>
                            { (x.i1 == 1) ?
                                <select value={result1} onChange={onResult1Handler}>
                                    <option value="default" disabled>태그를 선택해주세요</option>
                                    {_taging.map((tag) => (
                                        <option key={tag.t2} value={tag.t2}>
                                            {tag.t1}
                                        </option>
                                    ))}
                                </select>
                                : null
                            }
                            { (x.i1 == 2) ?
                                <select value={result2} onChange={onResult2Handler}>
                                    <option value="default" disabled>태그를 선택해주세요</option>
                                    {_taging.map((tag) => (
                                        <option key={tag.t2} value={tag.t2}>
                                            {tag.t1}
                                        </option>
                                    ))}
                                </select>
                                : null
                            }
                            { (x.i1 == 3) ?
                                <select value={result3} onChange={onResult3Handler}>
                                    <option value="default" disabled>태그를 선택해주세요</option>
                                    {_taging.map((tag) => (
                                        <option key={tag.t2} value={tag.t2}>
                                            {tag.t1}
                                        </option>
                                    ))}
                                </select>
                                : null
                            }
                            { (x.i1 == 4) ?
                                <select value={result4} onChange={onResult4Handler}>
                                    <option value="default" disabled>태그를 선택해주세요</option>
                                    {_taging.map((tag) => (
                                        <option key={tag.t2} value={tag.t2}>
                                            {tag.t1}
                                        </option>
                                    ))}
                                </select>
                                : null
                            }
                        </label>
                    )}
                </div>
                <div className="createvote__button__container2">
                    <button onClick={onSubmitHandler} className="createvote__button2">제출하기</button>
                </div>
            </div>
        </div>
    );
}

export default VoteTag;