import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  characterName: string
  faction: string
}


export default function ReactHookForm() {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm<Inputs>({
        defaultValues: {
            characterName: "",
            faction: "",
        },
				mode: "onChange",
     })

		 console.log(errors);
		 console.log(isValid);

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
               {...register("characterName",  { required: "This field is required", maxLength: { value: 20, message: "Max length is 20" } })}
            />
             {errors.characterName && <span>{errors.characterName.message}</span>}


              <input
                type="text"
                {...register("faction",  { required: "This field is required", maxLength: { value: 20, message: "Max length is 20" } })}
            />
            {errors.faction && <span>{errors.faction.message}</span>}


            <button type="submit" disabled={!isValid}>Enviar</button>
                    
        </form>

    )

}