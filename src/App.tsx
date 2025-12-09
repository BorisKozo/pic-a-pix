import './App.css'
//import {Simulator} from "./simulator/Simulator.tsx";
import {Game} from "./game/Game.tsx";
import {Sun} from "./db.ts";

function App() {

    return (
        <div>
            <Game level={Sun}></Game>
        </div>
    )
}

export default App
