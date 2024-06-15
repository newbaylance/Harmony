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
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = async (el) => {
    el.preventDefault()
    try {
      setIsLoading(true)
      let {data} = await axios.get(`http://localhost:3000/test`, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
        }
      })
      data = data.result
      console.log(data, "<-----")
      console.log(value)
      setValue(data)
    } catch (error) {
      setError(true)
    } finally {
      setIsLoading(false)
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
        const {data} = await axios.post(`http://localhost:3000/user/male/${id}`, {
          name: form.name,
          datebirth: form.datebirth,
          height: form.height,
          weight: form.weight,
          imageUrl: form.imageUrl,
          job: form.job,
          style: value
        }, {
          headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
          }
        })
        localStorage.MaleId = data.id
        Swal.fire("Success Edit Profile")
        navigate(`/my-profile/${id}`)
      } else {
        const {data} = await axios.post(`http://localhost:3000/user/female/${id}`, {
          name: form.name,
          datebirth: form.datebirth,
          height: form.height,
          weight: form.weight,
          imageUrl: form.imageUrl,
          job: form.job,
          style: value
        }, {
          headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
          }
        })
        localStorage.FemaleId = data.id
        Swal.fire("Success Edit Profile")
        navigate(`/my-profile/${id}`)
      }
    } catch (error) {
      if(Array.isArray(error.response.data.message)) {
        Swal.fire(error.response.data.message[0])
        } else {
            Swal.fire(error.response.data.message)
        }
    }
  }

  useEffect(() => {
    fetchData()
  }, [value])

  if(isLoading) return (
    <>
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only"></span>
        </div>
        </div>
    </>
    )


  return (
    <>
      <div className="container mt-5">
              <div className="row justify-content-center">
                  <div className="col-md-6">
                      <h2 className="mb-4">Edit Profile</h2>
                      <form id="loginForm" onSubmit={submitHandler}>
                        <div className="row">
                          <div className="mb-3 col">
                              <label className="form-label">Nama</label>
                              <input type="text" className="form-control"
                              value={form.name}
                              onChange={changeHandler}
                              name="name" required />
                          </div>
                          <div className="mb-3 col">
                              <label className="form-label">Tanggal Lahir</label>
                              <input type="date" className="form-control"
                              value={form.datebirth}
                              onChange={changeHandler}
                              name="datebirth" required />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col">
                              <label className="form-label">Tinggi Badan (cm)</label>
                              <input type="number" className="form-control" 
                              value={form.height}
                              onChange={changeHandler}
                              name="height" required />
                          </div>
                          <div className="mb-3 col">
                              <label className="form-label">Berat Badan (kg)</label>
                              <input type="number" className="form-control" 
                              value={form.weight}
                              onChange={changeHandler}
                              name="weight" required />
                          </div>
                        </div>
                          <div className="mb-3">
                              <label className="form-label">Image URL</label>
                              <input type="text" className="form-control"
                              value={form.imageUrl}
                              onChange={changeHandler}
                              name="imageUrl" required />
                          </div>
                          <div className="mb-3">
                              <label className="form-label">Pekerjaan</label>
                              <input type="text" className="form-control" 
                              value={form.job}
                              onChange={changeHandler}
                              name="job" required />
                          </div>
                          <div className="mb-3">
                              <label className="form-label">Untuk data selanjutnya anda wajib melakukan tes terlebih dahulu dengan cara klik Tes Attachment Style di sebelah kanan layar anda</label>
                          </div>
                        <div className="row">
                          <div className='col'>
                            <button className='btn btn-outline-dark' onClick={fetchData}>Klik Untuk Input Otomatis</button>
                          </div>
                          <div className="mb-3 col">
                              <input type="text" className="form-control" name="style" value={value} onChange={changeHandler} placeholder='Gaya pendekatan'/>
                          </div>
                        </div>
                          <button type="submit" className="btn btn-primary">Update Profile</button>
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
