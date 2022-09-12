import { useState } from "react";
import { Supabase } from "../api/supabase";

const ScoreCardTabComponent = () => {

    const items = Object.keys(localStorage);
    const [selected, setSeleceted] = useState('');

    const saveData = async () => {
        const api = new Supabase();
        await api.saveMatchData(selected, localStorage.getItem(selected));
    }

    return <div className="p-4">
        <ul className="list-disc list-inside">
            {items.map((item, index) => (
                <li key={index} onClick={() => setSeleceted(item)}> {item} </li>
            ))}
        </ul>
        <button className="btn btn-sm btn-primary" onClick={saveData}>Save Selected: {selected}</button>
    </div>;
}

export default ScoreCardTabComponent;