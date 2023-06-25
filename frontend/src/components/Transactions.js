import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react"

const TransactionItem = ({transaction, deleteTransaction}) => {
    return (
        <tr>
            <td>
                <Link to={`/transactions/${transaction.guid}`}>{transaction.guid}</Link>
            </td>
            <td>
                {transaction.amount}$
            </td>
            <td>
                {transaction.reason}
            </td>
            <td>
                {transaction.user}
            </td>
            <td>
                <Link className='button-link' to={`/transactions/update/${transaction.guid}/`}>Update</Link>
            </td>
            <td>
                <button className='app-button' type='button' onClick={() => deleteTransaction(transaction.guid)}>Delete</button>
            </td>
        </tr>
    )
}

const TransactionList = ({transactions, auth, deleteTransaction}) => {
    const [value, setValue] = useState('');

    return (
        <div>
            {auth.isLogin &&
                <div className='projects__bar padding-site'>
                    <Link className='button-link ' to='/transactions/create'>Create</Link>
                </div>
            }
            <table className='bordered'>
                <caption>Table with Transactions</caption>
                <tbody>
                    <tr>
                        <th>
                            Transaction number
                        </th>
                        <th>
                            Amount
                        </th>
                        <th>
                            Reason
                        </th>
                        <th>
                            User
                        </th>
                        <th>
                            Change
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </tbody>
                {transactions.map((transaction) => <TransactionItem transaction={transaction}
                                                                    deleteTransaction={deleteTransaction}/>)}
            </table>
        </div>
    )
}

export default TransactionList;
