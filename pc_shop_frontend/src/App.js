import './App.css';
import { useState, useEffect } from 'react';
const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)[1];

function App() {
    const [products, setProducts] = useState([]);
    let [name, setName] = useState('');
    let [image, setImage] = useState({});
    let [description, setDescription] = useState('');


    const newProduct = (e) => {
        e.preventDefault();

        const uploadData = new FormData();

        uploadData.append('name', name);
        uploadData.append('image', image, image.name);
        uploadData.append('description', description);

        fetch('http://localhost:8000/', {
            method: 'POST',
            body: uploadData
        }).then(res => res.json()).then(result => setProducts(oldProducts => [...oldProducts, result])).catch(err => console.log(err))

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
                {products.map(p => <li id={p._id} key={p._id}>{p.name} - {p.description} <img height='500px' width='500px' src={`http://localhost:8000${p.image}`} alt='JustPhoto' /></li>)}

                <form>
                    <span>
                        Name:
                        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </span>
                    <span>
                        Image:
                        <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
                    </span>
                    <span>
                        Description:
                        <input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </span>
                    <button type='button' onClick={(e) => newProduct(e)}>Click</button>
                </form>
            </header>


        </div>
    );
}

export default App;
