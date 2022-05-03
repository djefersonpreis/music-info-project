import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" to={'/home'}>MUSIC INFO</Link>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link className="nav-link px-2 text-white" to={'/home'}>Home</Link></li>
                            <li><Link className="nav-link px-2 text-white" to={'/usuarios'}>Usuários</Link></li>
                            <li><Link className="nav-link px-2 text-white" to={'/musicas'}>Musicas</Link></li>
                            <li><Link className="nav-link px-2 text-white" to={'/albuns'}>Albuns</Link></li>
                        </ul>

                        <div className="text-end">
                            <Link className="btn btn-outline-light me-2" to={'/login'}>Sair</Link>
                        </div>
                    </div>
                </div>
            </header>

            <hr />
        </>
    );
}
