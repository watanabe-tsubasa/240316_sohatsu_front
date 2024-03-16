import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => {setCount(current => current + 1)}}>inc</Button>
      <Button onClick={() => {setCount(current => current - 1)}}>dec</Button>
      <p>
        {count}
      </p>
    </>
  )
}

export default App
