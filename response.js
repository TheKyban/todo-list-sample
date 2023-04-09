const getData = async () => {


    let date = new Date()
    let time = date.toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'})
    let month = date.toLocaleDateString('en-us',{month:"long",day:'2-digit'})


    let bdata = {
        name: "Aditya",
        desc:"hello from client",
        date:{
            time:time,
            date:month
        }
    }
    const obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(bdata)

    }
    const data = await fetch("http://localhost:7575")
    const res = await data.json()
    console.log(res)
}
getData()