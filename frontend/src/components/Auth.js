import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'login': '', 'password': ''}
    }

    handleChange(event) {
        this.setState({
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        this.props.login(this.state.login, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                {this.props.auth.isLogin ?
                    <div className="heading-top">
                        <h1 className="">Congratulations! You have successfully logged in.</h1>
                    </div>
                    :
                    <form className='page-auth__form' onSubmit={(event) => this.handleSubmit(event)}>
                        <fieldset className='page-auth__form-field'>
                            <legend className="page-auth__form-title">Form authentification</legend>
                            <input className="page-auth__form-input" type="text" name="login" placeholder="Login"
                                   value={this.state.login}
                                   onChange={(event) => this.handleChange(event)}/>
                            <input className="page-auth__form-input" type="password" name="password" placeholder="Password"
                                   value={this.state.password}
                                   onChange={(event) => this.handleChange(event)}/>
                            <button className="page-auth__form-submit" type="submit"> Login</button>
                        </fieldset>
                    </form>
                    }
            </div>
        );
    }
}

export default LoginForm;