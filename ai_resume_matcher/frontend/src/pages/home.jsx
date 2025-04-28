import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home(){
    const navigate = useNavigate()

    useEffect(() =>{
        const token = localStorage.getItem('accesToken')
        if(!token){
            navigate('/login')
        }
    },[navigate]
)


    return(
        <div className="min-h-screen flex item-center justify-center bg-gray-100" >
              <div className="bg-white p-8 rounded shadow-md w-96  text-center ">
              <h1 className="text-3xl font-bold mb-4">Welcome Home!</h1>
              <p className="text-gray-600 mb-6">You are authenticated.</p>
              <Link
                to="/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Upload Your Resume
            </Link>
              <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    onClick={() => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        navigate('/login');
                    }}
                >
                    Logout
                </button>

              </div>
        </div>
    )

}
export default Home