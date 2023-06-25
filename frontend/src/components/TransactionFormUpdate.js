import React from "react";
import {validateForm, validateTransactions} from "./Validators";

class TransactionFormUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guid: '',
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
            this.props.updateTransaction(this.state.guid, this.state.amount,
                this.state.reason);
        }
    }

    componentDidMount() {
        const users = []
        const item = this.props.transactions.find(item => item.guid ===
            window.location.pathname.split('/').reverse()[1]);
        this.setState({guid: item.guid, amount: item.amount,
            reason: item.reason});
    }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">
                        <legend className="create-form-legend">Update Transaction</legend>
                        <div className="create-form-div">
                            <div className="create-form-div">
                            <label className="create-form-label" htmlFor="id">ID transaction</label>
                            <input className="create-form-input" type="text" id="id" name="id"
                                   value={this.state.guid} readOnly={true}/>
                        </div>
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="amount">Amount:</label>
                            <input className="create-form-input" type="number" id="amount" name="amount" placeholder="Amount"
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
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="user">user:</label>
                            <input className="create-form-input" type="text" id="user" name="user"
                                   value={this.props.username} readOnly={true}/>
                        </div>
                        <input type="submit" className="app-button" value="Save"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default TransactionFormUpdate;
