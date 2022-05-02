import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);

    const [name, setName] = useState();
    const [nameError, setnameError] = useState("");

    const [birthDate, setBirthDate] = useState();
    const [birthDateError, setBirthDateError] = useState("");

    const [imageUrl, setImageUrl] = useState();
    const [imageUrlError, setImageUrlError] = useState("");

    useEffect(() => {
        if (props.singer !== "") {
            defineAlteracao(props.singer);
        }
    }, []);

    function defineAlteracao(singer) {
        setId(singer.id);
        setName(singer.name);
        setBirthDate(singer.birthDate);
        setImageUrl(singer.imageUrl);
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnameError("");
        setBirthDateError("");
        setImageUrlError("");

        if (name === "" || name == null) {
            validaOperacao = false;
            setnameError("Necessário informar o Nome do cantor.");
        }


        if (birthDate === "" || birthDate == null) {
            validaOperacao = false;
            setBirthDateError("Necessário informar a Data de Nasciemnto do cantor.");
        }


        if (imageUrl === "" || imageUrl == null) {
            validaOperacao = false;
            setImageUrlError("Necessário informar uma URL de Imagem do cantor.");
        }


        if (validaOperacao) {
            console.log("Informações Válidas. Iniciando processo de cadastro...");

            const headers = {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            }

            var data = {
                name: name,
                birth_date: birthDate,
                image_url: imageUrl
            };

            if (id !== 0) {
                api.patch(`singer/${id}`, data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso()
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Alterar registro do cantor. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            } else {
                console.log(data);
                api.post("singer", data, headers)
                    .then(response => {
                        if (response.status === 201) {
                            props.cadastroSucesso();
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Cadastrar Cantor. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
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
                        label="Nome do Cantor"
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
                        id="birthDate"
                        label="Data de Nascimento do cantor (Ano)"
                        variant="outlined"
                        type="text"
                        value={birthDate}
                        onChange={e => setBirthDate(e.target.value)}
                        helperText={birthDateError}
                        error={(birthDateError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="imageUrl"
                        label="URL de Imagem do Cantor"
                        variant="outlined"
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        helperText={imageUrlError}
                        error={(imageUrlError !== "")}
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
