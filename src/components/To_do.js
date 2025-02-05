import React, { useState } from 'react'
import './To_do.css'
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [message, setmessage] = useState()
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            // const validity = await validationSchema.isValid({ taskname, status })
            // console.log(validity)

            await validationSchema.validate({ taskname, status }, { abortEarly: false })
            console.log(validationSchema)

            if (taskname != '' && status != '') {
                let newtask = { id: Math.random(), title: taskname, status: status }
                settasks([...tasks, newtask])
                toast("ADDED");
                settaskname("")
            }
        } catch (err) {
            // err.errors.map((error) => {
            //     toast.error(error)
            // });
            setmessage(err.errors.map((error) => (`${error},`)))
            console.log(err.errors)

            
            
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
        <div className='main'>
            <h1>TO-DO-LIST</h1>
            <ToastContainer />
            <form onSubmit={handlesubmit} >
                <div>
                    <label>
                        Task:<input type='text' value={taskname} onChange={(e) => settaskname(e.target.value, id)} />
                    </label>
                </div>
                <div>
                    <label>Status:</label>
                    <select value={(status)} onChange={(e) => setstatus(e.target.value)}>
                        <option value='Completed'>Completed</option>
                        <option value='incomplete'>Incomplete</option>
                    </select>
                </div>
                <div>
                    <span id='error'>{message}</span>
                </div>
                <div>
                    {id ? <button onClick={() => handleUpdate(id)}>UPDATE</button> : <button type='submit' value='submit'>Submit</button>}

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
                            <td><button onClick={() => handledelete(t.id)} >DELETE</button></td>
                            <td><button onClick={() => handleEdit(t.id)} >EDIT</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default To_do