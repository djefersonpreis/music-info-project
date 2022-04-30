import React from 'react';
import { NavLink, Link } from 'react-router-dom';


/**
 * Componente para gerar um album do bootstrap
 * @param music.name => Nome da Musica/Bandas
 * @param music.desc => Descricação da Música/Banda
 * @param music.img  => Link da imagem de Música/Banda
 */
export default function Album(music) {

    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <img className="card-img-top" src={music.img} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">{music.name}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
