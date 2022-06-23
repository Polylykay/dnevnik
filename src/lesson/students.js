import React, {useEffect, useState} from "react";
import {sendQuery} from "../sendQuery";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";

export const Students = (props) => {
    const [state, setState] = useState({toUpdate: true, students: []})
    useEffect(() => {
        if (state.toUpdate && props.groupId !== undefined){
            sendQuery(`SELECT STID FROM groupStList where GID=${props.groupId}`)
                .then(l => {
                    setState({...state, toUpdate: false,
                        students: l.map(el => {
                            return {STID: el.STID, score: 0}
                        })
                    })
                })
        }
    });
    const changeScore = (event, student) => {
        const newValue = event.target.value;
        setState({
            ...state,
            students: [
                ...state.students.filter(el => el.STID !== student.STID),
                {...student, score: newValue}
            ]
        } )
    }

    return (
        <div style={{ minWidth: 650, maxWidth: '70vw', margin: '100px auto' }}>
            <Link to={'/'} style={{color: 'blue', textDecoration: 'none'}}>Назад</Link>
            <TableContainer sx={{marginTop: '10px'}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Студент</TableCell>
                            <TableCell >Оценка</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state.students.sort((a, b) => a.STID.localeCompare(b.STID)).map((s, i) => {
                                return (
                                    <TableRow key={i} className="score-row">
                                        <TableCell>{s.STID}</TableCell>
                                        <TableCell sx={{width: 200}}>
                                            <TextField
                                                label="" variant="standard" type="number" min="-10" max="10" value={s.score}
                                                onChange={(e) => changeScore(e, s)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        <TableRow>
                            <TableCell />
                            <TableCell align="right">
                                <Button variant="contained" color="success" onClick={() => props.sendMarks(state)}>Отправить</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
