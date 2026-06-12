import { useState, SubmitEvent } from "react";

const ControlledForm = () => {
    const [ characterName, setCharacterName] = useState<string>('');
    const [ faction, setFaction] = useState<string>('');

    const errors = validate(characterName, faction)

    const handleForm = (e: SubmitEvent) => {
        e.preventDefault();

        const data = {
            characterName,
            faction
        }

        console.log(data);
    }

    return (
        <form onSubmit={handleForm}>
            <input
                name="characterName"
                type="text"
                onChange={e => setCharacterName(e.target.value)}
                value={characterName}
            />


              <input
                name="faction"
                type="text"
                onChange={e => setFaction(e.target.value)}
                value={faction}
            />

            <button type="submit" disabled={!!errors}>Enviar</button>

            {errors && <span>Error en els camps</span>}
                    
        </form>

    )
}

const validate = (characterName: string, faction: string) => {
    if (characterName === '') return "Caca la vaca";
    if (faction === '') return "Caca la vaca"

    return {

    }

}

export default ControlledForm;