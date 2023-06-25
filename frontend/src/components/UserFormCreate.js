import React from "react";
import {
    validateForm,
    validateUsers
} from "./Validators";

class UserFormCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            isStaff: false,
            formErrors: {username: '', firstName: '', lastName: '', email: '',
                password: '', password2: ''}
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        let fieldsFormsErrors = validateUsers(this.state.formErrors,
            this.props.users, name, value, this.state.password);
        this.setState({fieldsFormsErrors, [name]: value});
        this.setState({[name]: value});
    }

    handleCheckBox(event) {
        if (event.target.checked) {
            this.setState({
                [event.target.name]: true
            });
        } else {
            this.setState({
                [event.target.name]: false
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (validateForm(this.state)) {
            this.props.createUser(this.state.username, this.state.firstName,
            this.state.lastName, this.state.email, this.state.password,
            this.state.isStaff);
        }
    }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">
                        <legend className="create-form-legend">Create User</legend>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="username">Username:</label>
                            <input className="create-form-input" type="text" id="username" name="username" placeholder="Username"
                                   value={this.state.username} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.username.length > 0 && (
                                <p className="errorMessage">{formErrors.username}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="firstName">First name:</label>
                            <input className="create-form-input" type="text" id="firstName" name="firstName"
                                   placeholder="First name"
                                   value={this.state.firstName} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.firstName.length > 0 && (
                                <p className="errorMessage">{formErrors.firstName}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="lastName">Last name:</label>
                            <input className="create-form-input" type="text" id="lastName" name="lastName"
                                   placeholder="Last name"
                                   value={this.state.lastName} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.lastName.length > 0 && (
                                <p className="errorMessage">{formErrors.lastName}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="email">E-mail:</label>
                            <input className="create-form-input" type="email" id="email" name="email"
                                   placeholder="E-mail"
                                   value={this.state.email} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.email.length > 0 && (
                                <p className="errorMessage">{formErrors.email}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="password">Password:</label>
                            <input className="create-form-input" type="password" id="password" name="password"
                                   placeholder="Password"
                                   value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.password.length > 0 && (
                                <p className="errorMessage">{formErrors.password}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="password2">Repeat the password:</label>
                            <input className="create-form-input" type="password" id="password2" name="password2"
                                   placeholder="Repeat the password"
                                   value={this.state.password2} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.password2.length > 0 && (
                                <p className="errorMessage">{formErrors.password2}</p>
                            )}
                        </div>
                        <div className="create-form-div form-checkbox">
                            <label className="create-form-label" htmlFor="isStaff">Is staff:</label>
                            <input className="create-form" type="checkbox" id="isStaff" name="isStaff"
                                   placeholder="Is staff"
                                   value={this.state.isStaff} onChange={(event) => this.handleCheckBox(event)}/>
                        </div>
                        <input type="submit" className="app-button" disabled={!validateForm(this.state)} value="Save"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default UserFormCreate;
