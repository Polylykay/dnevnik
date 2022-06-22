import {sendQuery} from "../sendQuery";
import {useState} from "react";
import React from "react";
import {useParams} from "react-router";
import {Students} from "./students";

export const Lesson = () => {
    const [state, setState] = useState([])
    const { id } = useParams();
    return (
        <Students id={id}/>
    )
}
