import React, {Component } from 'react';
import  './styles/styles.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels: []
        };
    }

    addPanel = () => {
        this.setState(prevState => ({
            panels: [...prevState.panels, { tasks: [] }]
        }));
    }

    addTask = (panelIndex, taskDescription) => {
        const newPanels = this.state.panels.map((panel, index) => {
            if (index === panelIndex) {
                return { ...panel, tasks: [...panel.tasks, taskDescription] };
            }
            return panel;
        });

        this.setState({ panels: newPanels });
    }

    onDragStart = (event, task, panelIndex) => {
        event.dataTransfer.setData("task", task);
        event.dataTransfer.setData("fromPanel", panelIndex);
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, toPanelIndex) => {
        const task = event.dataTransfer.getData("task");
        const fromPanelIndex = event.dataTransfer.getData("fromPanel");

        if (fromPanelIndex !== toPanelIndex) {
            this.moveTask(task, fromPanelIndex, toPanelIndex);
        }
    }

    moveTask = (task, fromPanelIndex, toPanelIndex) => {
        this.setState(prevState => {
            let newPanels = prevState.panels.map(panel => ({ ...panel, tasks: [...panel.tasks] }));
    
            // Find and remove the task from the original panel
            newPanels[fromPanelIndex].tasks = newPanels[fromPanelIndex].tasks.filter(t => t !== task);
    
            // Add the task to the new panel
            newPanels[toPanelIndex].tasks.push(task);
    
            return { panels: newPanels };
        });
    }
    

    render() {
        return (
            <div id='fullDash'>
                <button onClick={this.addPanel}>Add Panel</button>
                <div className='panels'>
                    {this.state.panels.map((panel, panelIndex) => (
                        <div key={panelIndex} className="panel" onDragOver={this.onDragOver} onDrop={(event) => this.onDrop(event, panelIndex)}>
                            <button onClick={() => this.addTask(panelIndex, 'New Task')}>
                                Add Task
                            </button>
                            {panel.tasks.map((task, taskIndex) => (
                                <div key={taskIndex} draggable onDragStart={(event) => this.onDragStart(event, task, panelIndex)}>
                                    {task}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Dashboard;