
const addTodo = document.querySelector('.adder');
const plus_icon = document.querySelector(".ask");
const task = document.getElementById('task')
const description = document.getElementById('des')
const addButton = document.getElementById('add')
const page = document.querySelector(".items")

const url = "https://todo-db-7nuv.onrender.com/"
// const url = "http://localhost:7575"

const fetchData = async () => {

    const data = await fetch(url)
    const res = await data.json()
    return res;
}

const uploadingDataToPage = async (datafunction) => {
    const data = await datafunction()
    let todo = ""
    Array.from(data).forEach(i => {
        todo += `
    
    <div class="item" id=${i._id}>
                <h2>${i.name}</h2>
                <p>${i.desc}</p>
                <button class="btn">✓</button>
            </div>
    `;
        page.innerHTML = todo
    })
}

const deleteListenerToAllButton = () => {
    const deleteBtns = document.querySelectorAll(".btn")
    deleteBtns.forEach(btn => {
        deleteListenerToButton(btn)
    })

}

const deleteListenerToButton = (button) => {
    button.onclick = async () => {
        const parent = button.parentElement
        const id = parent.getAttribute("id")


        const obj = {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        }

        document.querySelector(".items").removeChild(parent)
        const checkDeleted = await fetch(url, obj)
    }
}
(async () => {
    await uploadingDataToPage(fetchData)
    deleteListenerToAllButton()
})()


const todoAdder = async () => {

    let task_value = task.value;
    let description_value = description.value

    if (task_value.length > 0 && description_value.length > 0) {


        // ***************************************************//

        const div = document.createElement('div') // div
        div.setAttribute("class", "item") // div class

        const h2 = document.createElement('h2') // h2
        const task_text = document.createTextNode(task_value) // h2 text
        h2.appendChild(task_text) // appending text in h2


        const p = document.createElement('p') // p
        const description_text = document.createTextNode(description_value) // p text
        p.appendChild(description_text) // appending text in p

        const btn = document.createElement('button') //button
        const btn_text = document.createTextNode("✓") //button text -
        btn.setAttribute("class", "btn") // set class to the button
        btn.appendChild(btn_text) // appending text to button

        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(btn)

        // ***************************************************//


        // pushing update to server
        let date = new Date()
        let time = date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
        let month = date.toLocaleDateString('en-us', { month: "long", day: '2-digit' })
        
        page.appendChild(div) // appending the div contains todo in page
        addTodo.style.display = "none"
        task.value = ""
        description.value = ""

        
        const obj = {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                name: task_value,
                desc: description_value,
                date: {
                    time: time,
                    date: month
                }

            })
        }
        const posted = await fetch(url, obj)



        const addingIdToTheTodo = async () => {
            const data = await fetchData()
            const id = data[data.length - 1]["_id"]
            div.setAttribute("id", id)
        }
        addingIdToTheTodo()
        deleteListenerToButton(btn)
    }

}

plus_icon.onclick = () => {
    addTodo.style.display = "block"
    addButton.onclick = todoAdder
}