import {useContext, useEffect, useState} from "react";
import "./Basket.scss"
import {BookListItem} from "./BookListItem.jsx";
import {AuthContext} from "../../context/authContext.jsx";
import axios from "./../../Axios.js";
import {ConfirmOrder} from "./ConfirmOrder.jsx";

export const Basket = () => {

    const [books, setBooks] = useState([])
    const [sum, setSum] = useState(0)
    const [updateSum, setUpdateSum] = useState(0)
    const {currentUser} = useContext(AuthContext)
    const [showConfirm, setShowConfirm] = useState(false)
    const [resultOrder, setResultOrder] = useState({})

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("basket"))) {
            setBooks(JSON.parse(localStorage.getItem("basket")));
        }
    }, [updateSum])

    useEffect(() => {
        let currSum = 0;
        books.forEach(currBook => {
            const count = currBook.count ? currBook.count : 1
            currSum = currSum + currBook.price * count
        })
        setSum(currSum)
    }, [books])

    const clearBasket = () => {
        localStorage.setItem("basket", "[]")
        setUpdateSum(prev => prev + 1)
    }

    const handleAddOrder = () => {
        const currbooks = JSON.parse(localStorage.getItem("basket"))
        const booksId = []
        currbooks.forEach(book => {
            if (book?.count && book?.count > 1) {
                booksId.push(book.id)
            } else {
                booksId.push(book.id)
            }
        })
        setResultOrder({
            totalSum: sum,
            status: "В обробці!",
            userId: currentUser.userId,
            booksId: booksId
        })
        setShowConfirm(true)
    }
    return (
        <div className="wrapper-center">
            {
                books?.length ?
                    <div className="basket-wrapper">
                        <span onClick={clearBasket}>Очистити корзину</span>
                        {
                            books.map(book => {
                                return <BookListItem key={book.id} book={book} setUpdateSum={setUpdateSum}/>
                            })
                        }

                        <p>Сума: {sum} грн</p>
                        <div>
                            <button onClick={handleAddOrder}>Замовити
                            </button>
                        </div>

                    </div> :
                    <h3 className="error">Кошик пустий! Перейдіть в каталог та додайте книги!</h3>

            }
            {
                showConfirm && <ConfirmOrder resultOrder={resultOrder}
                                             clearBasket ={clearBasket}
                                             setShowConfirm = {setShowConfirm}
                />
            }
        </div>
    )
}