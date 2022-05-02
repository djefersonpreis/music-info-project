import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);

    const [name, setName] = useState();
    const [nameError, setnameError] = useState("");

    const [releaseDate, setReleaseDate] = useState();
    const [releaseDateError, setReleaseDateError] = useState("");

    const [imageUrl, setImageUrl] = useState();
    const [imageUrlError, setImageUrlError] = useState("");

    const [singerId, setSingerId] = useState();
    const [singerIdError, setSingerIdError] = useState("");

    const [bandId, setBandId] = useState();
    const [bandIdError, setBandIdError] = useState("");

    useEffect(() => {
        if (props.album !== "") {
            defineAlteracao(props.album);
        }
    }, []);

    function defineAlteracao(album) {
        setId(album.id);
        setName(album.name);
        setReleaseDate(album.releaseDate);
        setImageUrl(album.imageUrl);
        setSingerId(album.singerId);
        setBandId(album.bandId);
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnameError("");
        setReleaseDateError("");
        setImageUrlError("");
        setSingerIdError("");
        setBandIdError("");

        if (name === "" || name == null) {
            validaOperacao = false;
            setnameError("Necessário informar o Nome do album.");
        }


        if (releaseDate === "" || releaseDate == null) {
            validaOperacao = false;
            setReleaseDateError("Necessário informar a Data de Lançamento do Album.");
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
                release_date: releaseDate,
                image_url: imageUrl,
                singerId: singerId,
                bandId: bandId,
            };

            if (id !== 0) {
                api.patch(`album/${id}`, data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso()
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Alterar registro do album. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            } else {
                console.log(data);
                api.post("album", data, headers)
                    .then(response => {
                        if (response.status === 201) {
                            props.cadastroSucesso();
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Cadastrar Album. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
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
                        label="Nome do Album"
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
                        id="releaseDate"
                        label="Data de Lançamento do Album (Ano)"
                        variant="outlined"
                        type="text"
                        value={releaseDate}
                        onChange={e => setReleaseDate(e.target.value)}
                        helperText={releaseDateError}
                        error={(releaseDateError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="imageUrl"
                        label="URL de Imagem do Album"
                        variant="outlined"
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        helperText={imageUrlError}
                        error={(imageUrlError !== "")}
                    />
                </Grid>
                {/*  
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="singerId"
                        label="Cantor do Album"
                        variant="outlined"
                        type="number"
                        value={singerId}
                        onChange={e => setSingerId(e.target.value)}
                        helperText={singerIdError}
                        error={(singerIdError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="bandId"
                        label="Banda do Album"
                        variant="outlined"
                        type="number"
                        value={bandId}
                        onChange={e => setBandId(e.target.value)}
                        helperText={bandIdError}
                        error={(bandIdError !== "")}
                    />
                </Grid>
                */}

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
