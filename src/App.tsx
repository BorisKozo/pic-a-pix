import './App.css'
import {House} from "./db.ts";
import {Solver} from "./solver/Solver.tsx";
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import {Game} from "./game/Game.tsx";
import {Simulator} from "./simulator/Simulator.tsx";
import {levels} from "./levels.ts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Game level={House}></Game>,
    },
    {
        path: '/game',
        element: <Game level={House}></Game>,
    },
    {
        path: '/simulator',
        element: <Simulator level={House}></Simulator>,
    },
    {
        path: '/solver',
        element: <Solver clues={levels.hard1.clues}></Solver>
    }
]);

function App() {
    return (
        <RouterProvider router={router}>
        </RouterProvider>
    )
}

export default App
