import React from "react"
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const Course = (props) => {
    const { name, parts } = props.course
    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Footer total={total} />
        </div>
    )
}

export default Course