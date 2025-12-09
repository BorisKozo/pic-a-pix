import './App.css'
//import {Simulator} from "./simulator/Simulator.tsx";
import {Game} from "./game/Game.tsx";
import {Sun} from "./db.ts";
import {Simulator} from "./simulator/Simulator.tsx";

function App() {

    return (
        <div>
            <Simulator></Simulator>
            <Game level={Sun}></Game>
        </div>
    )
}

export default App
