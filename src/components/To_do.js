import React, { useState } from 'react'
import './To_do.css'
import * as Yup from 'yup';

function To_do() {

    const [taskname, settaskname] = useState('')
    const [tasks, settasks] = useState([])
    const [status, setstatus] = useState('incomplete')

    const validationSchema = Yup.object().shape({
        taskname: Yup.string().min(10, "Must be at least 10 characters").required('Task name is required'),
        status: Yup.string().required("Status is required"),
    })
    const handlesubmit = async (e) => {
        e.preventDefault()
        let formdata = {
            taskname: e.target.value,
            status:e.target.value
        }
        const isvalid =await validationSchema.isValid(formdata)
        
       

        if (taskname !='' && status != '') {
            let newtask = { id: Math.random(), title: taskname, status: status }
            settasks([...tasks, newtask])
            
            settaskname("")
        }
    }
    const handledelete = (id) => {
        let tem = [...tasks]
        for (var i = 0; i < tem.length; i++) {
            if (tem[i].id == id) {
                tem.splice(i, 1)
                break
            }
        }
        settasks(tem)
    }
    const handlestatusupdate = (e, id) => {
        let tem = [...tasks]
        for (var i = 0; i < tem.length; i++) {
            if (tem[i].id == id) {
                tem[i].status = e
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
                setid('')
                settaskname("")
            }
        }
        settasks(tem)
    }


    return (
        <div className='main'>
            <h1>TO-DO-LIST</h1>
            <form onSubmit={handlesubmit} >
                <div>
                    <label>
                        Task:<input type='text' value={taskname} onChange={(e) => settaskname(e.target.value, id)} />
                        
                        {error}
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