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

    const [singer, setSinger] = useState('');
    const [singerIdError, setSingerIdError] = useState("");

    const [band, setBand] = useState('');
    const [bandIdError, setBandIdError] = useState("");

    const [selectedMusics, setSelectedMusics] = useState([]);
    const [selectedMusicsError, setSelectedMusicsError] = useState("");

    const [cantores, setCantores] = useState([]);
    const [bandas, setBandas] = useState([]);
    const [musicas, setMusicas] = useState([]);

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

        api.get("singer", '', headers)
            .then(response => {
                var content = []
                response.data.found.forEach(row => {
                    content.push({
                        id: row.id,
                        name: row.name,
                        imageUrl: row.image_url,
                        birthDate: row.birth_date
                    })
                });
                setCantores(content);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

        api.get("music", '', headers)
            .then(response => {
                var content = []
                response.data.found.forEach(row => {
                    content.push({
                        id: row.id,
                        name: row.name,
                        imageUrl: row.image_url,
                        releaseDate: row.release_date
                    })
                });
                setMusicas(content);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

        if (props.album !== "") {
            defineAlteracao(props.album);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function defineAlteracao(album) {
        setId(album.id);
        setName(album.name);
        setReleaseDate(album.releaseDate);
        setImageUrl(album.imageUrl);
        setSinger(album.singer.id);
        setBand(album.band.id);

        let musicasSelecionadas = []
        album.musics.forEach((musica) => {musicasSelecionadas.push(musica.id)})

        setSelectedMusics(musicasSelecionadas)
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnameError("");
        setReleaseDateError("");
        setImageUrlError("");
        setSingerIdError("");
        setBandIdError("");
        setSelectedMusicsError("")

        if (name === "" || name == null) {
            validaOperacao = false;
            setnameError("Necess??rio informar o Nome do album.");
        }


        if (releaseDate === "" || releaseDate == null) {
            validaOperacao = false;
            setReleaseDateError("Necess??rio informar a Data de Lan??amento do Album.");
        }


        if (imageUrl === "" || imageUrl == null) {
            validaOperacao = false;
            setImageUrlError("Necess??rio informar uma URL de Imagem do cantor.");
        }


        if (validaOperacao) {
            console.log("Informa????es V??lidas. Iniciando processo de cadastro...");

            const headers = {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            }

            let cantor = cantores.filter((row) => row.id === singer)
            let banda = bandas.filter((row) => row.id === band)

            let musicasSelecionadas = [];
            musicas.forEach((musica) => {
                if (selectedMusics.indexOf(musica.id) >= 0) {
                    musicasSelecionadas.push(musica)
                }
            })

            var data = {
                name: name,
                release_date: releaseDate,
                image_url: imageUrl,
                singer: cantor[0],
                band: banda[0],
                musics: musicasSelecionadas
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
                        label="Data de Lan??amento do Album (Ano)"
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
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="singer"
                        fullWidth
                        className="m-3"
                        label="Cantor"
                        variant="outlined"
                        value={singer}
                        onChange={(e) => { setSinger(e.target.value) }}
                        helperText={singerIdError}
                        error={(singerIdError !== "")}
                        select>
                        {cantores.map(option => (
                            <MenuItem
                                key={option.id}
                                value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="band"
                        fullWidth
                        className="m-3"
                        label="Banda"
                        variant="outlined"
                        value={band}
                        onChange={(e) => { setBand(e.target.value) }}
                        helperText={bandIdError}
                        error={(bandIdError !== "")}
                        select>
                        {bandas.map(option => (
                            <MenuItem
                                key={option.id}
                                value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="musics"
                        fullWidth
                        className="m-3"
                        label="Musicas"
                        variant="outlined"
                        value={selectedMusics}
                        onChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            setSelectedMusics(
                                // On autofill we get a stringified value.
                                typeof value === 'string' ? value.split(',') : value,
                            );
                        }}
                        helperText={selectedMusicsError}
                        error={(selectedMusicsError !== "")}
                        select
                        SelectProps={{
                            multiple: true
                        }}>
                        {musicas.map(option => (
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
