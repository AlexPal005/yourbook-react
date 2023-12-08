import './../../scss/variables.scss'
import './BookCard.scss'
import image from './../../assets/book.jpg'
/* eslint-disable react/prop-types */
export const BookCard = ({book}) => {
    return(
        <div className="book-card">
            <img className="book-image" alt={book.title} src = {image}/>
            <p>{book.title}</p>
            <h5>{book.price} грн</h5>
        </div>
    )
}