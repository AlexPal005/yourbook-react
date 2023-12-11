import {useEffect, useState} from "react";

export const Basket = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        localStorage.clear()
        setBooks(JSON.parse(localStorage.getItem("basket")));
    }, []);
    useEffect(() => {
        console.log(books)
    }, [books]);
    return (
        <div className="wrapper-center">
            {
                books ?
                    <div>books</div> :
                    <h3 className="error">Кошик пустий! Перейдіть в каталог та додайте книги!</h3>
            }
        </div>
    )
}