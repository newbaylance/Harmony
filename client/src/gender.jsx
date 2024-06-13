import { Link, useNavigate, useParams } from "react-router-dom";


export default function Gender() {
    let { id } = useParams()
    return(
    <>
        <br /> <br /> <br />
        <div className="container text-center">
            <h2>What is your Gender?</h2> <br />
            <div className="row d-flex align-items-center">
                <div className="col">
                <Link className="btn btn-outline-primary" to={`/addMale/${id}`}>Male</Link>
                </div>
            </div> <br />
            <div className="row d-flex align-items-center">
                <div className="col">
                <Link className="btn btn-outline-danger" to={`/addFemale/${id}`}>Female</Link>
                </div>
            </div>
        </div>
    </>
    )
}