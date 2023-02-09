import React, {useEffect, useState} from 'react';
import './App.css';

function check(){

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => Response.json())
            .catch(err =>{
                console.log(err)
            })
            .then((json) => setUsers(json));
    }, []);
 
}
export default check