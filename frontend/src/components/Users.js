import React from "react";
import {Link} from "react-router-dom";

const UserItem = ({user, deleteUser, staff}) => {
    return (
        <tr>
            <td>
                <Link to={`/user/${user.id}`}>{user.username}</Link>
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.balance}$
            </td>
            {staff &&
                <td>
                    <Link className='button-link' to={`/user/update/${user.id}/`}>Update</Link>
                </td>
            }
            {staff &&
                <td>
                    <button className='app-button' type='button'
                            onClick={() => deleteUser(user.id)}>Delete
                    </button>
                </td>
            }
        </tr>
    )
}

const UserList = ({users, deleteUser, staff}) => {
    return (
        <div>
            {staff &&
                <div className='projects__bar padding-site'>
                    <Link className='button-link ' to='/users/create'>Create</Link>
                </div>
            }
            <table className='bordered'>
                <caption>Table with users</caption>
                <tr>
                    <th>
                        User name
                    </th>
                    <th>
                        First name
                    </th>
                    <th>
                        Last name
                    </th>
                    <th>
                        E-mail
                    </th>
                    <th>
                        Balance
                    </th>
                    {staff &&
                        <th>
                            Update
                        </th>
                    }
                    {staff &&
                        <th>
                            Delete
                        </th>
                    }
                </tr>
                {users.map((user) => <UserItem user={user}
                                               deleteUser={deleteUser}
                                               staff={staff}/>)}
            </table>
        </div>
    )
}

export default UserList;
