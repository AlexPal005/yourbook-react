import './../../scss/variables.scss'
import './BookCard.scss'
import {FaShoppingBasket} from "react-icons/fa";
import {useState} from "react";
/* eslint-disable react/prop-types */

export const BookCard = ({book}) => {
    const [message, setMessage] = useState("")
    const addBookToCard = () => {
        let currBasket = JSON.parse(localStorage.getItem("basket"));
        if (currBasket) {
            let count = 0
            currBasket.forEach(currBook => {
                if (currBook.id === book.id) {
                    count++
                }
            })
            if (count) {
                setMessage("Вже в корзині!")
                return
            }
            currBasket.push(book)
            localStorage.setItem("basket", JSON.stringify(currBasket))
        } else {
            localStorage.setItem("basket", JSON.stringify([book]))
        }
    }
    return (
        <div className="book-card">
            <img className="book-image" alt={book.title} src={`data:image/jpeg;base64,${book.picture}`}/>
            <p>{book.title}</p>
            <h5>{book.price} грн</h5>
            <FaShoppingBasket className="card-basket" onClick={addBookToCard}/>
            <p className="error">{message}</p>
        </div>
    )
}