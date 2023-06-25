import React from "react";
import {
    validateForm,
    validateUsers
} from "./Validators";

class UserFormUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            isStaff: false,
            formErrors: {username: '', firstName: '', lastName: '', email: '',
                submit: ''}
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        let fieldsFormsErrors = validateUsers(this.state.formErrors,
            this.props.users, name, value);
        this.setState({fieldsFormsErrors, [name]: value});
        this.setState({[name]: value});
    }

    handleCheckBox(event) {
        if (event.target.checked) {
            this.setState({
                [event.target.name]: true
            })
        } else {
            this.setState({
                [event.target.name]: false
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (validateForm(this.state)) {
            this.props.updateUser(this.state.id, this.state.username,
                this.state.firstName, this.state.lastName, this.state.email,
                this.state.isStaff);
        }
    }

    componentDidMount() {
        const item = this.props.users.find(item => item.id === parseInt(window.location.pathname.replace(/[^0-9]/g, "")))
        this.setState({id: item.id, username: item.username, firstName: item.firstName,
            lastName: item.lastName, email: item.email, isStaff: item.isStaff});
    }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">
                        <legend className="create-form-legend">Update User</legend>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="username">Username:</label>
                            <input className="create-form-input" type="text" id="username" name="username" placeholder="username"
                                   value={this.state.username} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.username.length > 0 && (
                                <p className="errorMessage">{formErrors.username}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="firstName">First name:</label>
                            <input className="create-form-input" type='text' id="firstName" name="firstName" placeholder="first name"
                                      value={this.state.firstName} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.firstName.length > 0 && (
                                <p className="errorMessage">{formErrors.firstName}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="lastName">Last name:</label>
                            <input className="create-form-input" type="text" id="lastName" name="lastName"
                                   placeholder="last name"
                                   value={this.state.lastName} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.lastName.length > 0 && (
                                <p className="errorMessage">{formErrors.lastName}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="email">E-mail:</label>
                            <input className="create-form-input" type="text" id="email" name="email"
                                   placeholder="email"
                                   value={this.state.email} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.email.length > 0 && (
                                <p className="errorMessage">{formErrors.email}</p>
                            )}
                        </div>
                        <div className="create-form-div form-checkbox">
                            <label className="create-form-label" htmlFor="isStaff">Is staff:</label>
                            <input className="create-form" type="checkbox" id="isStaff" name="isStaff"
                                   placeholder="Is staff" checked={!!this.state.isStaff}
                                   value={this.state.isStaff} onChange={(event) => this.handleCheckBox(event)}/>
                        </div>
                        <input type="submit" className="app-button" value="Save"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default UserFormUpdate;
