import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);

    const [name, setName] = useState();
    const [nameError, setnameError] = useState("");

    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState("");

    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

    useEffect(() => {
        if (props.usuario !== "") {
            defineAlteracao(props.usuario);
        }
    }, []);

    function defineAlteracao(usuario) {
        setId(usuario.id);
        setName(usuario.name);
        setEmail(usuario.email);
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnameError("");
        setEmailError("");
        setPasswordError("");
        setPasswordConfirmationError("");

        if (name === "" || name == null) {
            validaOperacao = false;
            setnameError("Necessário informar o Nome do Usuário.");
        }

        if (email === "" || email == null) {
            validaOperacao = false;
            setEmailError("Necessário informar o Email do Usuário.");
        }

        if (password === "" || password == null) {
            validaOperacao = false;
            setPasswordError("Necessário informar uma senha para o Usuário.");
        }

        if (passwordConfirmation === "" || passwordConfirmation == null) {
            validaOperacao = false;
            setPasswordConfirmationError("Necessário Confirmar a senha do Usuário.");
        }

        if (password !== passwordConfirmation) {
            validaOperacao = false;
            setPasswordError("As senhas não conferem.");
        }


        if (validaOperacao) {
            console.log("Informações Válidas. Iniciando processo de cadastro...");

            const headers = {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            }

            var data = {
                name: name,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation
            };

            if (id !== 0) {
                api.patch(`users/${id}`, data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso()
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Alterar registro de Usuário. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            } else {
                console.log(data);
                api.post("users", data, headers)
                    .then(response => {
                        if (response.status === 201) {
                            props.cadastroSucesso();
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Cadastrar Usuário. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            }
        }
    }

    return (
        <Grid item xs={12}>
            <form>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="name"
                        label="Nome do Usuário"
                        variant="outlined"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        helperText={nameError}
                        error={(nameError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        helperText={emailError}
                        error={(emailError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="password"
                        label="Senha"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        helperText={passwordError}
                        error={(passwordError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="passwordConfirmation"
                        label="Confirmação de Senha"
                        variant="outlined"
                        type="password"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        helperText={passwordConfirmationError}
                        error={(passwordConfirmationError !== "")}
                    />
                </Grid>


                <Grid item xs={6} sm={4} md={3} lg={2} xl={1} className="mr-3 mb-3">
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className="m-3"
                        onClick={efetuaCadastro}>
                        {id !== 0 && "Alterar"}
                        {id === 0 && "Cadastrar"}
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
}

export default Cadastro;
