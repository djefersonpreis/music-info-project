import React, { useState, useEffect } from 'react';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);

    const [name, setName] = useState();
    const [nameError, setnameError] = useState("");

    const [releaseDate, setReleaseDate] = useState();
    const [releaseDateError, setReleaseDateError] = useState("");

    const [imageUrl, setImageUrl] = useState();
    const [imageUrlError, setImageUrlError] = useState("");

    const [selectedBands, setSelectedBands] = useState([]);
    const [selectedBandsError, setSelectedBandsError] = useState("");

    const [bandas, setBandas] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
    }

    useEffect(() => {

        api.get("band", '', headers)
            .then(response => {
                var content = []
                response.data.found.forEach(row => {
                    content.push({
                        id: row.id,
                        name: row.name,
                        imageUrl: row.image_url,
                        creationDate: row.creation_date
                    })
                });
                setBandas(content);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });
        if (props.music !== "") {
            defineAlteracao(props.music);
        }
    }, []);

    function defineAlteracao(music) {
        setId(music.id);
        setName(music.name);
        setReleaseDate(music.releaseDate);
        setImageUrl(music.imageUrl);


        let bandasSelecionadas = []
        music.bands.forEach((banda) => { bandasSelecionadas.push(banda.id) })

        setSelectedBands(bandasSelecionadas)
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
            setReleaseDateError("Necessário informar a Data de Release da música.");
        }


        if (imageUrl === "" || imageUrl == null) {
            validaOperacao = false;
            setImageUrlError("Necessário informar uma URL de Imagem da música.");
        }


        if (validaOperacao) {
            console.log("Informações Válidas. Iniciando processo de cadastro...");
          

            let bandasSelecionadas = [];
            bandas.forEach((banda) => {
                if (selectedBands.indexOf(banda.id) >= 0) {
                    bandasSelecionadas.push(banda)
                }
            })

            var data = {
                name: name,
                release_date: releaseDate,
                image_url: imageUrl,
                bands: bandasSelecionadas
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
                console.log(data);
                api.post("music", data, headers)
                    .then(response => {
                        if (response.status === 201) {
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
            <form>
                <Grid item xs={12} sm={4}>
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
                </Grid>
                <Grid item xs={12} sm={4}>
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
                </Grid>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="bands"
                        fullWidth
                        className="m-3"
                        label="Bandas"
                        variant="outlined"
                        value={selectedBands}
                        onChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            setSelectedBands(
                                // On autofill we get a stringified value.
                                typeof value === 'string' ? value.split(',') : value,
                            );
                        }}
                        helperText={selectedBandsError}
                        error={(selectedBandsError !== "")}
                        select
                        SelectProps={{
                            multiple: true
                        }}>
                        {bandas.map(option => (
                            <MenuItem
                                key={option.id}
                                value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
