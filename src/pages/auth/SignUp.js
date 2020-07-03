import React from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { spacing } from "@material-ui/system";
import {
  FormControl,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from 'axios'

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

class MyForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        password: '',
        repeatPassword: '',
        email: '',
        username: '',
        city: '',
        }
    }

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleChange1 = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = () => {
        console.log(this.state)
        axios
            .post('http://162.214.74.80:5000/user/add', this.state)
            .then(response => {
                console.log(response)
                if(response.data.status == 200) {
                    alert(response.data.message)
                }
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })
    }

    render() {
        const { user } = this.state;

        return (
        <Wrapper>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Sing Up
          </Typography>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    placeholder="Username *"
                    onChange={this.handleChange1("username")}
                    name="username"
                    value={this.state.username}
                    validators={['required']}
                    errorMessages={['Please enter username']}
                    class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth"
                />
                <TextValidator
                    placeholder="Email *"
                    onChange={this.handleChange1("email")}
                    name="email"
                    type="text"
                    value={this.state.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['Please enter email address', 'Please enter valid email address']}
                    class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth"
                />
                <TextValidator
                    placeholder="Password *"
                    onChange={this.handleChange1("password")}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['Please enter the password']}
                    value={this.state.password}
                    class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth"
                />
                <TextValidator
                    placeholder="Repeat password *"
                    onChange={this.handleChange1("repeatPassword")}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'Please enter the confirm password']}
                    value={this.state.repeatPassword}
                    class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth"
                />
                <TextValidator
                    placeholder="City *"
                    onChange={this.handleChange1("city")}
                    name="city"
                    type="text"
                    value={this.state.city}
                    validators={['required']}
                    errorMessages={['Please enter city']}
                    class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth"
                />
                <Button
                fullWidth
                variant="contained"
                color="primary"
                mt={2}
                type="submit">Submit</Button>
            </ValidatorForm>
          </Wrapper>
        );
    }
}
export default MyForm;