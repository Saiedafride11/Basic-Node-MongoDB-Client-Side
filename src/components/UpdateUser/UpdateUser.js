import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();
    useEffect( () => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    }, [])

    // update name
    const handleNameChange = e => {
        const updateName = e.target.value;
        const updatedUser = {name: updateName, email:user.email}
        // const updatedUser = {...user}
        // updatedUser.name = updateName;
        setUser(updatedUser)
    }

    // Update email
    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        const updatedUser = {name: user.name, email: updateEmail}
        // const updatedUser = {...user}
        // updatedUser.email = updateEmail;
        setUser(updatedUser)
    }

    const handleUpdateUser = e => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data.modifiedCount > 0){
                alert("Updeted Succesfully")
                setUser({})
            }
        })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Update Name: {user.name} <br/> {user.email}</h2>
            <p><strong>Id: </strong><small>{id}</small></p>

            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} placeholder="Name" value={user.name || ''}/>
                <br/>
                <input type="email" onChange={handleEmailChange} placeholder="Email" value={user.email || ''}/>
                <br/>
                <input type="submit" value="Update"/>
            </form>
        </div>
    );
};

export default UpdateUser;