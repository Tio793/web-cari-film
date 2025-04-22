const apiKey = "5e92caec";
const filmContainer = document.getElementById("content");
const info = document.getElementById("info");
let daftarFilm = [];

async function getMovie(){
    const keyWord = document.getElementById("input").value.toLowerCase()
    if(keyWord.length === 0) return alert("Masukan Judul Film!")
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${keyWord}`) 
        const data = await response.json()
        console.info(data)
        if(!response.ok){
            throw new Error(`Error : ${response.statusText}`)
        }
        
        if(data.Response == "False"){
            filmContainer.innerHTML = `<p class="text-2xl">❌ Film Tidak Ditemukan</p>`
            daftarFilm = [];
            return
        }
        
        daftarFilm = data.Search
        boxContent(daftarFilm) // tampilkan filmm
        info.textContent =""
    }catch(err){
        console.error(err)
    }
}

getMovie()

function boxContent(dataFetch){
    filmContainer.innerHTML = ""
    dataFetch.forEach(data => {
        filmContainer.innerHTML +=`
        <div class="bg-white w-150 h-auto shadow-xl rounded-md border-1 border-slate-200 px-2">
        <h1 class="text-3xl mt-4">${data.Title}</h1>
        <h2 class="text-2xl mt-4 mb-2">${data.Year}</h2>
        <img src="${data.Poster}" class="w-65 h-70 object-cover mb-2">
      </div>
        `
    })
}

function filterTahun(){
    const tahun = daftarFilm.filter(data => data.Year > 2010);
    boxContent(tahun)
    info.textContent = `🚀 ${tahun.length} Film di tampilkan setelah filter`

    if(daftarFilm.length == 0){
        info.innerHTML = `<p class="text-2xl">❌ Tidak ada film yang terFilter</p>`
    }
}

function totalFilm(){
    const total = daftarFilm.length
    const totalFilm = daftarFilm.reduce((acc,data) => acc + ", " + data.Title, " ").slice(2);
    info.textContent = `📊 ${total} Film di tampilkan: ${totalFilm}`
    if(totalFilm.length == 0){
        info.innerHTML = `<p class="text-2xl">❌ Tidak ada film</p>`
    }
}