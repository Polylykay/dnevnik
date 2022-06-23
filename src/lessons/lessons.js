import {sendQuery} from "../sendQuery";
import {useEffect, useState} from "react";
import React from "react";
import {useNavigate} from "react-router";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {TableBody} from "@mui/material";
import {Link} from "react-router-dom";


export const Lessons = () => {
    const [state, setState] = useState({toUpdate: true, lessons: []})
    useEffect(() => {
        if (state.toUpdate){
            sendQuery('SELECT CID, `DATE`' + ', NP, TID, TITLE FROM schedule s LEFT JOIN skills sk on sk.SID = s.SID')
                .then(l => {
                    setState({...state, toUpdate: false, lessons: l})
                })
        }
    })
    const navigate = useNavigate();
    const goToLesson = (id) => {
        navigate("/lesson/" + id, { replace: true });
    }
    return (
        <div style={{ minWidth: 650, maxWidth: '70vw', margin: '100px auto' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата пары</TableCell>
                            <TableCell>Номер пары</TableCell>
                            <TableCell>Преподаватель</TableCell>
                            <TableCell>Предмет</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state.lessons.map((lesson, index) => {
                                return (
                                    <TableRow key={index} onClick={() => goToLesson(lesson.CID)}>
                                        <TableCell>{lesson.DATE}</TableCell>
                                        <TableCell>{lesson.NP}</TableCell>
                                        <TableCell>{lesson.TID}</TableCell>
                                        <TableCell>{lesson.TITLE}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{textAlign: 'center'}}>
                <Link to={'add-new-lesson'} style={{color: 'blue', textDecoration: 'none'}}>
                    Создать новую пару
                </Link>
            </div>
        </div>
    )
}
// <Link to={'/lessons/' + lesson.CID} >
// </Link>
