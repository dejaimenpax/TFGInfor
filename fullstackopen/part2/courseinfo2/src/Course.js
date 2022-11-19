const Header2 = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const totalAmount = parts.reduce( (suma, parte) =>  suma + parte.exercises , 0 )
  console.log(totalAmount)
  return (
    <>
      {parts.map( x => <Part key={x.id} part={x} />)}
      <Total sum={totalAmount} />
    </> 
  )
}

const Course = ({ course }) => 
  <>
    <Header2 course={course.name} />
    <Content parts={course.parts} /> 
  </>

export default Course