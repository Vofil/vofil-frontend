import {React, useState} from "react"
import "../VotePage.css"

// 일반투표
function VoteNormal({voteID}) {

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
    imageSet.push({i1: 3, i2: ""})
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
                    투표 방식: 일반투표
                </div>
                <div className="createvote__content2">
                    {imageSet.map(x =>
                        (x.i2 != "") &&
                        <label key={x.i1} className="createvote__content__entity">
                            <input
                                type="radio"
                                className="radio__hidden"
                                value={x.i1}
                                checked={numOfPic === `${x.i1}`}
                                onChange={onSelectPic}
                            />
                            <h1>{x.i2}</h1>
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

export default VoteNormal;

//<input type="radio" value= checked= onChange={}>
//<img src={x.i2}></img>