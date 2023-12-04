import './App.css';
import { useState, useEffect } from 'react';
const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)[1];

function App() {
    const [products, setProducts] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get('name');
        const image = formData.get('image');
        const description = formData.get('description');

        fetch("http://localhost:8000", {
            method: 'POST',
            body: JSON.stringify({
                name,
                image,
                description
                // Other body stuff
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken // Replace with your actual CSRF token
                // Other possible headers
            }
        })
            .then(res => res.json())
            .then(newDevice => {
                console.log(newDevice);
                setProducts(state => {
                    return [...state, newDevice];
                })
            })
            .catch(err => console.log(err));


    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/')
            .then(res => res.json())
            .then(result => {
                setProducts(result);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="App">
            <header className="App-header">

                {products.length === 0 && <p>No products</p>}
                {products.map(p => <li id={p._id} key={p._id}>{p.name} - {p.description} <img height='500px' width='500px' src={p.image} alt='JustPhoto' /></li>)}

                <form onSubmit={onSubmitHandler}>
                    <span>
                        Name:
                        <input type='text' name='name' />
                    </span>
                    <span>
                        Image:
                        <input type='text' name='image' />
                    </span>
                    <span>
                        Description:
                        <input type='text' name='description' />
                    </span>
                    <input type='submit' value='Submit' />
                </form>
            </header>


        </div>
    );
}

export default App;
