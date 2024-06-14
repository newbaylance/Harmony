import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import axios from "axios"
import ScriptTypeform from './scriptTypeform';
import { useNavigate, useParams } from 'react-router-dom';




function AddForm({gender}) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [value, setValue] = useState("")
  const fetchData = async (el) => {
    el.preventDefault()
    try {
      let {data} = await axios.get(`http://localhost:3000/test`)
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
    datebirth: "",
    height: "",
    weight: "",
    imageUrl: "",
    job: "",
    style: ""
  })

  const changeHandler = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const submitHandler = async (el) => {
    el.preventDefault()
    
    try {
      if(gender === "male") {
        await axios.post(`http://localhost:3000/user/male/${id}`, {
          name: form.name,
          datebirth: form.datebirth,
          height: form.height,
          weight: form.weight,
          imageUrl: form.imageUrl,
          job: form.job,
          style: value
        })
        navigate(`/my-profile/${id}`)
      } else {
        await axios.post(`http://localhost:3000/user/female/${id}`, {
          name: form.name,
          datebirth: form.datebirth,
          height: form.height,
          weight: form.weight,
          imageUrl: form.imageUrl,
          job: form.job,
          style: value
        })
        navigate(`/my-profile/${id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [value])
  return (
    <>
      <div class="container mt-5">
              <div class="row justify-content-center">
                  <div class="col-md-6">
                      <h2 class="mb-4">Edit Profile</h2>
                      <form id="loginForm" onSubmit={submitHandler}>
                        <div className="row">
                          <div class="mb-3 col">
                              <label class="form-label">Nama</label>
                              <input type="text" class="form-control"
                              value={form.name}
                              onChange={changeHandler}
                              name="name" />
                          </div>
                          <div class="mb-3 col">
                              <label class="form-label">Tanggal Lahir</label>
                              <input type="date" class="form-control"
                              value={form.datebirth}
                              onChange={changeHandler}
                              name="datebirth" />
                          </div>
                        </div>
                        <div className="row">
                          <div class="mb-3 col">
                              <label class="form-label">Tinggi Badan (cm)</label>
                              <input type="number" class="form-control" 
                              value={form.height}
                              onChange={changeHandler}
                              name="height" />
                          </div>
                          <div class="mb-3 col">
                              <label class="form-label">Berat Badan (kg)</label>
                              <input type="number" class="form-control" 
                              value={form.weight}
                              onChange={changeHandler}
                              name="weight" />
                          </div>
                        </div>
                          <div class="mb-3">
                              <label class="form-label">Image URL</label>
                              <input type="text" class="form-control"
                              value={form.imageUrl}
                              onChange={changeHandler}
                              name="imageUrl" />
                          </div>
                          <div class="mb-3">
                              <label class="form-label">Pekerjaan</label>
                              <input type="text" class="form-control" 
                              value={form.job}
                              onChange={changeHandler}
                              name="job" />
                          </div>
                          <div class="mb-3">
                              <label class="form-label">Untuk data selanjutnya anda wajib melakukan tes terlebih dahulu dengan cara klik Tes Attachment Style di sebelah kanan layar anda</label>
                          </div>
                        <div className="row">
                          <div className='col'>
                            <button className='btn btn-outline-dark' onClick={fetchData}>Klik Untuk Input Otomatis</button>
                          </div>
                          <div class="mb-3 col">
                              <input type="text" class="form-control" name="style" value={value} onChange={changeHandler} placeholder='Gaya pendekatan'/>
                          </div>
                        </div>
                          <button type="submit" class="btn btn-primary">Update Profile</button>
                      </form>
                  </div>
              </div>
          </div>
      
      
      <div>
        <ScriptTypeform />
      </div>
    </>
  )
}

export default AddForm
