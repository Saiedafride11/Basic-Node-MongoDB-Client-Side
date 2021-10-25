import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef()
    const emailRef = useRef()

    const handleAddUser = (e) => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = {name, email}

        fetch('http://localhost:5000/users', {
            method: 'post',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.insertedId){
                alert('Successfully added user')
                // e.target.reset();
            }
        })
        nameRef.current.value = '';
        emailRef.current.value = '';
        e.preventDefault();
    }
    return (
        <div>
            <h2>Please Add an User</h2>

            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef} placeholder="Name"/>
                <br/>
                <input type="email" ref={emailRef} placeholder="Email"/>
                <br/>
                <input type="submit" value="Add"/>
            </form>
        </div>
    );
};

export default AddUser;