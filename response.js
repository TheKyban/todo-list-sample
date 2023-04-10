const getData = async () => {


    let date = new Date()
    let time = date.toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'})
    let month = date.toLocaleDateString('en-us',{month:"long",day:'2-digit'})


    
    const post = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: "testing post method",
            desc:"posting",
            date:{
                time:time,
                date:month
            }
            
        })

    }

    const put = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: "testing put method",
            desc:"posting",
            _id: '6433720c3c198f6e3e6255d0',
            date:{
                time:time,
                date:month
            }
            
        })

    }
    const deleteM = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            _id: '6433720c3c198f6e3e6255d0'            
        })

    }
    const data = await fetch("http://localhost:7575",deleteM)
    const res = await data.json()
    console.log(res)
}
getData()