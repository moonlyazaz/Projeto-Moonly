const ytdl = require('@distube/ytdl-core');

async function test() {
    try {
        console.log("Fetching info...");
        const info = await ytdl.getInfo("https://www.youtube.com/watch?v=AAuxleW1bMg");
        console.log("Success:", info.videoDetails.title);
    } catch (e) {
        console.error("YTDL Error:", e.message);
    }
}

test();
