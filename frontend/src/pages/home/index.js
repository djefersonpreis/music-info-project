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
                setMusicas(response.data.found);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

            api.get("album", '', headers)
            .then(response => {
                setAlbuns(response.data.found);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

            api.get("singer", '', headers)
            .then(response => {
                setCantores(response.data.found);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

            api.get("band", '', headers)
            .then(response => {
                setBandas(response.data.found);
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
            <div className='card-group row-cols-1 row-cols-md-5'>
                {
                    musicas.map((musica) => <CardModel key={musica.id} image={musica.image_url} title={musica.name} date={musica.release_date} />)
                }
            </div>
            <hr />
            <br />


            <h1>Albuns </h1>
            <hr />
            <div className='card-group row-cols-1 row-cols-md-5'>
                {
                    albuns.map((album) => <CardModel key={album.id} image={album.image_url} title={album.name} date={album.release_date} />)
                }
            </div>
            <hr />
            <br />


            <h1>Cantores </h1>
            <hr />
            <div className='card-group row-cols-1 row-cols-md-5'>
                {
                    cantores.map((cantor) => <CardModel key={cantor.id} image={cantor.image_url} title={cantor.name} date={cantor.birth_date} />)
                }
            </div>
            <hr />
            <br />


            <h1>Bandas </h1>
            <hr />
            <div className='card-group row-cols-1 row-cols-md-5'>
                {
                    bandas.map((banda) => <CardModel key={banda.id} image={banda.image_url} title={banda.name} date={banda.creation_date} />)
                }
            </div>
        </Fragment>
    );
}

export default Home;