import { useUserContext } from "../../contexts/UserContext";

const Todo = () => {
        const { user } = useUserContext();
    return (
        <div>
            <h1>Bem-vindo { user.email }</h1>
        </div>
    )
}

export default Todo;