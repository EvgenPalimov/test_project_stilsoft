import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/Style.css';
import UserList from "./components/Users";
import TransactionList from "./components/Transactions";
import TransactionFormCreate from "./components/TransactionFormCreate";
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import Menu from "./components/Menu";
import LoginForm from "./components/Auth"
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import TransactionDetailsList from "./components/TransactionDetails";
import TransactionFormUpdate from "./components/TransactionFormUpdate";
import UserFormUpdate from "./components/UserFormUpdate";
import UserFormCreate from "./components/UserFormCreate";
import UserDetailsList from "./components/UserDetails";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menuItems': [
                {name: 'Users', href: '/users'},
                {name: 'Transactions', href: '/transactions'},
            ],
            'users': [],
            'transactions': [],
            'balances': [],
            'auth': {username: '', isLogin: false},
            'staff': false
        };
    }

    createTransaction(amount, reason) {
        const headers = this.get_headers();
        const data = {amount:amount, reason:reason, user:this.state.auth.username};
        axios.post(get_url(`transactions/`), data, {headers}).then(
            response => {
                window.location.href = '/transactions/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    updateTransaction(id, amount, reason) {
        const headers = this.get_headers();
        const data = {guid: id, amount: amount, reason: reason, user: this.state.auth.username};
        axios.put(get_url(`transactions/${id}/`), data, {headers}).then(
            response => {
                window.location.href = '/transactions/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    deleteTransaction(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`transactions/${id}`), {headers}).then(response => {
            this.loadDataTransactions(headers);
        }).catch(error => {
            console.log(error);
        })
    }

    createUser(username, firstName, lastName, email, password, isStaff) {
        const headers = this.get_headers();
        const data = {username: username, first_name: firstName,
            last_name: lastName, email: email, password: password,
            is_staff: isStaff};
        axios.post(get_url(`users/`), data, {headers}).then(
            response => {
                window.location.href = '/users/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    updateUser(id, username, firstName, lastName, email, balance, isStaff) {
        const headers = this.get_headers();
        const data = {id: id, username: username, first_name: firstName,
            last_name: lastName, email: email, balance: balance, is_staff: isStaff};
        axios.put(get_url(`users/${id}/`), data,{headers}).then(
            response => {
                window.location.href = '/users/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    deleteUser(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`users/${id}`), {headers})
            .then(response => {
                this.loadDataUsers(headers)
        }).catch(error => {
            console.log(error);
        })
    }

    login(username, password) {
        axios.post(get_url('token/'), {username: username, password: password})
            .then(response => {
                localStorage.setItem('login', username);
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                this.setState({'auth': {username: username, isLogin: true}});
                this.loadData();
            }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль');
            } else {
                console.log(error);
            }
        })
    }

    logout() {
        localStorage.setItem('login', '');
        localStorage.setItem('access', '');
        localStorage.setItem('refresh', '');
        this.setState({'auth': {username: '', isLogin: false}});
        this.setState({'staff': false});
        window.location.href = '/login/';
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (this.state.auth.isLogin === true) {
            const token = localStorage.getItem('access');
            headers['Authorization'] = 'Bearer ' + token
        }
        return headers;
    }

    loadDataUsers(headers) {
        axios.get(get_url('users/'), {headers}).then(response => {
            this.setState({
                'users': response.data
            })
            this.CheckUserIsStaff();
        }).catch(error => {
            console.log(error);
        })
    }

    loadDataTransactions(headers) {
        axios.get(get_url('transactions/'), {headers}).then(response => {
            this.setState({
                'transactions': response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    CheckUserIsStaff() {
        if (this.state.users !== []) {
            const isStaff = !!(this.state.users.find(user => user.username === this.state.auth.username).isStaff);
            this.setState({'staff': isStaff});
        }
    }
    loadData() {
        const headers = this.get_headers();
        this.loadDataUsers(headers);
        this.loadDataTransactions(headers);
    }

    componentDidMount() {
        const username = localStorage.getItem('login');
        if ((username !== '') && (username != null)) {
            this.setState({'auth': {username: username, isLogin: true}}, () => this.loadData());
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="page">
                    <div className="content">
                        <Menu menuItems={this.state.menuItems} auth={this.state.auth} logout={() => this.logout()}/>
                        <Switch>
                            <Route exact path='/users' component={() => <UserList users={this.state.users}
                                                                                  deleteUser={(id) => this.deleteUser(id)}
                                                                                  staff={this.state.staff}/>}/>
                            <Route exact path='/user/:id/'> <UserDetailsList users={this.state.users}/> </Route>
                            <Route exact path='/user/update/:id/'
                                   component={() => <UserFormUpdate users={this.state.users} updateUser={(id, username, firstName, lastName, email, balance, isStaff) =>
                                                                        this.updateUser(id, username, firstName, lastName, email, balance, isStaff)}/>}/>
                            <Route exact path='/users/create'
                                   component={() => <UserFormCreate users={this.state.users} createUser={(username, firstName, lastName, email, password, isStaff) =>
                                                                           this.createUser(username, firstName, lastName, email, password, isStaff)}/>}/>
                            <Route exact path='/transactions/create'
                                   component={() => <TransactionFormCreate users={this.state.users} transactions={this.state.transactions}
                                                                       createTransaction={(amount, reason) =>
                                                                           this.createTransaction(amount, reason)}/>}/>
                            <Route exact path='/transactions'
                                   component={() => <TransactionList transactions={this.state.transactions} auth={this.state.auth}
                                                                 deleteTransaction={(id) => this.deleteTransaction(id)}/>}/>
                            <Route exact path='/transactions/update/:id/'
                                   component={() => <TransactionFormUpdate transactions={this.state.transactions}
                                                                       username={this.state.auth.username}
                                                                       updateTransaction={(id, amount, reason) =>
                                                                           this.updateTransaction(id, amount, reason)}/>}/>
                            <Route exact path='/transactions/:id/'> <TransactionDetailsList transactions={this.state.transactions}/> </Route>
                            <Route exact path='/login' component={() => <LoginForm
                                login={(username, password) => this.login(username, password)} auth={this.state.auth}/>}/>
                            <Redirect from="/" to="/transactions" />
                            <Route component={NotFound404}/>
                        </Switch>
                    </div>
                    <div className="footer">
                        <Footer/>
                    </div>
                </div>
            </BrowserRouter>
        );
    };
}

export default App;
