import './../../scss/variables.scss'
import './Books.scss'
import {useState} from "react";
import {BookCard} from "../BookCard/BookCard.jsx";

export const Books = () => {
    const [books, setBooks] = useState([
        {
            bookId: 1,
            title: "MainBook",
            description: "Interesting book",
            price: 150,
            photo: []
        },
        {
            bookId: 1,
            title: "MainBook",
            description: "Interesting book",
            price: 150,
            photo: []
        },
        {
            bookId: 1,
            title: "MainBook",
            description: "Interesting book",
            price: 150,
            photo: []
        },
        {
            bookId: 1,
            title: "MainBook",
            description: "Interesting book",
            price: 150,
            photo: []
        },
        {
            bookId: 1,
            title: "MainBook",
            description: "Interesting book",
            price: 150,
            photo: []
        },
        {
            bookId: 1,
            title: "MainBook",
            description: "Interesting book",
            price: 150,
            photo: []
        }
    ])

    return (
        <div className="wrapper-center books-wrapper">
            <div className="books">
                {
                    books.map(book => {
                        return <BookCard key={book.bookId} book={book}/>
                    })
                }
            </div>
        </div>
    )
}