import { useEffect, useState } from "react"
import Card from "./card"
import axios from "axios"


export default function Harmony() {
    const [user, setUser] = useState([])
    console.log(localStorage.gender === "male")

    useEffect(() => {
        const fetchUser = async () => {
            try {
              let result = {}
              if(localStorage.gender === "female") {
                let {data} = await axios.get(`http://localhost:3000/user/male`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.access_token}`,
                  }
                })
                result = data
              } else {
                let {data} = await axios.get(`http://localhost:3000/user/female`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.access_token}`,
                  }
                })
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
    return(
    <>
        <div className='container mt-4'>
            <div className='row gap-4 justify-content-around'>
              { user.map((el) => (
                <Card key={el.id} id={el.id} img={el.imageUrl} name={el.name} job={el.job} style={el.style}/>
              ))}
            </div>
        </div>
    </>
    )
}