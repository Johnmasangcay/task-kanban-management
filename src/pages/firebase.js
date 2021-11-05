import React, {useState} from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';

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
     projectData.length = 0;
    const querySnapshot = await getDocs(collection(db, "ProjectTask"));
    querySnapshot.forEach((doc) => {
        if (doc.data().projectTitle == e) {
            console.log(projId)
            return projId = doc.id;   
        }                
  });   
}

async function UpdateProject(props, projId) {
    projectData.length = 0;
    const querySnapshot = await getDocs(collection(db, "ProjectTask", projId));
    querySnapshot.forEach((doc) => {
        updateDoc({
          projectDescription: props.projectDescription,
          projectTitle: props.projectTitle
        })
  });
    // const docRef = doc(db, "ProjectTask", projId).updateDoc(docRef, {
    //     projectTitle: props.projectTitle
    // });
    // console.log(getProject())
    // return getProject()
}
//---------------------------------------------------------------------------------//

async function addProject(props, projId){
    try {
        const docRef = await addDoc(collection(db, "ProjectTask"), {
          dateCreated: props.projectDateCreated,
          projectDescription: props.projectDescription,
          projectTitle: props.projectTitle
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
});
};

function getTaskData(){
    return taskData.sort((c, d)=> c.ID - d.ID);
}
// -----------------------------------------------------------------------------//

async function addTask(props){
    try {
        const docRef = await addDoc(collection(db, "AddTask"), {
          taskID: projId,
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
export {getProject, getTask, firebase, db, getProjectData, getTaskData, addProject, addTask, getUniqueId, UpdateProject}