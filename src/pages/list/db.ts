export { }

const oepnRequest = indexedDB.open('db', 1) // 参数1 数据库 参数2 版本名称

const fetchJS = () => {
    const oepnRequest = indexedDB.open('db', 1) // 参数1 数据库 参数2 版本名称
    return new Promise((resolve) => {
        oepnRequest.onsuccess = () => {
            const db = oepnRequest.result
            const transcation = db.transaction('books', 'readwrite')
            const books = transcation.objectStore('books')
            const requestJS = books.get('js')
            requestJS.onsuccess = () => {
                if (!requestJS.result) {
                    fetch(`http://localhost:3000/static/js/bundle.js`).then((res) => {
                        resolve(res.text())
                    })
                    return
                }
                resolve(true)
            }
        }
    })
}

const init = async (db: IDBDatabase) => {

    const data = await fetchJS()
    const transcation = db.transaction('books', 'readwrite')

    const books = transcation.objectStore('books')
    const requestJS = books.get('js')

    const add = (book: any) => {
        const request = books.add(book)

        request.onsuccess = () => { console.log(request.result) }
        request.onerror = () => { console.log(request.error) }
    }

    requestJS.onsuccess = async () => {
        if (!requestJS.result) {
            const book = {
                id: 's89ad6a',
                content: data
            }
            add(book)
        }
    }
}

oepnRequest.onsuccess = () => {
    const db = oepnRequest.result
    init(db)
}

oepnRequest.onerror = () => {
    console.log(oepnRequest.error)
}


