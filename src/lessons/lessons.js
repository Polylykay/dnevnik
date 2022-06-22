import {sendQuery} from "../sendQuery";
import {useEffect, useState} from "react";
import React from "react";
import {Link} from "react-router-dom";

export const Lessons = () => {
    const [state, setState] = useState({toUpdate: true, lessons: []})
    useEffect(() => {
        if (state.toUpdate){
            sendQuery('SELECT CID, "DATE", NP, TID, TITLE FROM `schedule` s LEFT JOIN skills sk on sk.SID = s.SID')
                .then(l => {
                    setState({...state, toUpdate: false, lessons: l})
                })
        }
    })
    return (
        <>
            <table>
                <tbody>
                {
                    state.lessons.map((lesson, index) => {
                        return (
                            <tr key={index}>
                                <Link to={'/lessons/' + lesson.CID} >

                                    <td>{lesson.DATE}</td>
                                    <td>{lesson.NP}</td>
                                    <td>{lesson.TID}</td>
                                    <td>{lesson.TITLE}</td>
                                </Link>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <h2>Добавить пару</h2>
            <form>
                <label htmlFor="ClassDate">Дата</label>
                <input type="text" id="ClassDate" />
                <label htmlFor="PairNumber">Номер пары</label>
                <input type="number" min="1" max="5" id="PairNumber" />
                <label htmlFor="TeacherId">Учитель</label>
                <input type="text" id="TeacherId" />
                <label htmlFor="Skill">Предмет</label>
                <input type="text" id="Skill" />
                <label htmlFor="Group">Группа</label>
                <input type="text" id="Group" />
                <button id="addPair">Добавить</button>
            </form>
        </>
    )
}
