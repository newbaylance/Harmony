import { useEffect, useState } from "react"
import Card from "./card"
import axios from "axios"
import { fetchUser } from "./store/slicers/counterSlice"
import { useDispatch, useSelector } from "react-redux"


export default function Harmony() {
    const data = useSelector((state) => state.counter.data)

    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              let result = {}
              if(localStorage.gender === "female") {
                let {data} = await axios.get(`https://app.bayubelajar.fun/user/male`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.access_token}`,
                  }
                })
                result = data
              } else {
                let {data} = await axios.get(`https://app.bayubelajar.fun/user/female`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.access_token}`,
                  }
                })
                result = data
              }
                // console.log(data, "<-----")
                dispatch(fetchUser(result))
              } catch (error) {
                console.log(error)
              }  
        }

        fetchData()

    }, [])
    return(
    <>
        <div className='container mt-4'>
            <div className='row gap-4 justify-content-around'>
              { data.map((el) => (
                <Card key={el.id} id={el.id} img={el.imageUrl} name={el.name} job={el.job} style={el.style}/>
              ))}
            </div>
        </div>
    </>
    )
}