document.getElementById('urlForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const longUrl = document.getElementById('longUrl').value;
    const response = await fetch('http:/localhost:2500/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl })
    });
    const result = await response.json();
    document.getElementById('result').innerHTML = `Short URL is: <a href="${result.shortUrl}" target="_blank">${result.shortUrl}</a>`;
});