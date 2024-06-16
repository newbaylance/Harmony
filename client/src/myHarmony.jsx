import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"

useEffect

export default function MyHarmony() {
    const navigate = useNavigate()
    const [value, setValue] = useState({})
    const [user, setUser] = useState({})

    
    useEffect(() => {
        const fetchUser = async () => {
            try {
              let result = {}
              if(localStorage.gender === "male") {
                let {data} = await axios.get(`https://app.bayubelajar.fun/harmonyMale/${localStorage.MaleId}`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.access_token}`,
                  }
              })
                result = data[data.length-1].Female
              } else {
                let {data} = await axios.get(`https://app.bayubelajar.fun/harmonyFemale/${localStorage.FemaleId}`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.access_token}`,
                  }
              })
                result = data[data.length-1].Male
              }
                console.log(result, "<-----")
                setUser(result)
              } catch (error) {
                console.log(error)
              }
        }

        fetchUser()

    }, [])
    
    const deleteData = async () => {
      try {
        if(localStorage.gender === "male"){
            const { data } = await axios.delete("https://app.bayubelajar.fun/harmony", {
              headers: {
                  Authorization: `Bearer ${localStorage.access_token}`,
              }
            }, {
                FemaleId: user.id,
                MaleId: +localStorage.MaleId
            }) 
            Swal.fire(`${user.name} has been deleted from your harmony`) 
            navigate("/harmony") 
        } else {
            const { data } = await axios.delete("https://app.bayubelajar.fun/harmony", {
              headers: {
                  Authorization: `Bearer ${localStorage.access_token}`,
              }
            }, {
                FemaleId: +localStorage.FemaleId,
                MaleId: user.id
            }) 
            Swal.fire(`${user.name} has been deleted from your harmony`)
            navigate("/harmony")  
        }
    } catch (error) {
        console.log(error)
    }
    }


    return(
        <>
          <div className="container overflow-hidden ">
            <div className="row gx-5">
                <div className="col-3 text-center">
                    <div className="p-3" style={{marginTop: "20px"}}>
                        <img src={user.imageUrl}
                        alt="photo"
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
                        <h4>Tinggi</h4>
                        <p>{user.height} cm</p>
                        <h4>Berat Badan</h4>
                        <p>{user.weight} kg</p>
                        <Link to={"/my-harmony/detail"} className="btn btn-success" style={{marginRight: "10px"}}>Detail</Link>
                        <button className="btn btn-danger" onClick={deleteData}>Delete</button>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}