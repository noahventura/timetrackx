import React, {Component } from 'react';
import  './styles/styles.css'

// Global taskID counter to assign unique IDs to each task
let taskID=0;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        // State initialization with an empty array of panels
        this.state = {
            panels: []
        };
    }
// Function to add a new panel to the state
    addPanel = () => {
        this.setState(prevState => ({
            panels: [...prevState.panels, { tasks: [] }]
        }));
    }

    // Function to add a new task to a specific panel
    addTask = (panelIndex, taskDescription) => {
        const newTask = { id: taskID++, description: taskDescription };
        const newPanels = this.state.panels.map((panel, index) => {
            if (index === panelIndex) {
                // For the panel that matches the index, add the new task
                return { ...panel, tasks: [...panel.tasks, newTask] }; // Use newTask here
            }
            return panel; // For other panels, return them as they are
        });
    
        this.setState({ panels: newPanels });
    }
    
    // Handler for drag start event
    onDragStart = (event, taskID, panelIndex) => {
        // Store the task ID and the originating panel index in the drag event
        event.dataTransfer.setData("taskID", taskID.toString()); // Convert ID to string
        event.dataTransfer.setData("fromPanel", panelIndex.toString());
    }
    // Handler for drag over event (required for drop to work)
    onDragOver = (event) => {
        event.preventDefault();// Prevent default to allow drop
    }
    // Handler for drop event
    onDrop = (event, toPanelIndex) => {
        // Retrieve the task ID and the originating panel index from the drag event
        const taskID = parseInt(event.dataTransfer.getData("taskID"));
        const fromPanelIndex = parseInt(event.dataTransfer.getData("fromPanel"));

        // Move the task only if it's dropped in a different panel
        if (fromPanelIndex !== toPanelIndex) {
            this.moveTask(taskID, fromPanelIndex, toPanelIndex);
        }
    }
    // Function to move a task from one panel to another
    moveTask = (taskId, fromPanelIndex, toPanelIndex) => {
        this.setState(prevState => {
            // Create a new array of panels with deep copies of their tasks
            let newPanels = prevState.panels.map(panel => ({
                ...panel,
                tasks: panel.tasks.map(task => ({ ...task }))
            }));
            // Find the task object to be moved
            const task = newPanels[fromPanelIndex].tasks.find(t => t.id === taskId);

            // Remove the task from the original panel
            newPanels[fromPanelIndex].tasks = newPanels[fromPanelIndex].tasks.filter(t => t.id !== taskId);
    
            //Add the task object to the destination panel
        if(task) newPanels[toPanelIndex].tasks.push(task);
    
            return { panels: newPanels };
        });
    }
    
    // Render function to display the dashboard
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