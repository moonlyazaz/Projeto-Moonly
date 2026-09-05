const play = require('play-dl');

async function test() {
    try {
        console.log("Fetching info with play-dl...");
        const info = await play.video_info("https://www.youtube.com/watch?v=AAuxleW1bMg");
        console.log("Success:", info.video_details.title);
    } catch (e) {
        console.error("Play-dl Error:", e.message);
    }
}

test();
