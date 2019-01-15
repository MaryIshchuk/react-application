import React, { PureComponent } from 'react';

import Header from '../Header/Header';
import Planet from '../Planet/Planet';
import Sattelite from '../Sattelite/Sattelite';

import './styles.scss';

class SpaceMap extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            planets: this.props.planets,
            sattelites: this.props.sattelites
        }
    }

    componentWillReceiveProps() {
        this.setState({
            ...this.state,
            planets: this.props.planets,
            sattelites: this.props.sattelites
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className='mainWindow__spaceMap__galaxy'>
                    <Header title='Space Map' />
                    <div className='galaxy_sun'>
                    </div>
                    {this.props.planets.map(planet => (
                        <div key={planet.id} className='galaxy_orbit' style={{
                            width: planet.radius * 4,
                            height: planet.radius * 4,
                            left: 400 - planet.radius * 2,
                            top: 430 - planet.radius * 2,
                            backgroundColor: planet.color,
                            animation: 'orbit ' + planet.time*0.5 + 's infinite linear'
                        }}>
                            <Planet key={planet.id}
                                id={planet.id}
                                title={planet.title}
                                radius={planet.radius}
                                rotation={planet.rotation}
                                time={planet.time}
                                color={generateColor()}
                                className='galaxy_planet' />
                        </div>
                    ))}
                    {this.props.sattelites.map(sattelite => (
                        <Sattelite key={sattelite.id}
                            id={sattelite.id}
                            parentRadius={10}
                            parentRotation={65}
                            name='test'
                            radius={15}
                            rotation={60} />))}
                </div>
            </div>
        );
    }
}

export default SpaceMap;

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}