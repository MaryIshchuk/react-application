import React from 'react';

import logo from './logo.svg';

import './styles.scss';

const Loader = () => {
    return (
        <div className='loader'>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
};

export default Loader;
