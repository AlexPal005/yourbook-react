import './../../scss/variables.scss'
import './Books.scss'
import {useContext, useEffect, useState} from "react";
import {BookCard} from "../BookCard/BookCard.jsx";
import axios from './../../Axios.js';
import {AuthContext} from "../../context/authContext.jsx";

export const Books = () => {
    const [books, setBooks] = useState([])
    const [updateBooks, setUpdateBooks] = useState(0)

    useEffect(() => {
        axios.get('/book/getAll')
            .then(res => {
                setBooks(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [updateBooks]);

    return (
        <div className="wrapper-center books-wrapper">
            {
                books.length ?
                    <div className="books">
                        {
                            books.map(book => {
                                return <BookCard key={book.id} book={book} setUpdateBooks = {setUpdateBooks}/>
                            })
                        }
                    </div> :
                    <h1>
                        Нічого не знайдено!
                    </h1>
            }

        </div>
    )
}