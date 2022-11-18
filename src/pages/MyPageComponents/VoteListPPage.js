import {React, useState, useEffect} from 'react';
import axios from 'axios';

function VoteListPPage() {
    let [voterData, setVoterData] = useState([])

    const fetchVotePDataLoad = () => {
        axios
        .get("api/mypage/voter", { params:
            {
                //user_id: sessionStorage.getItem("loginID")
                user_id: "jisu"
            }
        })
        .then((response) => {
            setVoterData(response.data)

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVotePDataLoad();
    }, []);

    return (
        <div>
            <h2>내가 만든 투표1</h2>
            { voterData.map( x => (
                <div>
                    <div>{x.vote_id}</div>
                    <div>{x.title}</div>
                    <div>{x.re1}</div>
                </div>
            ))}
        </div>
    );
}

export default VoteListPPage;