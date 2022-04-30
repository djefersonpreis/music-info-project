import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Grid, Button, Container, TextField } from '@material-ui/core';


function Login() {

    const history = useHistory()

    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState("");

    function efetuaLogin() {
        var validaOperacao = true;

        setEmailError("");
        setPasswordError("");

        if (email === "" || email == null) {
            validaOperacao = false;
            setEmailError("Necessário informar o Email do Usuário.");
        }

        if (password === "" || password == null) {
            validaOperacao = false;
            setPasswordError("Necessário informar uma senha para o Usuário.");
        }

        if (validaOperacao) {
            history.push('/home');
        }
    }

    return (
        <Fragment>
            <Container>
                <div class="text-center col-4 offset-4">
                    <form className="form-signin text-white">
                        <h1 className='text-center'> MUSIC INFO </h1>
                        <hr />
                        <TextField
                            fullWidth
                            className="mt-3"
                            id="email"
                            label="Email"
                            variant="standard"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            helperText={emailError}
                            error={(emailError !== "")}
                        />

                        <TextField
                            fullWidth
                            className="mt-3"
                            id="password"
                            label="Senha"
                            variant="standard"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            helperText={passwordError}
                            error={(passwordError !== "")}
                        />


                        <br />
                        <Button
                            fullWidth
                            variant="outlined"
                            color="inherit"
                            className="mt-3 text-white"
                            onClick={efetuaLogin}>
                            Login
                        </Button>
                        <p className="mt-5 mb-3 text-white">© 2022-2022</p>
                    </form>
                </div>
            </Container>
        </Fragment>
    );
}

export default Login;