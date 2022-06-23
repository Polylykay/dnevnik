import {sendQuery} from "../sendQuery";
import {useEffect, useState} from "react";
import React from "react";
import {useParams} from "react-router";
import {Students} from "./students";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const Lesson = () => {
    const [state, setState] = useState({toUpdate: true, lesson: {}})
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const { id } = useParams();
    const sendMarks = (state) => {
        let promises = []
        for (const student of state.students) {
            promises.push(
                sendQuery(`REPLACE into  scoreChanges (CID, STID, SCORE) VALUES ('${id}', '${student.STID}', '${student.score}')`)
            )
        }
        Promise.all(promises).then(res => {
            handleOpen(true)
        })
            .catch(() => {
                handleOpenError(true)
            })
    }
    useEffect(() => {
        if (state.toUpdate){
            sendQuery(`SELECT CID, "DATE", NP, TID, TITLE, GID FROM schedule s LEFT JOIN skills sk on sk.SID = s.SID where CID = ${id}`)
                .then(l => {
                    setState({...state, toUpdate: false, lesson: l[0]})
                })
        }
    });

    const handleOpen = (isOpen) => {
        setOpenError(false)
        setOpen(isOpen)
    }
    const handleOpenError = (isOpen) => {
        setOpen(false)
        setOpenError(isOpen)
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={3500} onClose={handleOpen}>
                <Alert onClose={handleOpen} severity="success" sx={{ width: '100%' }}>
                    Успех!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleOpenError}>
                <Alert onClose={handleOpenError} severity="error" sx={{ width: '100%' }}>
                    Ошибка
                </Alert>
            </Snackbar>
            <Students groupId={state.lesson.GID} sendMarks={sendMarks}/>
        </>
    )
}
