import axios from "axios";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectUsers, update } from "../usersControl/userSlice";


export default function UserDetail() {
    const [user, setUser] = useState({});
    const [userUp, setUserUp] = useState({})
    let id = (useParams()).id;
    let navigate = useNavigate();
    let dispatch=useDispatch();
    let users=useSelector(selectUsers);
    useEffect ( () => {
        axios.get(`http://localhost:9000/api/users/${id}`)
        .then(res => {
          if(res.status === 200)  {setUser(res.data);setUserUp(res.data)}; 
        })
        .catch(err =>{
            console.log(err);
        })
      },[]);
    
    const [disable, setDisable] = useState(true)


    
    const remove = () => {
        axios.delete(`http://localhost:9000/api/users/${id}`)
        .then(res => {
          if(res.status===200){
            dispatch(update(res.data));
            console.log("kekanan",users);
            navigate("/");
          }
        })
    };

    const handleChange = event =>{
        const {value ,name} = event.target;
        
        setUserUp({
            ...userUp,
            [name]:value 
        });
        if(userUp.name.length>0 || userUp.bio.length>0){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .put("http://localhost:9000/api/users/"+id,userUp)
        .then(res =>{
            console.log(res.data);
            dispatch(update(res.data))
            navigate("/");
        })
        .catch(err => {
            console.error(err);
        });
    };
    
    return(
        <div className="user-det-cont">
            <p>
                <strong>id: </strong> {user.id}
            </p>
            <p>
                <strong>name: </strong> {user.name}
            </p>
            <p>
                <strong>bio: </strong> {user.bio}
            </p>
            <button onClick={()=>{remove()}}>
                Kullanici Sil
            </button>
            <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="name-up">İsim: </label>
                <input 
                type="text" 
                id="name-up" 
                name="name"
                value={userUp.name} 
                placeholder="İsmini Giriniz"
                onChange={handleChange}
                />
            </p>
            <p>
                <label htmlFor="bio-up">Bio: </label>
                <input 
                type="text" 
                id="bio-up" 
                name="bio"
                value={userUp.bio} 
                placeholder="Bio Giriniz"
                onChange={handleChange}
                />
            </p>
            <p>
                <input type="submit" id="add-button" value={disable===false?"Gunceller":"Gerekli Bilgileri Doldur"} disabled={disable} />
            </p>
        </form>
        </div>
    )
}