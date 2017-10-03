import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    renderField (field) {
        return (
            <fieldset className="form-group">
                <label>{field.label} :</label>
                <input {...field.input} type={field.type} className="form-control"/>
                {field.meta.touched && field.meta.error &&
                <span className="error">{field.meta.error}</span>}
            </fieldset>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form>
                <Field name="email" component={this.renderField} type="text" label="Email" className="form-control" />
                <Field name="password" component={this.renderField} type="password" label="Password" className="form-control" />
                <Field name="confirmPassword" component={this.renderField} type="password" label="Confirm password" className="form-control" />
                <button action="submit" className="btn btn-primary">Sign up !</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};
    if(formProps.password !== formProps.confirmPassword) {
        errors.password = 'Passwords must match !';
    }
    return errors;
}

export default reduxForm({
    form: 'signup',
    validate
})(Signup);
