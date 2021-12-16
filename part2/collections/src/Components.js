
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

const Header = (props) => {
    return (
        <h2>{props.name}</h2>
    )
}

const Content = (props) => {
    return (
        props.parts.map(part => <PartItem key={part.id} name={part.name} num={part.exercises} />)
    )
}

const PartItem = (props) => {
    return (
        <p>
            {props.name} {props.num}
        </p>
    )
}

const Footer = (props) => {
    return (
        <h3>Total of {props.total} exercises</h3>
    )
}
