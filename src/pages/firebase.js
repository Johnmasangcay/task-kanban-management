import React, {useState} from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAPvCy5aLXDv03EXh8abWuPE88368ddj2s",
    authDomain: "task-tracker-masangcayj.firebaseapp.com",
    projectId: "task-tracker-masangcayj",
    storageBucket: "task-tracker-masangcayj.appspot.com",
    messagingSenderId: "684099477968",
    appId: "1:684099477968:web:e5f7cd4d96a64ebf1e19d5"
  };
  
  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore();
  const projectData = [];
  const taskData = [];
  let projId = "";
  let taskId = "";
// --------------------------------------------------------------------PROJECT---------------------------------------------------------------------------------//

async function getProject() {   
    projectData.length = 0;
    const querySnapshot = await getDocs(collection(db, "ProjectTask"));
    querySnapshot.forEach((doc) => {
    projectData.push(doc.data())            
  });
  console.log(projectData)
};


function getProjectData(){
    return projectData.sort((a, b)=> a.ID - b.ID);
}

const getUniqueId = async(e)=>{
    const querySnapshot = await getDocs(collection(db, "ProjectTask"));
    querySnapshot.forEach((doc) => {
        if (doc.data().projectTitle == e) {
             projId = doc.id;             
        }                
  });  
  console.log(projId) 
  return projId  
}
const getTaskUniqueId = async(event)=>{
    const querySnapshot = await getDocs(collection(db, "AddTask"));
    querySnapshot.forEach((doc) => {
        console.log(event)
        if (doc.data().taskTitle == event) {
            return taskId = doc.id;             
        }                       
  });  
  console.log(taskId)    
}

const getTaskByID = async(projId)=>{
     taskData.length = 0;
    const querySnapshot = await getDocs(collection(db, "AddTask"));
    querySnapshot.forEach((doc) => {
        if (doc.data().taskID == projId) {
            taskData.push(doc.data())             
        }                
  });  
  return taskData   
}

//---------------------------------------------------------------------------------//

async function addProject(props){
    try {
        const docRef = await addDoc(collection(db, "ProjectTask"), {
          dateCreated: props.projectDateCreated,
          projectDescription: props.projectDescription,
          projectPriority: props.projectPriority,
          projectDueDate: props.projectDueDate,
          projectTitle: props.projectTitle
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


async function updateProject(projectDescription, projectTitle) {
        console.log(projId)
        const docRef = doc(db, "ProjectTask", projId);
        await updateDoc(docRef,{
        projectDescription: projectDescription,
        projectTitle: projectTitle
    })  
}

async function updateTask(taskTitle, taskStatus, taskPriority, taskDueDate, taskDescription) {
        const docRef = doc(db, "AddTask", taskId);
        await updateDoc(docRef,{
            taskTitle: taskTitle,
            taskPriority: taskPriority,
            taskDueDate: taskDueDate,
            taskDescription: taskDescription,
            taskStatus: taskStatus
    })  
}

async function deleteProject(){
    await deleteDoc(doc(db, "ProjectTask", projId));
    setTimeout(function (){
        window.location.reload();
    }, 500)
}
async function deleteTask(){
    await deleteDoc(doc(db, "AddTask", taskId));
    setTimeout(function (){
        window.location.reload();
    }, 500)
}
//-------------------------------------------------------------------TASK-------------------------------------------------------------------------------------//
async function getTask() {
    taskData.length = 0;
    const querySnapshot = await getDocs(collection(db, "AddTask"));
    querySnapshot.forEach((doc) => {
    taskData.push(doc.data());
});
// console.log(taskData)
};

function getTaskData(){
    return taskData.sort((c, d)=> c.ID - d.ID);
}
// -----------------------------------------------------------------------------//

async function addTask(props){
    try {
        const docRef = await addDoc(collection(db, "AddTask"), {
          taskID: projId,
          taskDateCreated: props.taskDateCreated,
          taskDescription: props.taskDescription,
          taskDueDate: props.taskDueDate,
          taskPriority: props.taskPriority,
          taskStatus: props.taskStatus,
          taskTitle: props.taskTitle
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}



//-------------------------------------------------------------------END-----------------------------------------------------------------------------------------//
export {getProject, getTask, firebase, db, getProjectData, getTaskData, addProject, addTask, getUniqueId, updateProject, deleteProject, getTaskByID, updateTask, getTaskUniqueId, deleteTask}