import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {sendQuery} from "../sendQuery";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {Link} from "react-router-dom";

export const AddNewLesson = () => {
    const [state, setState] = useState({
        teachers: [],
        skills: [],
        groups: [],
        form: {
            date: '',
            pair: '',
            teacher: {},
            skill: {},
            group: {},
        }
    })
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    useEffect(() => {
        if (!state.teachers.length) {
            sendQuery(`SELECT TID, SID FROM Teachers`)
                .then(t => {
                    setState({
                        ...state,
                        teachers: t
                    })
                })
        }
        if (!state.skills.length) {
            sendQuery(`SELECT TITLE, SID FROM skills`)
                .then(s => {
                    setState({
                        ...state,
                        skills: s
                    })
                })
        }
        if (!state.groups.length) {
            sendQuery(`SELECT * FROM groupSt`)
                .then(g => {
                    setState({
                        ...state,
                        groups: g
                    })
                })
        }
    });
    const changeTeacher = (e) => {
        setState({
            ...state,
            form: {
                ...state.form,
                teacher: e.target.value,
                skill: ''
            }
        })
    }
    const changeDate = (e) => {
        setState({
            ...state,
            form: {
                ...state.form,
                date: e.target.value
            }
        })
    }
    const changePair = (e) => {
        setState({
            ...state,
            form: {
                ...state.form,
                pair: e.target.value
            }
        })
    }
    const changeSkill = (e) => {
        setState({
            ...state,
            form: {
                ...state.form,
                skill: e.target.value
            }
        })
    }
    const changeGroup = (e) => {
        setState({
            ...state,
            form: {
                ...state.form,
                group: e.target.value
            }
        })
    }
    const sendForm = () => {
        const query = `INSERT INTO schedule (DATE, NP, TID, SID, GID) 
            VALUES ('${state.form.date}', '${state.form.pair}','${state.form.teacher.TID}',
            '${state.form.skill.SID}','${state.form.group.GID}')`
        sendQuery(query).then(res => {
            handleOpen(true)
        })
            .catch(() => {
                handleOpenError(true)
            })
    }
    const handleOpen = (isOpen) => {
        setOpen(isOpen)
    }
    const handleOpenError = (isOpen) => {
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
            <div style={{display: "grid", placeItems: "center", width: '100vw', height: '100vh', textAlign: 'center'}}>
                <div>
                    <Link to={'/'}>Вернуться к списку</Link>
                    <h2>Добавить пару</h2>
                    <form style={{minWidth: 500, maxWidth: '50vw', margin: 'auto', display: 'flex', flexDirection: 'column', gap: 15}}>
                        <TextField onChange={changeDate} label="Дата (ГГГГ-ММ-ДД)" variant="outlined"/>
                        <TextField onChange={changePair} label="Номер пары" variant="outlined"/>
                        <FormControl fullWidth>
                            <InputLabel id="add-new-lesson__teacher">Учитель</InputLabel>
                            <Select
                                labelId="add-new-lesson__teacher"
                                value={state.form.teacher}
                                label="Учитель"
                                onChange={changeTeacher}
                            >
                                {state.teachers.map((el, i) => <MenuItem key={i} value={el}>{el.TID}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="add-new-lesson__ skill">Предмет</InputLabel>
                            <Select
                                labelId="add-new-lesson__skill"
                                value={state.form.skill}
                                label="Предмет"
                                onChange={changeSkill}
                            >
                                {state.skills
                                    .filter(el => state.teachers
                                        .find(teacher => teacher.TID === state.form.teacher.TID && teacher.SID === el.SID))
                                    .map((el, i) => <MenuItem key={i} value={el}>{el.TITLE}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="add-new-lesson__teacher">Группа</InputLabel>
                            <Select
                                labelId="add-new-lesson__teacher"
                                value={state.form.group}
                                label="Группа"
                                onChange={changeGroup}
                            >
                                {state.groups.map((el, i) => <MenuItem key={i} value={el}>{el.TITLE}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button variant="outlined" onClick={sendForm}>Добавить</Button>
                    </form>
                </div>
            </div>
        </>

    )
}
