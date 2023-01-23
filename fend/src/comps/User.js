import { Link } from "react-router-dom";

export default function User(props){
    const user = props.user;
    return (
        <div className="user-cont" key={user.id}>
            <p>name:{user.name} bio:{user.bio}</p>
            <Link to={`/${user.id}`}>Detaylar</Link>
        </div>
    )
}