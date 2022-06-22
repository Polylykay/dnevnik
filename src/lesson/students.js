import React, {useState} from "react";
import {sendQuery} from "../sendQuery";
export const Students = (props) => {
    const [state, setState] = useState([])
    sendQuery(`SELECT StudentId FROM GroupStudentList where GroupId=${props.id}`).then(students => {
        setState(students)
    })
    return (
        <table>
            <thead>
            <tr>
                <th>Student Id</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {
                state.map((s) => {
                    return (
                        <tr className="score-row">
                            <td>${s.StudentId}</td>
                            <td>
                                <input type="number" min="-10" max="10" value={s.score}
                                       onChange={() => console.log(s.score)}/>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}
