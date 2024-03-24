import { Routes, Route } from "react-router-dom";
import Landing from "./templates/Landing";
import LogIn from "./pages/log-in/Index";
import Home from "./pages/home/Index";
import ErrorPage from "./templates/404";
import Main from "./templates/Main";
import { useState } from "react";

const App = () => {
    const [session, seSession] = useState(false);
    const [myGeo, setMyGeo] = useState(null);

    return (
        <Routes>

            {
                session ?
                    // has session
                    <Route path="/" element={<Main session={session} seSession={seSession} />}>
                        <Route path="/home" element={<Home myGeo={myGeo} setMyGeo={setMyGeo} />} />
                    </Route>
                    :
                    <Route path="/" element={<Landing session={session} />}>
                        <Route path="/" element={<LogIn seSession={seSession} setMyGeo={setMyGeo} />} />
                        <Route path="/log-in" element={<LogIn seSession={seSession} setMyGeo={setMyGeo} />} />
                    </Route>
            }

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
