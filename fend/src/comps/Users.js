import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, update  } from '../usersControl/userSlice';
import User from './User';

export default function Users() {
    
    const dispatch=useDispatch();
    const users = useSelector(selectUsers);
    const [newUser, setNewUser] = useState({
        name:"",
        bio:""
    });
    const [disable, setDisable] = useState(true);
    useEffect ( () => {
        axios.get("http://localhost:9000/api/users")
        .then(res => {
        res.status === 200 && dispatch(update(res.data)); 
        })
        .catch(err =>{
            console.log(err);
        })
    },[]);
    console.log(users);

    const handleChange = event =>{
        const {value ,name} = event.target;
        
        setNewUser({
            ...newUser,
            [name]:value 
        });
        if(newUser.name.length>0 && newUser.bio.length>0){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post("http://localhost:9000/api/users",newUser)
        .then(res =>{
            console.log(res.data);
            dispatch(update(res.data))
        })
        .catch(err => {
            console.error(err);
        });
    };


    return(
        <div className="users-cont">
        <h2>Tüm Kullanıcılar</h2>
            {
                users.length !== 0 
                ?
                (
                    <div className='users-cont' >
                        {
                             users.map(user => (
                                <User user = {user}/>
                                ))
                        }
                        
                    </div> 
               
                )
                :
                (
                <p style={{color:"red"}}>Hiç Kullanıcı yoktur</p>
                ) 
            }
            <h2>Yeni Kullanici</h2>
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="name-input">İsim: </label>
                <input 
                type="text" 
                id="name-input" 
                name="name"
                value={newUser.name} 
                placeholder="İsmini Giriniz"
                onChange={handleChange}
                />
            </p>
            <p>
                <label htmlFor="bio-input">Bio: </label>
                <input 
                type="text" 
                id="bio-input" 
                name="bio"
                value={newUser.bio} 
                placeholder="Bio Giriniz"
                onChange={handleChange}
                />
            </p>
            <p>
                <input type="submit" id="add-button" value={disable===false?"Ekle":"Gerekli Bilgileri Doldur"} disabled={disable} />
            </p>
        </form>
        </div>
    )
}