import React from 'react';

function User({user}){
    return (
        <div>
            <b>{users.name}</b> <span>({user.id})</span>
        </div>
    );
}

function UserList() {
    const users = [
        {
            name: 'jisu',
            id: 'sjshappy110',
            password: '1105',
            birth_year: 2000,
            birth_month: 11,
            birth_day: 5,
            sex: 2
        },
        {
            name: 'dami',
            id: 'tlsekal0307',
            password: '0307',
            birth_year: 2005,
            birth_month: 3,
            birth_day: 7,
            sex: 2
        }
    ];

    return(
        <div>
            <User user={users[0]}/>
            <User user={users[1]}/>
        </div>
    );
}

export default UserList;