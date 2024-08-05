console.log('Test says hello world!!!')

function createURL(){
    const long_url = document.getElementById("long_url").value

    if(long_url == ''){
        alert('Please provide a url!')
        return
    }

    const apiUrl = '/get-short-url'

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ long_url })
    })
    .then(response => response.json())
    .then(data => {
        console.log('data is here ==> ', data)
    })
    .catch((err) => {
        console.error('Error: ', err)
    })

}