import React, {Component } from 'react';
import  './styles/styles.css'

let taskID=0;

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
        const newTask = { id: taskID++, description: taskDescription };
        const newPanels = this.state.panels.map((panel, index) => {
            if (index === panelIndex) {
                return { ...panel, tasks: [...panel.tasks, newTask] }; // Use newTask here
            }
            return panel;
        });
    
        this.setState({ panels: newPanels });
    }
    

    onDragStart = (event, taskID, panelIndex) => {
        event.dataTransfer.setData("taskID", taskID.toString()); // Convert ID to string
        event.dataTransfer.setData("fromPanel", panelIndex.toString());
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, toPanelIndex) => {
        const taskID = parseInt(event.dataTransfer.getData("taskID"));
        const fromPanelIndex = parseInt(event.dataTransfer.getData("fromPanel"));

        if (fromPanelIndex !== toPanelIndex) {
            this.moveTask(taskID, fromPanelIndex, toPanelIndex);
        }
    }

    moveTask = (taskId, fromPanelIndex, toPanelIndex) => {
        this.setState(prevState => {
            let newPanels = prevState.panels.map(panel => ({
                ...panel,
                tasks: panel.tasks.map(task => ({ ...task }))
            }));
            // Find the task object
            const task = newPanels[fromPanelIndex].tasks.find(t => t.id === taskId);

            // Remove the task from the original panel
            newPanels[fromPanelIndex].tasks = newPanels[fromPanelIndex].tasks.filter(t => t.id !== taskId);
    
             // Add the task object to the new panel
        if(task) newPanels[toPanelIndex].tasks.push(task);
    
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
                            {panel.tasks.map((task) => (
                                <div key={task.id} draggable onDragStart={(event) => this.onDragStart(event, task.id, panelIndex)}>
                                    {task.description} {/* Render the description */}
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