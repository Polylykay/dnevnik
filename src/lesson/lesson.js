import {sendQuery} from "../sendQuery";
import {useEffect, useState} from "react";
import React from "react";
import {useParams} from "react-router";
import {Students} from "./students";

export const Lesson = () => {
    const [state, setState] = useState({toUpdate: true, lesson: {}})
    const { id } = useParams();
    useEffect(() => {
        if (state.toUpdate){
            sendQuery(`SELECT CID, "DATE", NP, TID, TITLE, GID FROM schedule s LEFT JOIN skills sk on sk.SID = s.SID where CID = ${id}`)
                .then(l => {
                    console.log(l)
                    setState({...state, toUpdate: false, lesson: l[0]})
                })
        }
    });
    return (
        <Students groupId={state.lesson.GID}/>
    )
}
