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

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        password: '',
        username: '',
        }
    }

    handleChange1 = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = () => {
        console.log(this.state)
        axios
            .post('http://162.214.74.80:5000/user/login', this.state)
            .then(response => {
                console.log(response)
                if(response.data) {
                    if(response.status === 200 && response.data.username) {
                        alert("Login Status: Success");
                    } else {
                        alert("Login Status: Failed");
                    }
                } else {
                    alert("Login Status: Failed");
                }
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })
    }

    render() {
        return (
        <Wrapper>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Sing In
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
                    placeholder="Password *"
                    onChange={this.handleChange1("password")}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['Please enter the password']}
                    value={this.state.password}
                    class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth"
                />
                <Button
                fullWidth
                variant="contained"
                color="primary"
                mt={2}
                type="submit">Sign in</Button>
            </ValidatorForm>
          </Wrapper>
        );
    }
}
export default Login;