import React, { Fragment, useEffect, useState } from 'react';
import api from "../../services/api";
import CardModel from '../../components/Card';
import Album from '../albuns';


function Home() {

    const [musicas, setMusicas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [cantores, setCantores] = useState([]);
    const [bandas, setBandas] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
    }

    useEffect(() => {
        api.get("music", '', headers)
            .then(response => {
                var content = []
                response.data.found.musics.forEach(row => {
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

            api.get("album", '', headers)
            .then(response => {
                var content = []
                response.data.found.albums.forEach(row => {
                    content.push({
                        id: row.id,
                        name: row.name,
                        imageUrl: row.image_url,
                        releaseDate: row.release_date
                    })
                });
                setAlbuns(content);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

            api.get("singer", '', headers)
            .then(response => {
                var content = []
                response.data.found.singers.forEach(row => {
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

            api.get("band", '', headers)
            .then(response => {
                var content = []
                response.data.found.bands.forEach(row => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <h1>Músicas </h1>
            <hr />
            <div className='card-group row-cols-1 row-cols-md-4'>
                {
                    musicas.map((musica) => <CardModel key={musica.id} image={musica.imageUrl} title={musica.name} date={musica.releaseDate} />)
                }
            </div>
            <hr />
            <br />


            <h1>Albuns </h1>
            <hr />
            <div className='card-group row-cols-1 row-cols-md-4'>
                {
                    albuns.map((album) => <CardModel key={album.id} image={album.imageUrl} title={album.name} date={album.releaseDate} />)
                }
            </div>
            <hr />
            <br />


            <h1>Cantores </h1>
            <hr />
            <div className='card-group row-cols-1 row-cols-md-4'>
                {
                    cantores.map((cantor) => <CardModel key={cantor.id} image={cantor.imageUrl} title={cantor.name} date={cantor.birthDate} />)
                }
            </div>
            <hr />
            <br />


            <h1>Bandas </h1>
            <hr />
            <div className='card-group row-cols-1 row-cols-md-4'>
                {
                    bandas.map((banda) => <CardModel key={banda.id} image={banda.imageUrl} title={banda.name} date={banda.creationDate} />)
                }
            </div>
        </Fragment>
    );
}

export default Home;