import React, { PureComponent } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { spaceService } from '../../SpaceService';

import './styles.scss';

class ObjectForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      countOfPlanets: 1,
      title: '',
      radius: 0,
      rotation: 0,
      time: 0
    }

    this.addItem = this.addItem.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleRotationChange = this.handleRotationChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    spaceService.getAll().then(items => this.setState({ items }));
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleRadiusChange(e) {
    this.setState({
      radius: e.target.value
    })
  }

  handleRotationChange(e) {
    this.setState({
      rotation: e.target.value
    })
  }

  handleTimeChange(e) {
    this.setState({
      time: e.target.value
    })
  }

  addItem = async (e) => {
    debugger
    let newItem = { 
        id: Date.now(), 
        title: this.state.title,
        radius: this.state.radius,
        rotation: this.state.rotation,
        time: this.state.time
    };

    await spaceService.add(newItem);

    this.setState({
      ...this.state,
      items: [...this.state.items, newItem]
    });
  }

  render() {
    return (
      <Form className='objectForm'>
        <FormGroup>
          <Label for='title'>Title</Label>
          <Input type='text' id='title' value={this.state.title} onChange={this.handleTitleChange} placeholder='Enter planet/sattelite title' />
        </FormGroup>
        <FormGroup>
          <Label for='radius'>Radius</Label>
          <Input type='number' id='radius' value={this.state.radius} onChange={this.handleRadiusChange} placeholder='Enter planet/sattelite radius' />
        </FormGroup>
        <FormGroup>
          <Label for='rotation'>Rotation</Label>
          <Input type='number' id='rotation' value={this.state.rotation} onChange={this.handleRotationChange} placeholder='Enter rotation' />
        </FormGroup>
        <FormGroup>
          <Label for='time'>Time</Label>
          <Input type='number' id='time' value={this.state.time} onChange={this.handleTimeChange} placeholder='Enter planet/sattelite time' />
        </FormGroup>
        <Button onClick={this.addItem}>Save</Button>
      </Form>
    );
  }
}

export default ObjectForm;
