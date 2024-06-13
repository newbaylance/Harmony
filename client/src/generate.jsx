import { useEffect, useState } from "react"
import axios from 'axios'

useEffect

export default function Generate() {
    const [value, setValue] = useState({})
    
  
    const fetchData = async () => {
    
    try {
      let {data} = await axios.post(`http://localhost:3000/generate`,
        {
            style: "anxious"
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