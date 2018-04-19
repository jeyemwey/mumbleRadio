# What is this?

My friend and I like to listen to a certain web radio show and so I created this small script (mostly) to achieve synchronous playback.

The script takes an HTTP mp3 stream, converts it to PCM and then pushes it in the mumble voice channel.

# Get it going

1. Generate a certificate. Just answer whatever they ask you.
```
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem
```

2. **Fill in the server data.** Open `index.js` and do accordingly. To the loudness: This totally depends on whether you want to talk in this channel and how loud the stations plays its sounds. Just try around with that :)

```
let mumbleServer = ""; // Just the domain and the port, so its "example.org:64738"
let webRadioStream = ""; // The mp3 Stream link, mostly found inside of a m3u file
let gain = 0.5; // How loud shall it get? Value must between 0 and 1
```

3. **Deploy**: Either by running `npm install && node index.js` or putting the beast into a cage:

```
docker build -t jeyemwey/mumbleRadio .
docker run -d jeyemwey/mumbleRadio
```


