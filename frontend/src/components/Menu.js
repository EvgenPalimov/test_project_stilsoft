import React from "react";
import {Link, NavLink} from "react-router-dom";

const logo = require('./image/header-logo.png');

function MenuItem({name, href}) {
    return (
        <NavLink activeClassName='active' to={href}>{name}</NavLink>
    )
}

export default function Menu({menuItems, auth, logout}) {
    return (
        <nav>
            <ul className="page-header padding-site">
                <li className="page-header__logo">
                    <a href="/">
                        <img src={logo} alt="logo"/>
                    </a>
                    <span className="page-header__logo-txt">To Do App</span>
                </li>
                <li className="page-header__menu">
                          {menuItems.map((item) => <MenuItem name={item.name} href={item.href}/>)}
                </li>

                {auth.isLogin ?
                    <li className="page-header__icons-wrp">
                        <span className="page-header__icons-username">User - {auth.username}.</span>
                        <button onClick={logout} className="page-header__icons page-header__icons-logout">
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M725.333333 736 725.333333 597.333333 426.666667 597.333333 426.666667 426.666667 725.333333 426.666667 725.333333 288 949.333333 512 725.333333 736M554.666667 85.333333C601.6 85.333333 640 123.733333 640 170.666667L640 341.333333 554.666667 341.333333 554.666667 170.666667 170.666667 170.666667 170.666667 853.333333 554.666667 853.333333 554.666667 682.666667 640 682.666667 640 853.333333C640 900.266667 601.6 938.666667 554.666667 938.666667L170.666667 938.666667C123.733333 938.666667 85.333333 900.266667 85.333333 853.333333L85.333333 170.666667C85.333333 123.733333 123.733333 85.333333 170.666667 85.333333L554.666667 85.333333Z"/>
                            </svg>
                        </button>
                    </li> :
                    <li className="page-header__icons-wrp">
                         <NavLink to={"/login"} className="page-header__icons">
                            <svg
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M426.666667 736V597.333333H128v-170.666666h298.666667V288L650.666667 512 426.666667 736M341.333333 85.333333h384a85.333333 85.333333 0 0 1 85.333334 85.333334v682.666666a85.333333 85.333333 0 0 1-85.333334 85.333334H341.333333a85.333333 85.333333 0 0 1-85.333333-85.333334v-170.666666h85.333333v170.666666h384V170.666667H341.333333v170.666666H256V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334z"/>
                            </svg>
                        </NavLink>
                    </li>
                }
            </ul>
        </nav>
    )
}