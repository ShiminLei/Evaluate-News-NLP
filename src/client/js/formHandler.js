function handleSubmit(event) {
    event.preventDefault()

    const baseURL = "http://localhost:8081/sentimentApi";
    const url = document.getElementById('url').value;

    if (validUrl(url)) {
        fetch(baseURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url})
        })
            .then(res => res.json())
            .then(function (res) {
                document.getElementById('polarity').innerHTML = res.polarity
                document.getElementById('subjectivity').innerHTML = res.subjectivity
            })
    } else {
        alert("The URL is not valid.")
    }
}

function validUrl(url) {
    var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    
    if(regex.test(url)){
        return true;
    }else{
        return false;
    }
}

export {handleSubmit}