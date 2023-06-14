const loading = document.querySelector(".loading");
const header = document.querySelector("#header")
const playlist = document.querySelector(".row");

function hideLoading() {
    loading.classList.add("loaded");
    header.style.animation = "fade 1s";
}

function toDate(value) {
    const date = new Date(value);
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const formattedDate = ('0' + day).slice(-2) + '-' + ('0' + month).slice(-2) + '-' + year;
    
    return formattedDate;
}

fetch("https://api.aozora.my.id/bbgemu/playlists")
.then(res => res.json())
.then(res => {
    res.items.forEach(function(item, index) {
        let col = document.createElement("div");
        col.classList.add("col-lg-6");
        col.classList.add("col-md-6");
        
        if (res.items.length == index + 1 && index % 2 == 0) {
            col.classList.add("offset-lg-3");
            col.classList.add("offset-md-3");
        }
        
        let list = document.createElement("div");
        let a = document.createElement("a");
        list.classList.add("list");
        a.href = "https://youtube.com/playlist?list=" + item.id;
        
        let img = document.createElement("img");
        img.src = item.thumbnails.maxres.url;
        img.alt = item.title;
        a.appendChild(img);
        
        let info = document.createElement("div");
        info.classList.add("info");
        info.innerHTML = `<h3><b>${item.title}</b></h3>`;
        info.innerHTML += `<div class="data"><i class="bx bx-calendar-event"></i><span>${toDate(item.publishedAt)}</span><vl></vl><i class="bx bx-movie-play"></i><span>${item.itemCount}</span></div>`
        a.appendChild(info);
        
        list.appendChild(a);
        col.appendChild(list);
        playlist.appendChild(col);
    });
    
    hideLoading();
});