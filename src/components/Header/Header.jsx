import React, { PureComponent } from 'react';

import './styles.scss';

class Header extends PureComponent {
    render() {
        return (
            <div className='header'>           
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default Header;
