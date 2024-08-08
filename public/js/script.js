console.log('Test says hello world!!!')

function createURL(){
    let long_url = document.getElementById("long_url").value

    if(long_url == ''){
        alert('Please provide a url!')
        return
    }
    
    if (!long_url.includes('http://') && !long_url.includes('https://')) {
        long_url = 'https://' + long_url
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
        console.log('data is here ==> ', data);

        const resultSection = document.getElementById('result-section')
        resultSection.style.display = 'block'

        const urlSection = document.getElementById('final-url-section')
        urlSection.innerText = `${window.location.origin}/${data.short_url}`
        urlSection.href = `${window.location.origin}/${data.short_url}`
    })
    .catch((err) => {
        console.error('Error: ', err)
    })

}