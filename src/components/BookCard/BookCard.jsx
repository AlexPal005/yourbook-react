import './../../scss/variables.scss'
import './BookCard.scss'
/* eslint-disable react/prop-types */
export const BookCard = ({book}) => {
    return(
        <div className="book-card">
            <img className="book-image" alt={book.title} src = {`data:image/jpeg;base64,${book.picture}`}/>
            <p>{book.title}</p>
            <h5>{book.price} грн</h5>
        </div>
    )
}