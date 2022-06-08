
const Hello = (props) => {
  return (
    <div>
      <p> Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://tingwei.fans">Ting Wei</a>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const age = 10 
  const name = "John" 
  return (
  <div>
    <h1> Greetings </h1>
    <Hello name = "George" age = {25} />
    <Hello name = {name} age = {age}/>
    <Footer />
  </div>
  )
}

export default App