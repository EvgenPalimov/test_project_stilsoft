import React from "react";
import {
    validateForm,
    validateTransactions
} from "./Validators";

class TransactionFormCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            reason: '',
            formErrors: {amount: '', reason: ''}
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        let fieldsFormsErrors = validateTransactions(this.state.formErrors,
            this.props.projects, name, value);
        this.setState({fieldsFormsErrors, [name]: value});
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (validateForm(this.state)) {
            this.props.createTransaction(this.state.amount, this.state.reason);
        }
    }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="create-form">
                        <fieldset className="create-form">
                            <legend className="create-form-legend">Create Transaction</legend>
                            <div className="create-form-div">
                                <label className="create-form-label" htmlFor="amount">Amount:</label>
                                <input className="create-form-input" type="number" id="amount" name="amount"
                                       placeholder="Amount"
                                       value={this.state.amount} onChange={(event) => this.handleChange(event)}/>
                                {formErrors.amount.length > 0 && (
                                    <p className="errorMessage">{formErrors.amount}</p>
                                )}
                            </div>
                            <div className="create-form-div">
                                <label className="create-form-label" htmlFor="reason">Reason:</label>
                                <select name="reason" id="reason" className="create-form-input"
                                        value={this.state.Reason} onChange={(event) => this.handleChange(event)}>
                                    <option value=""></option>
                                    <option value="rec" >Receipt</option>
                                    <option value="wri" >Write-downs</option>
                                </select>
                                {formErrors.reason.length > 0 && (
                                    <p className="errorMessage">{formErrors.reason}</p>
                                )}
                                {/*<select id="reason" name="reason" value={this.state.repository} onChange={(event) => this.handleChange(event)}/>*/}
                                {/*  <option value="rec" selected>Receipt</option>*/}
                                {/*  <option value="wri" >Write-downs</option>*/}
                                {/*</select>*/}
                                {/*{formErrors.amount.length > 0 && (*/}
                                {/*        <p className="errorMessage">{formErrors.amount}</p>*/}
                                {/*    )}*/}
                            </div>
                            {/*        <p className="errorMessage">{formErrors.repository}</p>
                            {/*    <input className="create-form-input" type="text" id="reason" name="reason"*/}
                            {/*           placeholder="Reason"*/}
                            {/*           value={this.state.repository} onChange={(event) => this.handleChange(event)}/>*/}
                            {/*    {formErrors.repository.length > 0 && (*/}
                            {/*        <p className="errorMessage">{formErrors.repository}</p>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                            <input type="submit" className="app-button" disabled={!validateForm(this.state)} value="Save"/>

                        </fieldset>
                    </div>
                </form>
            </div>
        );
    }
}

export default TransactionFormCreate;
