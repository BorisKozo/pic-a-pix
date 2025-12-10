import './App.css'
import {Game} from "./game/Game.tsx";
import {Sun} from "./db.ts";

function App() {

    return (
        <div>
            {/*<Simulator></Simulator>*/}
            <Game level={Sun}></Game>
        </div>
    )
}

export default App
