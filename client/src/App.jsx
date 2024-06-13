import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import ScriptTypeform from './scriptTypeform';




function App() {
  const [value, setValue] = useState("")
  const fetchData = async (el) => {
    el.preventDefault()
    try {
      let {data} = await axios.get(`http://localhost:3000/user/male`)
      data = data.result
      console.log(data, "<-----")
      console.log(value)
      setValue(data)
    } catch (error) {
      setError(true)
    }
  }

  const [form, setForm] = useState({
    name: "",
    style: ""
  })

  const changeHandler = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    fetchData()
  }, [value])
  return (
    <>
      <form action="">
        <div>
          <input type="text" placeholder='name' name='name' value={form.name} onChange={changeHandler}/>
        </div>
        <div>
          <input type="text" placeholder='Tes Attachment Style -->' name='style' value={value} onChange={changeHandler}/>
        </div>
        <div>
          <button onClick={fetchData}>Generate Test</button>
        </div>
      </form>
      
      <div>
        <ScriptTypeform />
      </div>
    </>
  )
}

export default App
