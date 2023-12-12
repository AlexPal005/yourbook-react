import './../../scss/variables.scss'
import './Books.scss'
import {useEffect, useState} from "react";
import {BookCard} from "../BookCard/BookCard.jsx";
import axios from './../../Axios.js';

export const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios.get('/book/getAll')
            .then(res => {
                setBooks(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, []);

    return (
        <div className="wrapper-center books-wrapper">
            {
                books.length ?
                    <div className="books">
                        {
                            books.map(book => {
                                return <BookCard key={book.id} book={book}/>
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