import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"

useEffect

export default function Generate() {
  const { id } = useParams()
    
    const [value, setValue] = useState({})
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
              let result = {}
              if(localStorage.gender === "male") {
                let {data} = await axios.get(`http://localhost:3000/user/male/${id}`)
                result = data
              } else {
                let {data} = await axios.get(`http://localhost:3000/user/female/${id}`)
                result = data
              }
              //   console.log(data, "<-----")
                setUser(result)
              } catch (error) {
                console.log(error)
              }  
        }

        fetchUser()

    }, [])
    
    

    const fetchData = async () => {
    try {
      setIsLoading(true)
      let {data} = await axios.post(`http://localhost:3000/generate`,
        {
            style: user.style
        })
    //   console.log(data, "<-----")
      setValue(data)
    } catch (error) {
      console.log(error)
      if(Array.isArray(error.response.data.message)) {
        Swal.fire(error.response.data.message[0])
      } else {
          Swal.fire(error.response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if(isLoading) return (
    <>
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only"></span>
        </div>
        </div>
    </>
    )

    return(
        <>
          <div className="container overflow-hidden ">
            <div className="row gx-5">
                <div className="col-3 text-center">
                    <div className="p-3" style={{marginTop: "20px"}}>
                        <img src={user.imageUrl}
                        alt="photo-product"
                        style={{width: "auto", height: "50vh", objectFit: "cover", boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)"}}
                        />
                    </div>
                </div>
                <div className="col-9 text-left">
                    <div className="p-3" style={{marginTop: "20px"}}>
                        <h4>Nama</h4>
                        <p>{user.name}</p>
                        <h4>Pekerjaan</h4>
                        <p>{user.job}</p>
                        <h4>Gaya Pendekatan</h4>
                        <button className="btn btn-outline-dark" onClick={fetchData} style={{marginTop: "10px", marginBottom: "10px"}}>Tampilkan Analisa Gaya Pendekatan Saya</button>
                        <p>
                            Analisa Karakter: {value["analisa"]}
                        </p>
                        <p>
                            Analisa Kelebihan: {value["kelebihan"]}
                        </p>
                        <p>
                            Analisa Kekurangan: {value["kekurangan"]}
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}