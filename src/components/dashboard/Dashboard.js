import React, {Component } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Paper, Grid, Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import  './styles/styles.css'

// Global taskID counter to assign unique IDs to each task
let taskID=0;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };
  const panelStyle = {
    padding: 2,
    margin: 1,
    minHeight: 100,
    maxHeight: 400,
    overflowY: 'auto',
    border: '2px solid #9e9e9e', // More prominent border
    borderRadius: '8px', // Rounded corners
    backgroundColor: '#f5f5f5', // Slightly off-white background
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Adding some shadow
  };
  
  
  const taskStyle = {
    marginTop: 2,
    marginBottom: 2,
    cursor: 'pointer',
    border: '1px solid #bdbdbd', // Adjust the color as needed
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // subtle shadow
    borderRadius: '4px', // Rounded corners
    backgroundColor: '#fff', // You might want to set a specific background color
  };
  
//DASHBOARD CLASS


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels: [],
            isFormVisible: false,
            newTaskName: '',
            activePanelIndex: null, // To track which panel the new task will be added to
            isEditTaskModalVisible: false,
            selectedTask:null,
            isAddPanelModalVisible: false,
            newPanelTitle: '',
            isEditPanelModalVisible: false,
            editingPanelIndex: null,
            editingPanelTitle: '',
        };
    }
