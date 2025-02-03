import React, { useState } from 'react'
import './To_do.css'

function To_do() {
    const [taskname, settaskname] = useState('')
    const [tasks, settasks] = useState([])
    const [status, setstatus] = useState('incomplete')
    const handlesubmit = (e) => {
        e.preventDefault()
        if (taskname != '' && status != '') {
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
    return (
        <div className='main'>
            <h1 class="text-3xl font-bold underline">TO-DO-LIST</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label>
                        Task:<input type='text' value={taskname} onChange={(e) => settaskname(e.target.value)} />
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
                    <button type='submit' value='submit'>Submit</button>
                </div>
            </form>

            <table class='table'>
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
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default To_do