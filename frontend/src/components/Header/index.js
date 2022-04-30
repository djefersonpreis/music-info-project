import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <>
            <header class="p-3 bg-dark text-white">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" to={'/home'}>MUSIC INFO</Link>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link class="nav-link px-2 text-white" to={'/home'}>Home</Link></li>
                            <li><Link class="nav-link px-2 text-white" to={'/usuarios'}>Usuários</Link></li>
                            <li><Link class="nav-link px-2 text-white" to={'/musicas'}>Musicas</Link></li>
                        </ul>

                        <div class="text-end">
                            <Link class="btn btn-outline-light me-2" to={'/login'}>Sair</Link>
                        </div>
                    </div>
                </div>
            </header>

            <hr />
        </>
    );
}
