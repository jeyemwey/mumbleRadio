var mumble = require('mumble'),
    fs = require('fs'),
    request = require('request'),
    lame = require('lame');

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

let mumbleServer = 'paulsurrey.de'; // Just the domain and the port, so its 'example.org:64738'
let webRadioStream = 'http://wdr-1live-diggi.icecast.wdr.de/wdr/1live/diggi/mp3/128/stream.mp3?ar-distributor=ffa1'; // The MP3 Stream-Link
let gain = 0.5; // How loud shall it get? Value must between 0 and 1
let mumbleUser = 'AudioBot' // The default user name.

// const unique = Date.now() % 10;

mumble.connect(mumbleServer, options, function (error, connection) {
    if(error) { throw new Error(error); }
    console.log( 'Connected...' );
    connection.authenticate(mumbleUser);
    // connection.authenticate('stream-' + unique);
    connection.on('initialized', function() {
        console.log('MUM: Connection established');
        const decoder = new lame.Decoder();
        let s;
        decoder.on('format', function(f) {
            console.log(f);
            s.pipe(connection.inputStream({
                channels: f.channels,
                sampleRate: f.sampleRate,
                gain: gain
            }));
        });
        s = request(webRadioStream).pipe(decoder);
    });
});
