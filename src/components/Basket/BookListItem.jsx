/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import {MdDelete} from "react-icons/md";

export const BookListItem = ({book, setUpdateSum}) => {
    const [countBooks, setCountBooks] = useState(1)
    const handleChangeCounter = (e) => {
        setCountBooks(e.target.value)
        setUpdateSum(prev => prev + 1)
        let currBasket = JSON.parse(localStorage.getItem("basket"));
        currBasket.forEach(currBook => {
            if (currBook.id === book.id) {
                currBook.count = e.target.value
            }
        })
        localStorage.setItem("basket", JSON.stringify(currBasket))
    }

    useEffect(() => {
        let count = book?.count ? book.count : 1
        setCountBooks(count)
    }, [book.count])

    const deleteBook = () => {
        let currBasket = JSON.parse(localStorage.getItem("basket"));
        currBasket.forEach((currBook, index) => {
            if (currBook.id === book.id) {
                currBasket.splice(index, 1)
            }
        })
        localStorage.setItem("basket", JSON.stringify(currBasket))
        setUpdateSum(prev => prev + 1)
    }
    return (
        <div className="book-item">
            <span>{book.title}</span>
            <h5>{book.price * countBooks} грн</h5>
            <div>
                <img alt={book.title} src={`data:image/jpeg;base64,${book.picture}`}/>
                <label>
                    Кількість:
                    <input
                        type="number"
                        min="1"
                        max="20"
                        onChange={handleChangeCounter}
                        defaultValue={book?.count ? book.count : 1}
                    />
                </label>
                <MdDelete className="delete-book" alt="Видалити" onClick={deleteBook}/>
            </div>
        </div>
    )
}