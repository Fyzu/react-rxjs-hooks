import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useObservable, useSubject } from 'react-rxjs-hooks'

function Application() {
  const [rawData, setRawData] = useState('nothing')

  const data$ = useSubject(rawData)

  const data = useObservable(data$)

  return (
    <>
      <p>{data}</p>
      <button onClick={() => setRawData('You are beautiful!')}>Click me</button>
    </>
  )
}

ReactDOM.render(<Application />, document.querySelector('#app'))
