import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';




function EditForm({gender}) {
  const { id } = useParams()
  const navigate = useNavigate()

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

  const fetchData = async (el) => {
    try {
    if(localStorage.gender === "male") {
        const { data } = await axios.get(`http://localhost:3000/user/male/${localStorage.id}`)
        setForm(data)
    } else {
        const { data } = await axios.get(`http://localhost:3000/user/female/${localStorage.id}`)
        setForm(data)
    }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
      fetchData()
  }, [])

  
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
                          <button type="submit" class="btn btn-primary">Update Profile</button>
                      </form>
                  </div>
              </div>
          </div>
      
    </>
  )
}

export default EditForm
