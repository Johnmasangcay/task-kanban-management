import React, { useState, useEffect } from "react";
import '../App.css';
import { getTaskData, getProjectData, addProject, addTask, db, firebase, getUniqueId, updateProject, deleteProject, getProject, getTask, getTaskByID, updateTask, getTaskUniqueId, deleteTask } from "./firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Modal, Form, FloatingLabel, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RiErrorWarningLine } from 'react-icons/fa';
export default function DashboardPage(props) {
    // -------------------------------------------------------------------------------------------------------LOCAL STORAGE

    // -------------------------------------------------------------------------------------------------------

    const [todo, setTodo] = useState([])
    const [inprogress, setInprogress] = useState([])
    const [complete, setComplete] = useState([])
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


    const [taskUpdateModalShow, setTaskUpdateModalShow] = useState(false);
    const taskUpdateHandleModalClose = () => setTaskUpdateModalShow(false)
    const taskUpdateHandleModalShow = () => setTaskUpdateModalShow(true)

    const [taskDeleteModalShow, setTaskDeleteModalShow] = useState(false);
    const taskDeleteHandleModalClose = () => setTaskDeleteModalShow(false)
    const taskDeleteHandleModalShow = () => setTaskDeleteModalShow(true)


    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("")
    const [projectDateCreated, setProjectDateCreated] = useState(new Date())
    const [projectPriority, setProjectPriority] = useState('')
    const [projectDueDate, setProjectDueDate] = useState('')
    //---------------------------------------------------------------------------------------PROJECT DATA
    const [project, setProject] = useState([])
    useEffect(async () => {
        await getProject()
        setProject(await getProjectData())
        await getTask()
        let getItemFromLocal = JSON.parse(localStorage.getItem("kanBan Project"))
        if (getItemFromLocal && getItemFromLocal != null) {
            setTaskDataArr([])
            let UniqueId = await getUniqueId(getItemFromLocal);
            let taskArr = await getTaskByID(UniqueId);
            setTaskDataArr(taskArr);
            setTodo(await taskArr.filter(taskStat => taskStat.taskStatus == "Todo"));
            setInprogress(await taskArr.filter(taskStat => taskStat.taskStatus == "InProgress"));
            setComplete(await taskArr.filter(taskStat => taskStat.taskStatus == "Complete"));
        }
    }, [])
    //-----------------------------------------------------------------------------------------TASK DATA
    const [taskDataArr, setTaskDataArr] = useState([])

    function onAdd(e) {
        addProject({
            projectDescription: projectDescription,
            projectDateCreated: projectDateCreated,
            projectPriority: projectPriority,
            projectDueDate: projectDueDate,
            projectTitle: projectTitle,
        }).then(() => {
            setProjectTitle('')
            setProjectDescription('')
        })
        setTimeout(function () {
            window.location.reload();
        }, 500)
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



    const onSubmit = async (e) => {
        addTask({
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskPriority: taskPriority,
            taskStatus: taskStatus,
            taskDateCreated: taskDateCreated,
            taskDueDate: taskDueDate,
            taskId: taskId
        }).then(() => {
            setTaskTitle("");
            setTaskDescription("");
            setTaskPriority("");
            setTaskStatus("");
            setTaskDateCreated("");
            setTaskDueDate("");
        })
        setTodo(await taskDataArr.filter(taskStat => taskStat.taskStatus == "Todo"));
        setInprogress(await taskDataArr.filter(taskStat => taskStat.taskStatus == "InProgress"));
        setComplete(await taskDataArr.filter(taskStat => taskStat.taskStatus == "Complete"));
        await TaskModalHandleClose()
        // await projectSelected()
    }
    function handleChange() {
        let updateProj = {
            projectDescription: projectDescription,
            projectTitle: projectTitle
        }
        updateProject(projectDescription, projectTitle)
        setTimeout(function () {
            window.location.reload();
        }, 500)
        console.log(updateProj)
    }

    const projectSelected = async (e) => {
        localStorage.setItem("kanBan Project", JSON.stringify(e.target.value))
        setTaskDataArr([])
        let UniqueId = await getUniqueId(e.target.value);
        let taskArr = await getTaskByID(UniqueId);
        setTaskDataArr(taskArr);
        setTodo(await taskArr.filter(taskStat => taskStat.taskStatus == "Todo"));
        setInprogress(await taskArr.filter(taskStat => taskStat.taskStatus == "InProgress"));
        setComplete(await taskArr.filter(taskStat => taskStat.taskStatus == "Complete"));
        // console.log(localStorage.setItem("kanBan Project", JSON.stringify({name: "JOHN"})))   
    }

    const taskHandleChange = async () => {
        let setUpdateTask = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskPriority: taskPriority,
            taskStatus: taskStatus,
            taskDueDate: taskDueDate
        }
        updateTask(taskTitle, taskStatus, taskPriority, taskDueDate, taskDescription);
        setTodo(await taskDataArr.filter(taskStat => taskStat.taskStatus == "Todo"));
        setInprogress(await taskDataArr.filter(taskStat => taskStat.taskStatus == "InProgress"));
        setComplete(await taskDataArr.filter(taskStat => taskStat.taskStatus == "Complete"));
        taskUpdateHandleModalClose()
        setTimeout(function () {
            window.location.reload();
        }, 500)
        console.log(setUpdateTask)
    }

    // ----------------------------------------------------------------------------------------------TASK ONSUBMIT END
    return (
        <>

            {/* ------------------------------------------------------------------------------------RETURN START */}

            <Container>

                <Row>
                    <Col className="title d-flex justify-content-center py-3"><h2>CODESTACK TASK TRACKER</h2></Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col md={2} className="d-flex justify-content-end">
                        <div className="addProjectBtn projSelected"> <Button variant="outline-info" onClick={handleShow}>New Project</Button ></div>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center">
                        <div className="addProjectBtn projSelected"><Button variant="outline-info" onClick={handleShowUpdate}>Upd Project</Button></div>
                    </Col>
                    <Col md={2}>
                        <div className="addProjectBtn projSelected"><Button variant="outline-info" onClick={handleShowDelete}>Del Project</Button></div>
                    </Col>


                    <Col md={2}>
                        <Form.Select onChange={projectSelected} aria-label="Default select example">
                            <option className="projSelected" value="">Select A Project</option>
                            {project.map((projectItems, prop) => {
                                return (
                                    <>
                                        <option key={prop} value={projectItems.projectTitle} className="projSelected">{projectItems.projectTitle}</option>
                                    </>
                                )
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="btnExclamation">



                </Row>
                <Row className="addTaskBtn pt-3">
                    <Button variant="info" className="title" onClick={TaskModalHandleShow}>ADD TASK</Button>
                </Row>
                <Row className="todolist">
                    <Col>
                        <h2 className="todoInprogCom d-flex justify-content-center">ToDo</h2>
                    </Col>
                    <Col>
                        <h2 className="todoInprogCom d-flex justify-content-center">InProgress</h2>
                    </Col>
                    <Col>
                        <h2 className="todoInprogCom d-flex justify-content-center">Complete</h2>
                    </Col>
                </Row>

                <Row className="kanban pt-3">
                    <Col className="d-flex justify-content-center todo">
                        {todo.length > 0 ? todo.map((todoTask) => {
                            return (
                                <>
                                    <Card className="cardStyle" style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title className="projSelected" type="btn" value={todoTask.taskTitle} onClick={async (event) => await getTaskUniqueId(event.target.textContent)}>{todoTask.taskTitle}</Card.Title>
                                            <Card.Subtitle className="mb-2 title text-muted">{todoTask.taskPriority}</Card.Subtitle>
                                            <Card.Text> {todoTask.taskDescription} </Card.Text>
                                            <Card.Text className="dueDate"> {todoTask.taskDueDate} </Card.Text>

                                            <OverlayTrigger overlay={<Tooltip id="tooltip">To Edit or Delete This task you will need to press your task title then press EDIT!   NOTES:When you add a task make sure to refresh it! THANK YOU</Tooltip>}>
                                                <span >
                                                    <Button className="" variant="secondary" style={{ pointerEvents: 'none' }}>
                                                        !
                                                    </Button>
                                                </span>
                                            </OverlayTrigger>

                                            <Button className="title" variant="info" onClick={taskUpdateHandleModalShow}>EDIT</Button>
                                            <Button variant="outline-info" onClick={taskDeleteHandleModalShow}>DELETE</Button>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }) : null}
                    </Col>

                    <Col className="d-flex justify-content-center inprogress ">
                        {inprogress.length > 0 ? inprogress.map((inprogressTask) => {
                            return (
                                <>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title className="projSelected" type="btn" value={inprogressTask.taskTitle} onClick={async (event) => await getTaskUniqueId(event.target.textContent)}>{inprogressTask.taskTitle}</Card.Title>
                                            <Card.Subtitle className="mb-2 title text-muted">{inprogressTask.taskPriority}</Card.Subtitle>
                                            <Card.Text> {inprogressTask.taskDescription} </Card.Text>
                                            <Card.Text className="dueDate"> {inprogressTask.taskDueDate} </Card.Text>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip">To Edit or Delete This task you will need to press your task title then press EDIT!   NOTES:When you add a task make sure to refresh it! THANK YOU</Tooltip>}>
                                                <span >
                                                    <Button className="" variant="secondary" style={{ pointerEvents: 'none' }}>
                                                        !
                                                    </Button>
                                                </span>
                                            </OverlayTrigger>
                                            <Button className="title" variant="info" onClick={taskUpdateHandleModalShow}>EDIT</Button>
                                            <Button classname="title" variant="outline-info" onClick={taskDeleteHandleModalShow}>DELETE</Button>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }) : null}
                    </Col>

                    <Col className="d-flex justify-content-center completed">
                        {complete.length > 0 ? complete.map((completeTask) => {
                            return (
                                <>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title className="projSelected" type="btn" value={completeTask.taskTitle} onClick={async (event) => await getTaskUniqueId(event.target.textContent)}>{completeTask.taskTitle}</Card.Title>
                                            <Card.Subtitle className="mb-2 title text-muted">{completeTask.taskPriority}</Card.Subtitle>
                                            <Card.Text> {completeTask.taskDescription} </Card.Text>
                                            <Card.Text className="dueDate"> {completeTask.taskDueDate} </Card.Text>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip">To Edit or Delete This task you will need to press your task title then press EDIT!   NOTES: When you add a task make sure to refresh it! THANK YOU</Tooltip>}>
                                                <span >
                                                    <Button className="" variant="secondary" style={{ pointerEvents: 'none' }}>
                                                        !
                                                    </Button>
                                                </span>
                                            </OverlayTrigger>
                                            <Button className="title" variant="info" onClick={taskUpdateHandleModalShow}>EDIT</Button>
                                            <Button variant="outline-info" onClick={taskDeleteHandleModalShow}>DELETE</Button>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }) : null}
                    </Col>
                </Row>





                {/* ---------------------------------------------------------------------------------------TASK DATA */}


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
                    <Form.Select value={taskStatus} onChange={e => setTaskStatus(e.currentTarget.value)} aria-label="Default select example">
                        <option>Select a Status</option>
                        <option value="Todo">Todo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Complete">Complete</option>
                    </Form.Select>
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
                    <Button variant="secondary" onClick={TaskModalHandleClose}>Cancel </Button>
                </Modal.Footer>
            </Modal>
            {/* -----------------------------------------------------------------------------------------------FOR TASK UPDATE MODAL */}
            <Modal show={taskUpdateModalShow} onHide={taskUpdateHandleModalClose}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modalTitle">Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Title</Form.Label>
                    <Form.Control size="sm" type="text" value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)} placeholder="Title" />
                    <Form.Label>Description</Form.Label>
                    <Form.Control size="sm" type="text" value={taskDescription} onChange={e => setTaskDescription(e.currentTarget.value)} placeholder="Description" />
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={taskStatus} onChange={e => setTaskStatus(e.currentTarget.value)} aria-label="Default select example">
                        <option>Select a Status</option>
                        <option value="Todo">Todo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Complete">Complete</option>
                    </Form.Select>

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
                    <Button variant="dark" type="submit" onClick={taskHandleChange}>Update</Button>
                    <Button variant="secondary" onClick={taskUpdateHandleModalClose}>Cancel </Button>
                </Modal.Footer>
            </Modal>
            {/* --------------------------------------------------------------------------------------------------FOR TAST DELETE MODAL */}
            <Modal show={taskDeleteModalShow} onHide={taskDeleteHandleModalClose}
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
                    <Button variant="dark" type="submit" onClick={() => deleteTask()}>Confirm</Button>
                    <Button variant="secondary" onClick={taskDeleteHandleModalClose}>Cancel </Button>
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
                    <Button variant="secondary" onClick={handleClose}>Cancel </Button>
                </Modal.Footer>
            </Modal>
            {/* ------------------------------------------------------------FOR UPDATE PROJECT MODAL */}
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
                    <Button variant="secondary" onClick={handleCloseUpdate}>Cancel </Button>
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
                    <Button variant="secondary" onClick={handleCloseDelete}>Cancel </Button>
                </Modal.Footer>
            </Modal>
        </ >
    )
}
