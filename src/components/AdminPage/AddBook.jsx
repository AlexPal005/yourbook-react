import {useEffect, useState} from "react";
import axios from "./../../Axios.js";

export const AddBook = () => {
    const [resBook, setResBook] = useState({})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    const [price, setPrice] = useState(0)
    const [err, setErr] = useState("")
    const [res, setRes] = useState("")
    const isValid = () => {
        if (title.length < 4) {
            setErr("Назва має містити мінімум 4 символи!")
            return false;
        } else if (description.length < 10) {
            setErr("Опис має містити мінімум 10 символів!")
            return false;
        } else if (isNaN(price)) {
            setErr("Ціна має бути числом!")
            return false;
        } else if (!price || price == 0) {
            setErr("Ціна не може бути 0!")
            return false;
        } else {
            setErr("")
            return true;
        }
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleFile = async (e) => {
        const base64 = await toBase64(e.target.files[0])
        setFile(base64.slice(23, base64.length))
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    useEffect(() => {
        setResBook(
            {
                title: title,
                description: description,
                picture: file,
                price: price
            }
        )

    }, [title, description, file, price])


    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isValid()) {
            return
        }
        axios.post("/book", resBook)
            .then(res => {
                console.log(res)
                setRes("Успішно додано!")
            })
            .catch(err => {
                console.log(err)
                setRes("Помилка!")
            })
    }
    return (
        <div className="add-book">
            {
                res &&
                <h1 className="error">{res}</h1>
            }
            <form>
                <p>Назва</p>
                <textarea onChange={handleTitle}/>
                <p>Опис</p>
                <textarea onChange={handleDescription}/>
                <p>Фото</p>
                <input type="file" onChange={handleFile} accept="image/*"/>
                <p>Вартість</p>
                <input type="text" onChange={handlePrice}/><br/>
                {
                    err &&
                    <p className="error">{err}</p>
                }
                <button onClick={handleSubmit} type="submit">Додати</button>
            </form>
        </div>
    )
}