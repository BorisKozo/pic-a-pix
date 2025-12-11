import './App.css'
import {Game} from "./game/Game.tsx";
import {House} from "./db.ts";
// import {Simulator} from "./simulator/Simulator.tsx";

function App() {

    return (
        <div>
            <Game level={House}></Game>
            {/*<Simulator level={House}></Simulator>*/}
        </div>
    )
}

export default App
