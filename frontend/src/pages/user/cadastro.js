import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Card, CardContent, MenuItem, TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);
    const [isEdicaoCadastro, setIsEdicaoCadastro] = useState(0)

    const [name, setName] = useState();
    const [nameError, setnameError] = useState("");

    const [releaseDate, setReleaseDate] = useState();
    const [releaseDateError, setReleaseDateError] = useState("");

    const [imageUrl, setImageUrl] = useState();
    const [imageUrlError, setImageUrlError] = useState("");

    useEffect(() => {
        if (props.music !== "") {
            setIsEdicaoCadastro(1); // Se vier da interface de listagem, então bloqueia a edição do campo Documento
        }
    }, []);

    function defineAlteracao(music) {
        setId(music.id);
        setName(music.name);
        setReleaseDate(music.releaseDate);
        setImageUrl(music.releaseDate);
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnameError("");
        setReleaseDateError("");
        setImageUrlError("");

        if (name === "" || name == null) {
            validaOperacao = false;
            setnameError("Necessário informar o Nome da música.");
        }


        if (releaseDate === "" || releaseDate == null) {
            validaOperacao = false;
            setnameError("Necessário informar a Data de Release da música.");
        }


        if (imageUrl === "" || imageUrl == null) {
            validaOperacao = false;
            setnameError("Necessário informar uma URL de Imagem da música.");
        }


        if (validaOperacao) {
            console.log("Informações Válidas. Iniciando processo de cadastro...");

            const headers = {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            }

            var data = {
                name: name,
                release_date: releaseDate,
                image_url: imageUrl
            };

            if (id !== 0) {
                api.patch(`music/${id}`, data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso()
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Alterar registro de Música. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            } else {
                api.post("music", data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso();
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Cadastrar Música. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            }
        }
    }

    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <form>
                        <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                            <TextField
                                fullWidth
                                className="m-3"
                                id="id"
                                label="ID da Música"
                                variant="outlined"
                                value={id}
                                disabled={(true)}
                            />

                            <TextField
                                fullWidth
                                className="m-3"
                                id="name"
                                label="Nome da Música"
                                variant="outlined"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                helperText={nameError}
                                error={(nameError !== "")}
                            />

                            <TextField
                                fullWidth
                                className="m-3"
                                id="releaseDate"
                                label="Data de lançamento da Música (Ano)"
                                variant="outlined"
                                type="text"
                                value={releaseDate}
                                onChange={e => setReleaseDate(e.target.value)}
                                helperText={releaseDateError}
                                error={(releaseDateError !== "")}
                            />

                            <TextField
                                fullWidth
                                className="m-3"
                                id="imageUrl"
                                label="URL de Imagem da Música"
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
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Cadastro;
