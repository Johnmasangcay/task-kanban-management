import React, { useState, useEffect } from "react";
import '../App.css';
import { getTaskData, getProjectData, addProject, addTask, db, firebase, getUniqueId, UpdateProject } from "./firebase";
import { getFirestore, collection, getDocs, addDoc, doc } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Navbar, NavbarBrand, NavLink, Nav, Modal, Form, FloatingLabel } from 'react-bootstrap';

export default function DashboardPage(props){
    // ----------------------------------------------------------------------------------------PROJECT MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false)
    const handleShowUpdate = () => setShowUpdate(true)
    // -----------------------------------------------------------------------------------------TASK MODAL
    const [taskModalShow, setTaskModalShow] = useState(false);
    const TaskModalHandleClose = () => setTaskModalShow(false)
    const TaskModalHandleShow = () => setTaskModalShow(true)  
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("")
    const [projectDateCreated, setProjectDateCreated] = useState(new Date())
    //---------------------------------------------------------------------------------------PROJECT DATA
    // const [projectIndex, setProjectIndex] = useState(0)
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

    function onAdd(e){         
        addProject({
        projectDescription: projectDescription,
        projectDateCreated: projectDateCreated,  
        projectTitle: projectTitle,   
        }).then(()=>{
            setProjectTitle('')
            setProjectDescription('')
            setProjectDateCreated('')
        })
        console.log(setProjectTitle)      
    }

    const projectData= () =>{
        console.log(getProjectData())
        console.log(project[0].projectID)
        console.log(project[0].projectIndex)
    }
    const taskData=()=>{
        console.log(getTaskData())
        console.log(project)
    }
    // ----------------------------------------------------------------------------------------------TASK ONSUBMIT
    const [taskTitle, setTaskTitle] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDateCreated, setTaskDateCreated] = useState(new Date());
    const [taskId, setTaskId] = useState("")

    function onSubmit(e){
        addTask({
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskPriority: taskPriority,
            taskStatus: taskStatus,
            taskDateCreated: parseInt(taskDateCreated),
            taskDueDate: parseInt(taskDueDate),
            taskId: taskId
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
    return(  
    <>  
      
    {/* ------------------------------------------------------------------------------------RETURN START */}
    
                       
        <Container>   

            <Row>
                <Col className="d-flex justify-content-center py-3"><h2>CODESTACK TASK TRACKER</h2></Col>
            </Row>
            <Row className="d-flex justify-content-center"> 
            <Col md={2} className="d-flex justify-content-end">
            <div className="addProjectBtn"> <Button variant="dark" onClick={handleShow}>New Project</Button ></div>
            </Col>
            <Col md={2}>
            <div><Button variant="dark" onClick={handleShowUpdate}>Update Project</Button></div>
            </Col>
            <Col md={4}>
            <div><Button variant="dark" onClick={TaskModalHandleShow}>Add Task</Button></div>
            </Col>

            <Col md={2}>
            <Form.Select onChange={(e)=> getUniqueId(e.target.value)} aria-label="Default select example">            
                {project.map((projectItems) =>{
                 return (  
                        <>             
                 <option value={projectItems.projectTitle}>{projectItems.projectTitle}</option>
                         </>
                 )})}
            </Form.Select>
            </Col>
            </Row>

               <Row>
                   <Col className="d-flex justify-content-center py-3">
                     <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{taskDataArr[0].title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{taskDataArr[0].priority}</Card.Subtitle>
                        <Card.Text>{taskDataArr[0].description} </Card.Text>
                      </Card.Body>
                     </Card>
                    </Col>
               </Row>
    </Container>
   
{/* //--------------------------------------------------------------------------FOR TASK MODAL */}
    <Modal show={taskModalShow} onHide={TaskModalHandleClose}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                 >
                    <Modal.Header closeButton>
                      <Modal.Title className="modalTitle">Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Control size="sm" type="text" value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)} placeholder="Title" />
                    <Form.Control size="sm" type="text" value={taskDescription} onChange={e => setTaskDescription(e.currentTarget.value)} placeholder="Description" />
                    <Form.Control size="sm" type="text" value={taskPriority} onChange={e => setTaskPriority(e.currentTarget.value)} placeholder="Priority" />
                    <Form.Control size="sm" type="text" value={taskStatus} onChange={e => setTaskStatus(e.currentTarget.value)} placeholder="Status" />
                    <Form.Control size="sm" type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.currentTarget.value)} placeholder="Due Date" />
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
             
                    </Modal.Body>
                    <Modal.Footer> 
                      <Button variant="dark" type="submit" onClick={onAdd}>Add</Button>
                      <Button variant="secondary"  onClick={handleClose}>Cancel </Button>
                    </Modal.Footer>
                </Modal>
                {/* ------------------------------------------------------------FOR UPDATE MODAL */}
    <Modal show={showUpdate} onHide={handleCloseUpdate}
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
             
                    </Modal.Body>
                    <Modal.Footer> 
                      <Button variant="dark" type="submit" onClick={()=> UpdateProject()}>Update</Button>
                      <Button variant="secondary"  onClick={handleCloseUpdate}>Cancel </Button>
                    </Modal.Footer>
                </Modal>
    </ >
    )   
}
