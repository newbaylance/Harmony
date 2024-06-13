import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"

useEffect

export default function Generate() {
    
    const [value, setValue] = useState({})
    const [user, setUser] = useState({})
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
          
                let {data} = await axios.get(`http://localhost:3000/user/female/3`)
              //   console.log(data, "<-----")
                setUser(data)
              } catch (error) {
                console.log(error)
              }  
        }

        fetchUser()

    }, [])
    
    

    const fetchData = async () => {
    try {
      
      let {data} = await axios.post(`http://localhost:3000/generate`,
        {
            style: user.style
        })
    //   console.log(data, "<-----")
      setValue(data)
    } catch (error) {
      console.log(error)
    }
  }

    return(
        <>
            <h1>Profil Saya</h1>
            <p>{user.name}</p>
            <p>{user.job}</p>
            <button onClick={fetchData}>Tampilkan Analisa</button>
            <div>
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
        </>
    )
}