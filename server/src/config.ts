export const ServerConfig = {
    "connectionString": "mongodb://localhost:27017/cgi-imgur",
    "secret": "This is a secret, please do not tell anyone.",
    "imgur-options": {
        method: "GET",
        uri: "https://api.imgur.com/3/gallery/hot/viral/page/",
        headers: {
            "Authorization": "Client-ID f50536c56e9a63c"
        }
    },
    "max-images": 100
};