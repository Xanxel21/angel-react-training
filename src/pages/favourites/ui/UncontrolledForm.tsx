import { useState } from "react";

const UncontrolledForm = () => {
    const [ characterName, setCharacterName] = useState<string>('');


    const handleForm = (e) => {
        e.preventDefault();

        const input1 = e.target.characterName.value;

        console.log(input1)
    }

    return (
        <form onSubmit={handleForm}>
            <input
                name="characterName"
                type="text"
                onChange={e => setCharacterName(e.target.value)}
            />

            <button type="submit">Enviar</button>
                    
        </form>

    )
}

export default UncontrolledForm;