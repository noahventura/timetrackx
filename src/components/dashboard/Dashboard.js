import React, {Component } from 'react';
import  './styles/styles.css'

// Global taskID counter to assign unique IDs to each task
let taskID=0;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels: [],
            isFormVisible: false,
            newTaskName: '',
            activePanelIndex: null, // To track which panel the new task will be added to
            isEditTaskModalVisible: false,
            selectedTask:null
        };
    }
// Function to add a new panel to the state
    addPanel = () => {
        this.setState(prevState => ({
            panels: [...prevState.panels, { tasks: [] }]
        }));
    }
    showAddTaskForm = (panelIndex) => {
        this.setState({ isFormVisible: true, activePanelIndex: panelIndex, newTaskName: '' }); // Reset newTaskName every time the form is opened
    }
    
    handleTaskNameChange = (event) => {
        this.setState({ newTaskName: event.target.value });
    }
    
    submitTaskForm = () => {
        const { activePanelIndex, newTaskName } = this.state;
        if (newTaskName.trim()) {
            this.addTask(activePanelIndex, newTaskName);
            this.setState({ newTaskName: '', isFormVisible: false, activePanelIndex: null });
        }
    }
    // ADDING TASK

    addTask = (panelIndex, taskDescription) => {
        const newTask = {
            id: taskID++,
            title: taskDescription,  // Assuming you want to use the description as the title
            description: '',         // Initially empty, can be edited later
            date: ''                 // Initially empty, can be edited later
        };
        const newPanels = this.state.panels.map((panel, index) => {
            if (index === panelIndex) {
                return { ...panel, tasks: [...panel.tasks, newTask] };
            }
            return panel;
        });
    
        this.setState({ panels: newPanels });
    }


    //DELETING TASK


    deleteTask = () => {
        const { selectedTask, panels } = this.state;
        if (!selectedTask) return;
    
        const updatedPanels = panels.map((panel, index) => {
            if (index === selectedTask.panelIndex) {
                return {
                    ...panel,
                    tasks: panel.tasks.filter(task => task.id !== selectedTask.id)
                };
            }
            return panel;
        });
    
        this.setState({ panels: updatedPanels, isEditTaskModalVisible: false });
    }
    



    //UPDATING


    selectTask = (task, panelIndex) => {
        this.setState({
            selectedTask: { ...task, panelIndex },
            isEditTaskModalVisible: true
        });
    }
    
    handleTaskUpdate = (event) => {
        this.setState({
            selectedTask: { ...this.state.selectedTask, [event.target.name]: event.target.value }
        });
    }
    
    saveUpdatedTask = () => {
        const { selectedTask, panels } = this.state;
        const updatedPanels = panels.map((panel, index) => {
            if (index === selectedTask.panelIndex) {
                return {
                    ...panel,
                    tasks: panel.tasks.map(task => task.id === selectedTask.id ? selectedTask : task)
                };
            }
            return panel;
        });
        this.setState({ panels: updatedPanels, isEditTaskModalVisible: false });
    }
    
    handleTaskDetailChange = (event) => {
        this.setState({
            selectedTask: { ...this.state.selectedTask, [event.target.name]: event.target.value }
        });
    }
    
    saveTaskDetails = () => {
        const { selectedTask, panels } = this.state;
        const updatedPanels = panels.map((panel, index) => {
            if (index === selectedTask.panelIndex) {
                return {
                    ...panel,
                    tasks: panel.tasks.map(task => task.id === selectedTask.id ? selectedTask : task)
                };
            }
            return panel;
        });
    
        this.setState({ panels: updatedPanels, isEditTaskModalVisible: false });
    }

    //DRAGGING


    // Handler for drag start event
    onDragStart = (event, taskID, panelIndex) => {
        // Store the task ID and the originating panel index in the drag event
        event.dataTransfer.setData("taskID", taskID.toString());
        event.dataTransfer.setData("fromPanel", panelIndex.toString());
    }
    // Handler for drag over event (required for drop to work)
    onDragOver = (event) => {
        event.preventDefault();// Prevent default to allow drop
    }

    // Handler for drop event
    onDrop = (event, toPanelIndex) => {


        // Retrieve the task ID and the originating panel index from the drag event
        const taskID = parseInt(event.dataTransfer.getData("taskID"), 10);
        const fromPanelIndex = parseInt(event.dataTransfer.getData("fromPanel"), 10);

        // Move the task only if it's dropped in a different panel
        if (fromPanelIndex !== toPanelIndex) {
            this.moveTask(taskID, fromPanelIndex, toPanelIndex);
        }
    }
    // Function to move a task from one panel to another
    moveTask = (taskId, fromPanelIndex, toPanelIndex) => {
        console.log(fromPanelIndex,toPanelIndex)
    this.setState(prevState => {
        // Check if the fromPanelIndex and toPanelIndex are valid
        if (fromPanelIndex < 0 || fromPanelIndex >= this.state.panels.length || 
            toPanelIndex < 0 || toPanelIndex >= this.state.panels.length) {
            console.error("Invalid panel index");
            return {}; // Return the current state without changes
        }

        let newPanels = prevState.panels.map(panel => ({
            ...panel,
            tasks: panel.tasks.map(task => ({ ...task }))
        }));

        // Find the task object to be moved
        const task = newPanels[fromPanelIndex].tasks.find(t => t.id === taskId);

        if (!task) {
            console.error("Task not found");
            return {}; // Return the current state without changes
        }

        // Remove the task from the original panel
        newPanels[fromPanelIndex].tasks = newPanels[fromPanelIndex].tasks.filter(t => t.id !== taskId);

        // Add the task object to the destination panel
        newPanels[toPanelIndex].tasks.push(task);

        return { panels: newPanels };
    });
}

    
    
    // Render function to display the dashboard
    render() {
        const { isFormVisible, newTaskName, activePanelIndex } = this.state;
    
        return (
            <div id='fullDash'>
                <button onClick={this.addPanel} disabled={isFormVisible}>Add Panel</button>
                <div className='panels'>
                    {this.state.panels.map((panel, panelIndex) => (
                        <div key={panelIndex} className="panel" onDragOver={this.onDragOver} onDrop={(event) => this.onDrop(event, panelIndex)}>
                            <button onClick={() => this.showAddTaskForm(panelIndex)} disabled={isFormVisible}>Add Task</button>
                            {panel.tasks.map((task) => (
                                <div key={task.id} draggable="true" onClick={() => this.selectTask(task, panelIndex)} onDragStart={(event) => this.onDragStart(event, task.id, panelIndex)}>
                                    {task.title}
                                </div>
                            ))}

                        </div>
                    ))}
                </div>
                {isFormVisible && (
                    <div className="modal">
                        <div className="modal-content">
                        <span className="close" onClick={() => this.setState({ isFormVisible: false, newTaskName: '' })}>&times;</span>
                            <input type="text" value={newTaskName} onChange={this.handleTaskNameChange} placeholder="Enter task name" />
                            <button onClick={() => {
                                this.submitTaskForm();
                                this.setState({ isFormVisible: false });
                            }}>Submit</button>
                        </div>
                    </div>
                )}
                {this.state.isEditTaskModalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => this.setState({ isEditTaskModalVisible: false })}>&times;</span>
                            <input type="text" name="title" value={this.state.selectedTask.title} onChange={this.handleTaskDetailChange} placeholder="Task Title" />
                            <textarea name="description" value={this.state.selectedTask.description} onChange={this.handleTaskDetailChange} placeholder="Task Description"></textarea>
                            <input type="date" name="date" value={this.state.selectedTask.date} onChange={this.handleTaskDetailChange} />
                            <button onClick={this.saveTaskDetails}>Save Details</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    
}

export default Dashboard;