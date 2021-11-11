import React from "react";
import { useHistory } from "react-router-dom";


export default function TitlePage(){
    
    const history = useHistory();
    return(
        <>
        <h1>TITLE PAGE</h1>
        <button onClick={() => history.push("/dashboard")}>Continue to dashboard</button>
        </>
    )
}