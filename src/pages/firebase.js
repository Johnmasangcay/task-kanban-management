import React, {useState} from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

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
  let projectId = 0;
// --------------------------------------------------------------------PROJECT---------------------------------------------------------------------------------//
  async function getProject() {
    projectData.length = 0;
    const querySnapshot = await getDocs(collection(db, "ProjectTask"));
    querySnapshot.forEach((doc) => {
    projectData.push(doc.data());
    console.log(doc.data().projectID)
  });
};

function getProjectData(){
    // console.log(projectData)
    return projectData.sort((a, b)=> a.ID - b.ID);
}
//---------------------------------------------------------------------------------//
async function addProject(props){
    try {
        const docRef = await addDoc(collection(db, "ProjectTask"), {
          dateCreated: parseInt(props.projectDateCreated),
          description: props.projectDescription,
          projectID: projectId++,
          title: props.projectTitle
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
//-------------------------------------------------------------------TASK-------------------------------------------------------------------------------------//
async function getTask() {
    taskData.length = 0;
    const querySnapshot = await getDocs(collection(db, "AddTask"));
    querySnapshot.forEach((doc) => {
    taskData.push(doc.data());
    console.log(doc.data().taskID)
});
};

function getTaskData(){
    // console.log(taskData)
    return taskData.sort((c, d)=> c.ID - d.ID);
}
// -----------------------------------------------------------------------------//

async function addTask(props){
    try {
        const docRef = await addDoc(collection(db, "AddTask"), {
          dateCreated: parseInt(props.taskDateCreated),
          description: props.taskDescription,
          dueDate: parseInt(props.DueDate),
          priority: props.taskPriority,
          status: props.taskStatus,
          title: props.taskTitle
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}







//-------------------------------------------------------------------END-----------------------------------------------------------------------------------------//
export {getProject, getTask, firebase, db, getProjectData, getTaskData, addProject, addTask}