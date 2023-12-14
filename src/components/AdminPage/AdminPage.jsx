import "./AdminPage.scss"
import {Route, Routes} from "react-router-dom";
import {AddBook} from "./AddBook.jsx";
import {AddAdmin} from "./AddAdmin.jsx";
import {Profit} from "./Profit.jsx";
import {Books} from "../Books/Books.jsx";

export const AdminPage = () => {
    return (
        <div className="wrapper-center">
            <div className="links-nav">
                <a href="/adminPage/addBook">Додати книгу</a>
                <a href="/adminPage/books">Книги</a>
                <a href="/adminPage/addAdmin">Додати адміністратора</a>
                <a href="/adminPage/profit">Перегляд доходів</a>
            </div>
            <Routes>
                <Route path="/addBook" element={<AddBook/>}/>
                <Route path="/addAdmin" element={<AddAdmin/>}/>
                <Route path="/profit" element={<Profit/>}/>
                <Route path="/books" element={<Books/>}/>
            </Routes>
        </div>
    )
}