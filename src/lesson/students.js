import React, {useEffect, useState} from "react";
import {sendQuery} from "../sendQuery";
export const Students = (props) => {
    const [state, setState] = useState({toUpdate: true, students: []})
    useEffect(() => {
        if (state.toUpdate){
            sendQuery(`SELECT STID FROM groupStList where GID=${props.groupId}`)
                .then(l => {
                    setState({...state, toUpdate: false, students: l})
                })
        }
    });
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
                state.students.map((s) => {
                    return (
                        <tr className="score-row">
                            <td>{s.STID}</td>
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
