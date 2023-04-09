const express = require('express')
const mongoose = require('mongoose')
const app = express()
const db = "todoLists" // Database Name

mongoose.connect(`mongodb://127.0.0.1:27017/${db}`).then(() => console.log("connected")).catch((err) => console.log(err)) //Connection

const date = new Date()
const time = date.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" })
const month = date.toLocaleDateString("default", { month: "long", day: "numeric" });


const userName = "aditya"
const setUser = mongoose.Schema({
    user:String,
    password:String
})
const list = mongoose.Schema({
    name: String,
    desc: String,
    date: Object
})
const Lists = mongoose.model(userName, setUser || list)

const List = new Lists({ // data
    name: "todo_list",
    desc: "complete the project",
    date: { time: time, date: month }
    // user:"Aditya",
    // password:"123"
})

List.save();
const deleteAllData = async () => { // delete the collection
    const status = await Lists.deleteMany({})
    console.log(status.acknowledged);
}
const getData = async () => { // Get data of the collection
    const data = await Lists.find()
    return data
}


app.use(express.json())

app.get("/", async (req, res) => { // Sending Json data of that collections
    const data = await getData()
    res.json(data)
})

app.post("/", async (req, res) => {
    const data = req.body
    const name = data.name
    const desc = data.desc
    const time = data.time
    const date = data.date
    console.log(data)
    res.send(data)
})
app.listen(7575, () => console.log("http://localhost:7575"))