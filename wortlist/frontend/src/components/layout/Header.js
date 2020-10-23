import React, { Component } from 'react';

export class Header extends Component {
    render() {
        return (
            <header className="header">
              <a href="/" className="header__logo">Wortschatz B1 Goethe-Institut</a>
            </header>
        )
    }
}

export default Header;
