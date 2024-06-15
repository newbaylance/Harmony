import axios from "axios";
import { Link } from "react-router-dom";

export default function Card({id, name, img, job, style}) {
    
    const submitHandler = async (el) => {
        el.preventDefault()

        try {
            if(localStorage.gender === "male"){
                const { data } = await axios.post("http://localhost:3000/harmony", {
                    FemaleId: +id,
                    MaleId: +localStorage.MaleId
                }) 
                Swal.fire("Thanks for your like! Find Me in My Harmony menu") 
            } else {
                const { data } = await axios.post("http://localhost:3000/harmony", {
                    FemaleId: +localStorage.FemaleId,
                    MaleId: +id
                }) 
                Swal.fire("Thanks for your like! Find Me in My Harmony menu") 
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <div className="col-3" >    
            <div className="card" style={{boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)"}}>
              <img 
              src={img}
              className="card-img-top" 
              alt="image"
              />
              <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{job}</p>
                  <button className="btn btn-success" onClick={submitHandler}>Like</button>
              </div>
            </div>
        </div>
        </>

    )
}