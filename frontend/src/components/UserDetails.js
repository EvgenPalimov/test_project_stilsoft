import React from "react";
import {useParams} from "react-router-dom";

const UserDetailsList = ({users}) => {
    let {id} = useParams();
    let filteredUsers = users.filter(item => item.id === parseInt(id));

    return (
        filteredUsers.map((item) =>
            <div className="project-details padding-site">
                <h1 className="project-details__name">{item.username}</h1>
                <span>First name:</span>
                <h1 className="project-details">{item.firstName}</h1>
                <span>Last name:</span>
                <h1 className="project-details">{item.lastName}</h1>
                <span>E-mail:</span>
                <p className="project-details">{item.email}</p>
                {item.isStaff ? <span>Site staff</span> : <span></span>}

            </div>
        )
    )
}

export default UserDetailsList;
