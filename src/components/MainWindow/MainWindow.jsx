import React, { PureComponent } from 'react';

import ObjectColumn from '../ObjectColumn/ObjectColumn';
import SpaceMap from '../SpaceMap/SpaceMap';
import { planetsService } from '../../services/planetsService';
import { sattelitesService } from '../../services/sattelitesService';

import './styles.scss';

class MainWindow extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            planets: [],
            sattelites: [],
            sattelitesForCurrentPlanet: []
        };

        this.updateItem = this.updateItem.bind(this);
        this.getSattelitesForPlanet = this.getSattelitesForPlanet.bind(this);
    }

    componentDidMount() {
        planetsService
            .getAll()
            .then(planets => this.setState({ planets: planets }));
        sattelitesService
            .getAll()
            .then(sattelites => this.setState({ sattelites: sattelites }));
    }

    contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    getSattelitesForPlanet(id) {
        let counter = 0;

        for (let i = 0; i < this.state.planets.length; i++) {
            if (this.state.sattelites.length === 0) {
                var key = Date.now(),
                    emptySattelite = {
                        id: { key },
                        planetId: id,
                        title: '',
                        radius: '0',
                        rotation: '0',
                        time: '0'
                    }
                this.setState({
                    sattelitesForCurrentPlanet: [...this.state.sattelitesForCurrentPlanet, emptySattelite]
                });
                break;
            }
            for (let j = 0; j < this.state.sattelites.length; j++) {
                if (this.state.sattelites[j].planetId === id) {
                    counter++;
                    this.setState({
                        sattelitesForCurrentPlanet: [...this.state.sattelitesForCurrentPlanet, this.state.sattelites[j]]
                    });
                }
            }
            if (counter === 0 && i === this.state.planets.length - 1) {
                var key = Date.now(),
                    emptySattelite = {
                        id: key,
                        planetId: id,
                        title: '',
                        radius: '0',
                        rotation: '0',
                        time: '0'
                    }
                this.setState({
                    ...this.state,
                    sattelitesForCurrentPlanet: [...this.state.sattelitesForCurrentPlanet, emptySattelite]
                });
            }
        }
    }

    updateItem = async (type, newItem) => {
        if (type === 'planet') {
            this.setState({
                ...this.state,
                planets: this.state.planets.map(x => x.id === newItem.id ? newItem : x)
            });
            await planetsService.update(newItem);
        } else if (type === 'sattelite') {
            this.setState({
                ...this.state,
                sattelites: this.state.sattelites.map(x => x.id === newItem.id ? newItem : x)
            });
            await sattelitesService.update(newItem);
        }
    };

    render() {
        return (
            <div className="mainWindow">
                <ObjectColumn className='mainWindow__planetsColumn'
                    title='planets'
                    updateItem={this.updateItem}
                    getSattelitesForPlanet={this.getSattelitesForPlanet}
                    planets={this.state.planets} />
                <ObjectColumn className='mainWindow__sattelitesColumn'
                    sattelites={this.state.sattelites}
                    title='sattelites' />
                <SpaceMap className='mainWindow__spaceMap'
                    planets={this.state.planets}
                    sattelites={this.state.sattelites}
                    updateItem={this.updateItem} />
            </div>
        );
    }
}

export default MainWindow;
