import React, { useState, useEffect } from "react";
import '../App.css';
import { getTaskData, getProjectData, addProject, addTask, db, firebase, getUniqueId, updateProject, deleteProject, getProject, getTask, getTaskByID } from "./firebase";
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
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = () => setShowDelete(true)
    // -----------------------------------------------------------------------------------------TASK MODAL
    const [taskModalShow, setTaskModalShow] = useState(false);
    const TaskModalHandleClose = () => setTaskModalShow(false)
    const TaskModalHandleShow = () => setTaskModalShow(true)  
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("")
    const [projectDateCreated, setProjectDateCreated] = useState(new Date())
    const [projectPriority, setProjectPriority] = useState('')
    const [projectDueDate, setProjectDueDate] = useState('')
    //---------------------------------------------------------------------------------------PROJECT DATA
    const [project, setProject] = useState(getProjectData())
    useEffect(()=>{
        getProjectData()
    }, [])
    //-----------------------------------------------------------------------------------------TASK DATA
    const [taskIndex, setTaskIndex] = useState(0)
    const [taskDataArr, setTaskDataArr] = useState(getTaskData())
    useEffect(()=>{
        console.log(taskDataArr)
    }, [])

    let updates ={
        projectDescription: projectDescription,
        projectTitle: projectTitle
    };

    function onAdd(e){         
        addProject({
        projectDescription: projectDescription,
        projectDateCreated: projectDateCreated, 
        projectPriority: projectPriority, 
        projectDueDate: projectDueDate, 
        projectTitle: projectTitle,   
        }).then(()=>{
            setProjectTitle('')
            setProjectDescription('')
        })
        console.log(projectPriority)      
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
            taskDateCreated: taskDateCreated,
            taskDueDate: taskDueDate,
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
    function handleChange(){
        let updateProj = {
            projectDescription: projectDescription,
            projectTitle: projectTitle
        }
        updateProject(projectDescription, projectTitle)
        // setTimeout(function (){
        //     window.location.reload();
        // }, 500)   
        // console.log(updateProj)   
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
            <div className="addProjectBtn"> <Button variant="outline-dark" onClick={handleShow}>New Project</Button ></div>
            </Col>
            <Col md={2} className="d-flex justify-content-center">
            <div><Button variant="outline-dark" onClick={handleShowUpdate}>Update Project</Button></div>
            </Col>
            <Col md={2}>
            <div><Button variant="outline-dark" onClick={handleShowDelete}>Delete Project</Button></div>
            </Col>


            <Col md={2}>
            <Form.Select onChange={async (e)=> {
               await getTaskByID( await getUniqueId(e.target.value))
                }} aria-label="Default select example">  
                <option value="">Select A Project</option>          
                {project.map((projectItems, prop) =>{
                 return (  
                        <>             
                 <option key={prop} value={projectItems.projectTitle}>{projectItems.projectTitle}</option>
                         </>
                 )})}
            </Form.Select>
            </Col>
            </Row>
            <Row className="addTaskBtn">           
            <Button variant="dark" onClick={TaskModalHandleShow}>Add Task</Button>
            </Row>
          {/* ---------------------------------------------------------------------------------------TASK DATA */}
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
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
                    <Form.Label>Title</Form.Label>
                    <Form.Control size="sm" type="text" value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)} placeholder="Title" />
                    <Form.Label>Description</Form.Label>
                    <Form.Control size="sm" type="text" value={taskDescription} onChange={e => setTaskDescription(e.currentTarget.value)} placeholder="Description" />
                    <Form.Label>Status</Form.Label>
                    <Form.Control size="sm" type="text" value={taskStatus} onChange={e => setTaskStatus(e.currentTarget.value)} placeholder="Status" />
                    <Form.Label>Priority</Form.Label>
                    <Form.Select value={taskPriority} onChange={e => setTaskPriority(e.currentTarget.value)} aria-label="Default select example">
                      <option>Select a Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="Urgent">Urgent</option>
                      </Form.Select>
                    <Form.Label>Due Date</Form.Label>
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
                    <Form.Label>Title</Form.Label>
                    <Form.Control size="sm" type="text" value={projectTitle} onChange={e => setProjectTitle(e.currentTarget.value)} placeholder="Title" />
                    <Form.Label>Description</Form.Label>
                    <Form.Control size="sm" type="text" value={projectDescription} onChange={e => setProjectDescription(e.currentTarget.value)} placeholder="Description" />
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control size="sm" type="date" value={projectDueDate} onChange={e => setProjectDueDate(e.currentTarget.value)} placeholder="Due Date" />  
                    <Form.Label>Priority</Form.Label>                
                    <Form.Select value={projectPriority} onChange={e => setProjectPriority(e.currentTarget.value)} aria-label="Default select example">
                      <option>Select a Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="Urgent">Urgent</option>
                    </Form.Select>
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
                      <Button variant="dark" type="submit" onClick={handleChange}>Update</Button>
                      <Button variant="secondary"  onClick={handleCloseUpdate}>Cancel </Button>
                    </Modal.Footer>
                </Modal>
                {/* --------------------------------------------------------DELETE PROJECT MODAL */}
    <Modal show={showDelete} onHide={handleCloseDelete}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                 >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                   <h4>Are you Sure you want to Delete it?</h4>
                    </Modal.Body>
                    <Modal.Footer> 
                      <Button variant="dark" type="submit" onClick={() => deleteProject()}>Confirm</Button>
                      <Button variant="secondary"  onClick={handleCloseDelete}>Cancel </Button>
                    </Modal.Footer>
                </Modal>
    </ >
    )   
}
