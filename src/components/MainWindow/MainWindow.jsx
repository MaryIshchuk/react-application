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
        this.addPlanetObjectForm = this.addPlanetObjectForm.bind(this);
        this.addSatteliteObjectForm = this.addSatteliteObjectForm.bind(this);
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

    addPlanetObjectForm = async e => {
        let newPlanet = {
            id: this.state.planets.length + 1,
            title: "",
            radius: 0,
            rotation: 0,
            time: 0
        };

        await planetsService.add(newPlanet);

        this.setState({
            ...this.state,
            planets: [...this.state.planets, newPlanet]
        });
    };

    addSatteliteObjectForm = async (emptySattelite) => {
        
        let newSattelite = {
            id: this.state.sattelites.length + 1,
            title: "",
            radius: 0,
            rotation: 0,
            time: 0
        };

        await sattelitesService.add(newSattelite);

        this.setState({
            ...this.state,
            sattelites: [...this.state.sattelites, newSattelite]
        });
    };

    getSattelitesForPlanet(id) {
        debugger
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

                this.addSatteliteObjectForm(emptySattelite);

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

                    this.addSatteliteObjectForm(emptySattelite);

                    this.setState({
                        ...this.state,
                        sattelites: [...this.state.sattelites, emptySattelite],
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
            debugger
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
                    addPlanetObjectForm={this.addPlanetObjectForm}
                    updateItem={this.updateItem}
                    getSattelitesForPlanet={this.getSattelitesForPlanet}
                    planets={this.state.planets} />
                <ObjectColumn className='mainWindow__sattelitesColumn'
                    title='sattelites'
                    addSatteliteObjectForm={this.addSatteliteObjectForm}
                    updateItem={this.updateItem}
                    sattelites={this.state.sattelites} />
                <SpaceMap className='mainWindow__spaceMap'
                    planets={this.state.planets}
                    sattelites={this.state.sattelites}
                    updateItem={this.updateItem} />
            </div>
        );
    }
}

export default MainWindow;
