import './../../scss/variables.scss'
import './BookCard.scss'
import {FaShoppingBasket} from "react-icons/fa";
/* eslint-disable react/prop-types */

export const BookCard = ({book}) => {
    const addBookToCard = () => {

    }
    return (
        <div className="book-card">
            <img className="book-image" alt={book.title} src={`data:image/jpeg;base64,${book.picture}`}/>
            <p>{book.title}</p>
            <h5>{book.price} грн</h5>
            <FaShoppingBasket className="card-basket" onClick={addBookToCard}/>
        </div>
    )
}