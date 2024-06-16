import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Card({id, name, img, job, style}) {
    const navigate = useNavigate()
    
    const submitHandler = async (el) => {
        el.preventDefault()

        try {
            if(localStorage.gender === "male"){
                const { data } = await axios.post("https://app.bayubelajar.fun/harmony", {
                    FemaleId: +id,
                    MaleId: +localStorage.MaleId
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                  }) 
                Swal.fire("Thanks for your like my dear") 
                navigate("/my-harmony")
            } else {
                const { data } = await axios.post("https://app.bayubelajar.fun/harmony", {
                    FemaleId: +localStorage.FemaleId,
                    MaleId: +id
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                  }) 
                Swal.fire("Thanks for your like my dear")
                navigate("/my-harmony")
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
                  <button className="love-button" id="loveButton" onClick={submitHandler}>
                    <span className="love-icon">&hearts;</span>
                  </button>
              </div>
            </div>
        </div>
        </>

    )
}