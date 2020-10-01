import React from 'react';
import { mdiCart } from '@mdi/js';
import Icon from '@mdi/react';

function NavBar(props) {
    return (
        <div className="navbar">
            <div><a className="logo" href="/">superfüds</a></div>
            <input className="searchBox" type="text" placeholder="Busca marcas y productos" href="#news" />
            <div className="user">
                <div className="userCart" onClick={props.showCart}><Icon path={mdiCart} size={1} /></div>
                <span data-testid="user-name">Jairo Hernandez</span>
                <img className="profilePic" alt="avatar" src="avatar.png"/>
            </div>
        </div>
    )
}

export default NavBar;