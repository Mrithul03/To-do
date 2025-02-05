import React, { useState } from 'react'
import './To_do.css'
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {}  from 'formik'

function To_do() {

    const [taskname, settaskname] = useState('')
    const [tasks, settasks] = useState([])
    const [status, setstatus] = useState('')

    const validationSchema = Yup.object().shape({
        taskname: Yup.string()
            .min(10, "Task name must be at least 10 characters")
            .required("Task name is required"),
        status: Yup.string()
            .oneOf(["Completed", "incomplete"], "Select the status")
            .required("Status is required"),
    })
    const [message, setmessage] = useState({})
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            if(await validationSchema.isValid({ taskname, status })){
                if (taskname != '' && status != '') {
                    let newtask = { id: Math.random(), title: taskname, status: status }
                    settasks([...tasks, newtask])
                    toast("ADDED");
                    settaskname("")
                    setmessage('')
                }
            }else{
                await validationSchema.validate({ taskname, status }, { abortEarly: false })
                console.log(validationSchema)

            }    
        } catch (err) {
            // err.errors.map((error) => {
            //     toast.error(error)
            // });
            // setmessage(err.errors.map((error) => (`${error},`)))
            console.log(err.errors);  
            const newerr={}
            err.inner.map((error)=>{
              newerr[error.path]=error.message
            })
            setmessage(newerr)
            console.log(message)
            
        }   
    }
    const handledelete = (id) => {
        let tem = [...tasks]
        for (var i = 0; i < tem.length; i++) {
            if (tem[i].id == id) {
                tem.splice(i, 1)
                toast("DELETED");
                break;
            }
        }
        settasks(tem)
    }
    const handlestatusupdate = (e, id) => {
        let tem = [...tasks]
        for (var i = 0; i < tem.length; i++) {
            if (tem[i].id == id) {
                tem[i].status = e
                toast("STATUS_UPDATED");
            }
        }
        settasks(tem)
    }

    const handleEdit = (id) => {
        let tem = [...tasks]
        for (var i = 0; i < tem.length; i++) {
            if (tem[i].id == id) {
                settaskname(tem[i].title)
                setstatus(tem[i].status)
                setid(tem[i].id)
            }
        }
    }
    const [id, setid] = useState(false)

    const handleUpdate = (id) => {
        let tem = [...tasks]
        for (var i = 0; i < tem.length; i++) {
            if (tem[i].id == id) {
                tem[i].status = status
                tem[i].title = taskname
                toast("EDITED");
                setid('')
                settaskname("")
            }
        }
        settasks(tem)
    }


    return (
        <div className='to-do-container'>
            <h1>TO-DO-LIST</h1>
            <ToastContainer />
            <form onSubmit={handlesubmit} >
                <div>
                    <label>
                        Task:<input 
                        className='input_btn'
                        type='text' 
                        placeholder='Enter your task'
                        value={taskname} 
                        onChange={(e) => settaskname(e.target.value, id)} />
                       {message.taskname && <div id="error">{message.taskname}</div>}
                    </label>
                    <label>Status:</label>
                    <select className='input_btn' value={(status)} onChange={(e) => setstatus(e.target.value)}>
                        <option value='Completed'>Completed</option>
                        <option value='incomplete'>Incomplete</option>
                    </select>
                    {message.status && <span id='error'> {message.status}</span>}
                    {id ? <button id='btn' onClick={() => handleUpdate(id)}>UPDATE</button> : <button id='btn' type='submit' value='submit'>Submit</button>}
                </div>
                
                
                    

                
            </form>

            <table className='table'>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>TASK</td>
                        <td>STATUS</td>
                    </tr>
                    {tasks.map((t) => (

                        <tr>
                            <td>{t.id}</td>
                            <td>{t.title}</td>
                            <td><select value={(t.status)} onChange={(e) => handlestatusupdate(e.target.value, t.id)}>
                                <option value='Completed'>Completed</option>
                                <option value='incomplete'>Incomplete</option>
                            </select></td>
                            <td><button className='edit-btn' onClick={() => handledelete(t.id)} >DELETE</button></td>
                            <td><button className='delete-btn' onClick={() => handleEdit(t.id)} >EDIT</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default To_do