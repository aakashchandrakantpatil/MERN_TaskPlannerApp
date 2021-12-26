import React, {useContext} from 'react'
import { UserContext } from "../../../context/UserContext";
import './Styles.scss'

const TaskBox = (props) => {
    
    const [userContext] = useContext(UserContext);

    const handleTaskClick = () => {

    }
    
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        // call delete task API from backend
        // deletes task object, removes task from plan
        fetch(process.env.REACT_APP_API_ENDPOINT + `/tasks/${props.task._id}`, {
            method: "Delete",
            headers: {
                "Authorization": `Bearer ${userContext.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "planId": props.planId })
        })
        .then(async (res) => {
            const data = await res.json();
            console.log(data)
            props.setAddTaskResponse(data);
        })
    }

    return (
        <div className="taskCard">
            <div className="title"> {props.task.title}</div>
            {/* <div class="d-flex flex-row">{
                props.task.priority ?
                    <span className={props.task.priority}>{props.task.priority}</span> : null
                }
                { 
                props.task.dueDate ? <span className="dueDate">{props.task.dueDate.substring(0, 10)}</span>  : null
                }
            </div> */}
            <div class="d-flex flex-row-reverse">
                <a onClick={handleDeleteClick}><ion-icon name="trash-outline"></ion-icon></a>
            </div>
        </div>
    )
}

export default TaskBox
