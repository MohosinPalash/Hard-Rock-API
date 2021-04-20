const searchSong = () =>{
    const song = document.getElementById("input-field").value;
    const url = `https://api.lyrics.ovh/suggest/${song}`;
    fetch(url)
    .then(response => response.json())
    .then(data => showSongsList(data.data));
}
const showSongsList = songs =>{
    const songList = document.getElementById('songs-list');
    songList.innerHTML = "";
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className ="single-result row align-items-center my-3 p-3";

        songDiv.innerHTML =`
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick="showLyrics('${song.title}', '${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
        </div>
        <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
        </audio>
        `
        songList.appendChild(songDiv);
    })
}

const showLyrics = (title, artist) =>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("song-lyrics").innerText = data.lyrics;
    });

}