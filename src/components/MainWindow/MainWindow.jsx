import React, { PureComponent } from 'react';

import ObjectColumn from '../ObjectColumn/ObjectColumn';

import { spaceService } from '../../SpaceService';

import './styles.scss';

class MainWindow extends PureComponent {
    render() {
        return (
            <div className="mainWindow">
                <ObjectColumn className='mainWindow__planetsColumn'
                    title='planets' />
                <ObjectColumn className='mainWindow__sattelitesColumn'
                    title='sattelites'/>
                <div className='mainWindow__spaceMap' />
            </div>
        );
    }
}

export default MainWindow;
