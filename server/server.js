const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const path = require("path");

const app = express();
const urlDatabase = {}; // In memory Database (for simplicity).

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public" )));

// Function to generate short url identifier \\
function generateShortUrl(longUrl) {
    return crypto
    .createHash('md5')
    .update(longUrl)
    .digest('hex')
    .substring(0, 6);
};

// Endpoint to shorten the URL
app.post("/shorten", (req, res, next) => {
    console.log(`Shorten request invoked!`);
    const longUrl = req.body.longUrl; const shortUrl = generateShortUrl(longUrl);
    urlDatabase[shortUrl] = longUrl;
    
    const shortUrlFull = `${req.protocol}://${req.get('host')}/${shortUrl}`;
    res.json({ shortUrl: shortUrlFull });
});

// Endpoint to redirect to the original URL
app.get('/:shortUrl', (req, res) => {
    console.log("Endpoint activated!")
    const shortUrl = req.params.shortUrl; const longUrl = urlDatabase[shortUrl];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res
        .status(404)
        .send('URL not found');
    }
});

const port = 2500;
app.listen(port, () => {
    console.log(
        `Server running on port ${port} __Viewer Discresion is advised`
    )
});