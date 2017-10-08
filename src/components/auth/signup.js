import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
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

    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops !</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="email" component={this.renderField} type="text" label="Email" className="form-control" />
                <Field name="password" component={this.renderField} type="password" label="Password" className="form-control" />
                <Field name="confirmPassword" component={this.renderField} type="password" label="Confirm password" className="form-control" />
                {this.renderAlert()}
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

function mapStateToProps (state) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: 'signup',
    validate
})(
    connect(mapStateToProps, actions)(Signup)
);
