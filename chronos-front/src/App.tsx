import './App.css'
import {Link} from "react-router-dom";

function App() {
    return (
        <div>
            <Link className={"text-blue-600 block"} to={"/signin"}>Sign in</Link>
            <Link className={"text-blue-600 block"} to={"/signup"}>Sign up</Link>

        </div>

    )
}

export default App