// ADD PANEL
    showAddPanelForm = () => {
        this.setState({ isAddPanelModalVisible: true });
    };

    handleAddPanelChange = (event) => {
        this.setState({ newPanelTitle: event.target.value });
    };

    submitAddPanelForm = () => {
        if (this.state.newPanelTitle.trim()) {
            this.addPanel(this.state.newPanelTitle);
            this.setState({ newPanelTitle: '', isAddPanelModalVisible: false });
        }
    };

    addPanel = (title) => {
        this.setState(prevState => ({
            panels: [...prevState.panels, { title: title, tasks: [] }]
        }));
    };

    closeAddPanelModal = () => {
        this.setState({ isAddPanelModalVisible: false, newPanelTitle: '' });
    };

    //EDIT PANEL


    showEditPanelForm = (panelIndex) => {
        this.setState({
            isEditPanelModalVisible: true,
            editingPanelIndex: panelIndex,
            editingPanelTitle: this.state.panels[panelIndex].title
        });
    };
    
    handleEditPanelChange = (event) => {
        this.setState({ editingPanelTitle: event.target.value });
    };
    
    submitEditPanelForm = () => {
        if (this.state.editingPanelTitle.trim()) {
            this.setState(prevState => {
                const updatedPanels = [...prevState.panels];
                updatedPanels[prevState.editingPanelIndex].title = prevState.editingPanelTitle;
                return {
                    panels: updatedPanels,
                    isEditPanelModalVisible: false,
                    editingPanelIndex: null,
                    editingPanelTitle: ''
                };
            });
        }
    };
    
    closeEditPanelModal = () => {
        this.setState({ isEditPanelModalVisible: false, editingPanelIndex: null, editingPanelTitle: '' });
    };
    
    //DELETE PANEL

    deletePanel = (panelIndex) => {
        // Confirm before deleting
        if (window.confirm("Are you sure you want to delete this panel?")) {
            this.setState(prevState => ({
                panels: prevState.panels.filter((_, index) => index !== panelIndex),
            }));
        }
    };
    
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
    // Function to add a new task to a specific panel
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
    


    //DELETING

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
                <Button variant="contained" onClick={this.showAddPanelForm} disabled={isFormVisible} style={{ margin: '10px' }}>Add Panel</Button>
                {this.state.isAddPanelModalVisible && (
                    <Modal
                        open={this.state.isAddPanelModalVisible}
                        onClose={this.closeAddPanelModal}
                        aria-labelledby="add-panel-modal-title"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="add-panel-modal-title" variant="h6">
                                Add New Panel
                            </Typography>
                            <TextField
                                label="Panel Title"
                                variant="outlined"
                                fullWidth
                                value={this.state.newPanelTitle}
                                onChange={this.handleAddPanelChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.submitAddPanelForm}
                            >
                                Add Panel
                            </Button>
                        </Box>
                    </Modal>
                )}
                <div className='panels'>
                <Grid container spacing={2}>
                {this.state.panels.map((panel, panelIndex) => (
            <Grid item key={panelIndex} xs={12} sm={6} lg={4}>
                <Paper sx={panelStyle} onDragOver={this.onDragOver} onDrop={(event) => this.onDrop(event, panelIndex)}>
                    {/* Panel Header */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
                        {/* Edit Icon */}
                        <EditIcon 
                            sx={{ cursor: 'pointer', position: 'absolute', left: 8, top: 8 }} 
                            onClick={() => this.showEditPanelForm(panelIndex)}
                        />
                        <Typography variant="h6">
                            {panel.title}
                        </Typography>
                        <DeleteIcon 
                            sx={{ cursor: 'pointer', position: 'absolute', top: 8, right: 8 }} 
                            onClick={() => this.deletePanel(panelIndex)}
                        />
                    </div>
                                    {/* Add Task Button Centered */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <Button variant="contained" onClick={() => this.showAddTaskForm(panelIndex)} disabled={isFormVisible}>Add Task</Button>
                    </div>
                    
                    {/* Tasks */}
                    {panel.tasks.map((task) => (
                        <Card key={task.id} sx={taskStyle} draggable="true" onClick={() => this.selectTask(task, panelIndex)} onDragStart={(event) => this.onDragStart(event, task.id, panelIndex)}>
                            <CardContent>
                                {/* Task Title Centered */}
                                <Typography variant="body2" sx={{ textAlign: 'center' }}>{task.title}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Paper>
                        </Grid>
                    ))}
                            </Grid>
                    </div>
                {/* Edit Panel Modal */}
                {this.state.isEditPanelModalVisible && (
                    <Modal
                        open={this.state.isEditPanelModalVisible}
                        onClose={this.closeEditPanelModal}
                        aria-labelledby="edit-panel-modal-title"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="edit-panel-modal-title" variant="h6">
                                Edit Panel Title
                            </Typography>
                            <TextField
                                label="Panel Title"
                                variant="outlined"
                                fullWidth
                                value={this.state.editingPanelTitle}
                                onChange={this.handleEditPanelChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.submitEditPanelForm}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Modal>
                )}

                {/* Edit Panel Modal */}
                {this.state.isEditPanelModalVisible && (
                    <Modal
                        open={this.state.isEditPanelModalVisible}
                        onClose={this.closeEditPanelModal}
                        aria-labelledby="edit-panel-modal-title"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="edit-panel-modal-title" variant="h6">
                                Edit Panel Title
                            </Typography>
                            <TextField
                                label="Panel Title"
                                variant="outlined"
                                fullWidth
                                value={this.state.editingPanelTitle}
                                onChange={this.handleEditPanelChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.submitEditPanelForm}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Modal>
                )}
                {isFormVisible && (
                    <Modal
                        open={isFormVisible}
                        onClose={() => this.setState({ isFormVisible: false, newTaskName: '' })}
                        aria-labelledby="add-task-modal-title"
                    >
                        <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                        }}>
                        <Typography id="add-task-modal-title" variant="h6" component="h2">
                            Add New Task
                        </Typography>
                        <TextField 
                            label="Task Name" 
                            variant="outlined" 
                            fullWidth 
                            value={newTaskName} 
                            onChange={this.handleTaskNameChange}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => {
                            this.submitTaskForm();
                            this.setState({ isFormVisible: false });
                            }}
                        >
                            Submit
                        </Button>
                        </Box>
                    </Modal>
                    )}
                {this.state.isEditTaskModalVisible && (
                    <Modal
                        open={this.state.isEditTaskModalVisible}
                        onClose={() => this.setState({ isEditTaskModalVisible: false })}
                        aria-labelledby="edit-task-modal-title"
                        aria-describedby="edit-task-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="edit-task-modal-title" variant="h6" component="h2">
                            Edit Task
                            </Typography>
                            <TextField
                                label="Task Title"
                                variant="outlined"
                                name="title"
                                value={this.state.selectedTask.title}
                                onChange={this.handleTaskDetailChange}
                                fullWidth
                            />
                            <TextField
                                label="Task Description"
                                variant="outlined"
                                name="description"
                                multiline
                                rows={4}
                                value={this.state.selectedTask.description}
                                onChange={this.handleTaskDetailChange}
                                fullWidth
                            />
                            <TextField
                                label="Due Date"
                                type="date"
                                name="date"
                                value={this.state.selectedTask.date}
                                onChange={this.handleTaskDetailChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                fullWidth
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button variant="contained" color="secondary" onClick={this.deleteTask}>
                                    Delete
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.saveTaskDetails}>
                                    Save
                                </Button>

                            </div>
                    </Box>
                </Modal>
                )}

            </div>
        );
    }
    
    
}

export default Dashboard;