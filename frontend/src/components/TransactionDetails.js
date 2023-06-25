import React from "react";
import {useParams} from "react-router-dom";


const TransactionDetailsList = ({transactions}) => {
    let {id} = useParams();
    let filteredTransaction = transactions.filter(item => item.guid === id);

    return (
        filteredTransaction.map((item) =>
            <div className="project-details padding-site">
                <h1 className="project-details__name">{item.guid}</h1>
                <span>Amount:</span>
                <p className="project-details__description">{item.amount}</p>
                <span>Reason:</span>
                <p className="project-details__repository">{item.reason}</p>
                <span>List of users:</span>
                <ol className="project-details__list-user">
                    {item.users.map((user) => <li>{user}</li>)}
                </ol>
            </div>
        )
    )
}

export default TransactionDetailsList;
