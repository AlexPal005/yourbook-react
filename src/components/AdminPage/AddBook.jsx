export const AddBook = () => {
    return (
        <div className="add-book">
            <form>
                <p>Назва</p>
                <textarea/>
                <p>Опис</p>
                <textarea/>
                <p>Фото</p>
                <input type="file"/>
                <p>Вартість</p>
                <input type="text"/><br/>
                <button>Додати</button>
            </form>
        </div>
    )
}