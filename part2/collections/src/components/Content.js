
import React from "react"

const PartItem = (props) => {
    return (
        <p>
            {props.name} {props.num}
        </p>
    )
}

const Content = (props) => {
    return (
        props.parts.map(part => <PartItem key={part.id} name={part.name} num={part.exercises} />)
    )
}

export default Content