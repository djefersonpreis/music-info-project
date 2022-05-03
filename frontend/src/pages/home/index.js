import React, { Fragment, useEffect, useState } from 'react';
import api from "../../services/api";
import CardModel from '../../components/Card';


function Home() {

    const [musicas, setMusicas] = useState([]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <div className='card-group row-cols-1 row-cols-md-4'>
                {
                    musicas.map((musica) => <CardModel key={musica.id} image={musica.imageUrl} title={musica.name} date={musica.releaseDate} />)
                }
            </div>
        </Fragment>
    );
}

export default Home;