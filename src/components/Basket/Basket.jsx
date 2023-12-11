import {useEffect, useState} from "react";
import "./Basket.scss"
import {BookListItem} from "./BookListItem.jsx";

export const Basket = () => {

    const [books, setBooks] = useState([])
    const [sum, setSum] = useState(0)
    const [updateSum, setUpdateSum] = useState(0)

    useEffect(() => {
        setBooks(JSON.parse(localStorage.getItem("basket")));
    }, [updateSum])

    useEffect(() => {
        let currSum = 0;
        books.forEach(currBook => {
            const count = currBook.count ? currBook.count : 1
            currSum = currSum + currBook.price * count
        })
        setSum(currSum)
    }, [books])

    return (
        <div className="wrapper-center">
            {
                books ?
                    <div className="basket-wrapper">
                        {
                            books.map(book => {
                                return <BookListItem key={book.id} book={book} setUpdateSum = {setUpdateSum}/>
                            })
                        }

                        <p>Сума: {sum} грн</p>
                        <div>
                            <button>Замовити</button>
                        </div>
                    </div> :
                    <h3 className="error">Кошик пустий! Перейдіть в каталог та додайте книги!</h3>
            }
        </div>
    )
}