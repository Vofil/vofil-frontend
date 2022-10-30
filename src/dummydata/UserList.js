import React from 'react';

function User({user}){
    return (
        <div>
            <b>{user.name}</b> <span>({user.id})({user.password})({user.birth_year}-{user.birth_month}-{user.birth_day})</span>
        </div>
    );
}

function UserList({users}) {


    return(
        <div>
            {users.map(user => (
                <User user={user} key={user.id}/>
            ))}
        </div>
    );
}

export default UserList;