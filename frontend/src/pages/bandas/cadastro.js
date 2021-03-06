import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);

    const [name, setName] = useState();
    const [nameError, setnameError] = useState("");

    const [creationDate, setCreationDate] = useState();
    const [creationDateError, setCreationDateError] = useState("");

    const [imageUrl, setImageUrl] = useState();
    const [imageUrlError, setImageUrlError] = useState("");

    useEffect(() => {
        if (props.band !== "") {
            defineAlteracao(props.band);
        }
    }, []);

    function defineAlteracao(band) {
        setId(band.id);
        setName(band.name);
        setCreationDate(band.creationDate);
        setImageUrl(band.imageUrl);
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnameError("");
        setCreationDateError("");
        setImageUrlError("");

        if (name === "" || name == null) {
            validaOperacao = false;
            setnameError("Necessário informar o Nome da banda.");
        }


        if (creationDate === "" || creationDate == null) {
            validaOperacao = false;
            setCreationDateError("Necessário informar a Data de Criação da banda.");
        }


        if (imageUrl === "" || imageUrl == null) {
            validaOperacao = false;
            setImageUrlError("Necessário informar uma URL de Imagem da banda.");
        }


        if (validaOperacao) {
            console.log("Informações Válidas. Iniciando processo de cadastro...");

            const headers = {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            }

            var data = {
                name: name,
                creation_date: creationDate,
                image_url: imageUrl
            };

            if (id !== 0) {
                api.patch(`band/${id}`, data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso()
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Alterar registro da Banda. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            } else {
                console.log(data);
                api.post("band", data, headers)
                    .then(response => {
                        if (response.status === 201) {
                            props.cadastroSucesso();
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Cadastrar Banda. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
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
                        label="Nome da Banda"
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
                        id="creationDate"
                        label="Data de criação da Banda (Ano)"
                        variant="outlined"
                        type="text"
                        value={creationDate}
                        onChange={e => setCreationDate(e.target.value)}
                        helperText={creationDateError}
                        error={(creationDateError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="imageUrl"
                        label="URL de Imagem da Banda"
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
