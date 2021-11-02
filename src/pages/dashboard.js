import React, { useState, useEffect } from "react";
import { getTaskData, getProjectData, addProject, addTask } from "./firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Navbar, NavbarBrand, NavLink, Nav, Modal, Form } from 'react-bootstrap';

export default function DashboardPage(props){
    // ----------------------------------------------------------------------------------------PROJECT MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    // -----------------------------------------------------------------------------------------TASK MODAL
    const [taskModalShow, setTaskModalShow] = useState(false);
    const TaskModalHandleClose = () => setTaskModalShow(false)
    const TaskModalHandleShow = () => setTaskModalShow(true)  
    //---------------------------------------------------------------------------------------PROJECT DATA
    const [projectIndex, setProjectIndex] = useState(0)
    const [project, setProject] = useState(getProjectData())

    useEffect(()=>{
        console.log(project)
    }, [])
    //-----------------------------------------------------------------------------------------TASK DATA
    const [taskIndex, setTaskIndex] = useState(0)
    const [taskDataArr, setTaskDataArr] = useState(getTaskData())
    useEffect(()=>{
        console.log(taskDataArr)
    }, [])
    //-------------------------------------------------------------------------------------------------PROJECT ONADD
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("")
    const [projectDateCreated, setProjectDateCreated] = useState("")

    function onAdd(e){
        e.preventDefault()
        addProject({
        projectDateCreated: parseInt(projectDateCreated),
        projectDescription: projectDescription,
        projectTitle: projectTitle
        }).then(()=>{
            setProjectTitle('')
            setProjectDescription('')
            setProjectDateCreated('')
        })
        console.log(setProjectTitle)
    }
    const projectData= () =>{
        console.log(getProjectData())
    }
    const taskData=()=>{
        console.log(getTaskData())
    }
    // ----------------------------------------------------------------------------------------------TASK ONSUBMIT
    const [taskTitle, setTaskTitle] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDateCreated, setTaskDateCreated] = useState("");

    function onSubmit(e){
       
        addTask({
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskPriority: taskPriority,
            taskStatus: taskStatus,
            taskDateCreated: parseInt(taskDateCreated),
            taskDueDate: parseInt(taskDueDate)
        }).then(()=>{
            setTaskTitle("");  
            setTaskDescription("");  
            setTaskPriority("");  
            setTaskStatus("");  
            setTaskDateCreated("");  
            setTaskDueDate("");  
        })
    }
    // ----------------------------------------------------------------------------------------------TASK ONSUBMIT END
     return project.map(projectItems =>{
        console.log(projectItems.title)
        console.log(projectItems.id)
    

    return(
    <>   
    {/* ------------------------------------------------------------------------------------RETURN START */}
    <li key={projectItems.id}>
        <div>
           <h1>{projectItems.projectTitle}</h1> 
           <h1>{projectItems.projectDescription}</h1>
        </div>      
        </li>
        
    <button onClick={projectData}>Get Poject</button>
    <button onClick={taskData}>Get Task</button>
    <button onClick={handleShow}>Add Project</button>
    <button onClick={TaskModalHandleShow}>Add Task</button>

{/* //--------------------------------------------------------------------------FOR TASK MODAL */}
    <Modal show={taskModalShow} onHide={TaskModalHandleClose}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                 >
                    <Modal.Header closeButton>
                      <Modal.Title className="modalTitle">Add Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Control size="sm" type="text" value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)} placeholder="Title" />
                    <Form.Control size="sm" type="text" value={taskDescription} onChange={e => setTaskDescription(e.currentTarget.value)} placeholder="Description" />
                    <Form.Control size="sm" type="text" value={taskPriority} onChange={e => setTaskPriority(e.currentTarget.value)} placeholder="Priority" />
                    <Form.Control size="sm" type="text" value={taskStatus} onChange={e => setTaskStatus(e.currentTarget.value)} placeholder="Status" />
                    <Form.Control size="sm" type="text" value={taskDateCreated} onChange={e => setTaskDateCreated(e.currentTarget.value)} placeholder="Date Today" />
                    <Form.Control size="sm" type="text" value={taskDueDate} onChange={e => setTaskDueDate(e.currentTarget.value)} placeholder="Due Date" />
                    </Modal.Body>
                    <Modal.Footer> 
                      <Button variant="dark" type="submit" onClick={onSubmit}>Add</Button>
                      <Button variant="secondary"  onClick={TaskModalHandleClose}>Cancel </Button>
                    </Modal.Footer>
                </Modal>    


{/* //------------------------------------------------------------------------FOR PROJECT MODAL */}
    <Modal show={show} onHide={handleClose}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                 >
                    <Modal.Header closeButton>
                      <Modal.Title className="modalTitle">Add Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Control size="sm" type="text" value={projectTitle} onChange={e => setProjectTitle(e.currentTarget.value)} placeholder="Title" />
                    <Form.Control size="sm" type="text" value={projectDescription} onChange={e => setProjectDescription(e.currentTarget.value)} placeholder="Description" />
                    <Form.Control size="sm" type="text" value={projectDateCreated} onChange={e => setProjectDateCreated(e.currentTarget.value)} placeholder="Date Today" />
                    </Modal.Body>
                    <Modal.Footer> 
                      <Button variant="dark" type="submit" onClick={onAdd}>Add</Button>
                      <Button variant="secondary"  onClick={handleClose}>Cancel </Button>
                    </Modal.Footer>
                </Modal>
    </ >
    )   
})
}
