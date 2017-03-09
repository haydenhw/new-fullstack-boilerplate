import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ModuleInventoryList from './ModuleInventoryList'
import * as actions from '../actions/action-index';

class Projects extends Component {
  
  handleSubmit(event) {
    const newProject = {
      "name": this.input.value,
      "boardSpecs": {
        "x": 50,
        "y": 50,
        "height": 300,
        "width": 500
      },
      "moudles": []
    }
    
    fetch(
      'projects',
      {
          method: "POST",
          body: JSON.stringify(newProject),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        alert( JSON.stringify( data ));
      })
      .catch(err => {
        console.error(err)
      })
  }
  
  render() {
    return (
        <div>
            <h1>
                Projects
            </h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label>
                New Project
                <input type="text" ref={(input) => this.input = input} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <div>
                <Link style={{"margin": "10px"}} to="/design">Next</Link>
            </div>
        </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  return {
      getData: (url) => dispatch(actions.fetchModules(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);