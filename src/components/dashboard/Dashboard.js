import React, {Component } from 'react';
import  './styles/styles.css'

class Dashboard extends Component {
    constructor(props) {
      super(props);
      // Initialize state with an empty panels array
      this.state = {
        panels: []
      };
    }
  
    addPanel = () => {
      // Add a new panel with an empty tasks array
      this.setState(prevState => ({
        panels: [...prevState.panels, { tasks: [] }]
      }));
    }
  
    addTask = (panelIndex, taskDescription) => {
      // Add a new task to the specified panel
      const newPanels = this.state.panels.map((panel, index) => {
        if (index === panelIndex) {
          return { ...panel, tasks: [...panel.tasks, taskDescription] };
        }
        return panel;
      });
  
      this.setState({ panels: newPanels });
    }
  
    render() {
      return (
        <div id='fullDash'>
          <button onClick={this.addPanel}>Add Panel</button>
          <div className='panels'>
            {this.state.panels.map((panel, panelIndex) => (
              <div key={panelIndex} className="panel">
                <button onClick={() => this.addTask(panelIndex, 'New Task')}>
                  Add Task
                </button>
                {panel.tasks.map((task, taskIndex) => (
                  <div key={taskIndex}>{task}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  
  export default Dashboard;