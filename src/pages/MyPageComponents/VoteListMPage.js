import {React, useState, useEffect} from 'react';
import axios from 'axios';

function VoteListMPage() {

    let [voteData, setVoteData] = useState([])

    const fetchVoteMDataLoad = () => {
        axios
        .get("api/mypage/vote", { params:
            {
                user_id: sessionStorage.getItem("loginID")
            }
        })
        .then((response) => {
            setVoteData(response.data)

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchVoteMDataLoad();
    }, []);

    return (
        <div>
            <h2>내가 만든 투표1</h2>
            { voteData.map( x => (
                <div>
                    <div>{x.vote_id}</div>
                    <div>{x.title}</div>
                    <div>{x.re1}</div>
                </div>
            ))}
        </div>
    );
}

export default VoteListMPage;