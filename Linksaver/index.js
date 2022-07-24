let myleads = []
let oldleads = []
let editor = false
const inputEl = document.getElementById("input-el")
const buttonEl = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-btn")
const buttonTabEl = document.getElementById("inputtab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))
const deleteSingleEl = document.getElementById("deletesingle-btn")
const el = document


const logopic = ["images/icon16.png"]
const container = document.getElementById("container")
let imgsdom = ""
for (let i = 0; i < logopic.length; i++){
    imgsdom += (`<p>Linksaver - <img id="logo" class="team-img" src="${logopic[i]}"></p>`)
}
container.innerHTML = imgsdom


el.onmouseover = function(){
    el.addEventListener(
        "contextmenu",
        (ev) => {
          ev.preventDefault()
          navigator.clipboard.writeText(ev.target.getAttribute('href')).then(() => {
            let link = ev.target.getAttribute('href')
            console.log(link)
            inputEl.value = link
          }, () => {
            // script
          })
        },
        false
      )
}

if (leadsFromLocalStorage) {
    myleads = leadsFromLocalStorage
    render(myleads)
}

buttonTabEl.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        inputEl.value = tabs[0].url
        for (let i = 0; i < myleads.length; i++){
            if (inputEl.value === myleads[i]) {
                inputEl.value = ""
                break
            }}
        if (inputEl.value === "") {
        } else {
        myleads.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myleads))
        inputEl.value = ""
        render(myleads)
        }
    })
})

deleteSingleEl.addEventListener("dblclick", function() {
    if (inputEl.value === "") {
    } else {
    let link = inputEl.value
    localStorage.clear()
    myleads = myleads.filter(function(e) { return e !== `${link}` })
    localStorage.setItem("myLinks", JSON.stringify(myleads))
    inputEl.value = ""
    render(myleads)
    location.reload()
    return false
    }
})

deleteEl.addEventListener("dblclick", function() {
    localStorage.clear()
    myleads = []
    render(myleads)
    location.reload()
    return false
})

buttonEl.addEventListener("click", function() {
    for (let i = 0; i < myleads.length; i++){
        if (inputEl.value === myleads[i]) {
            inputEl.value = ""
            break}
        } if (inputEl.value === "") {    
        } else {
            myleads.push(inputEl.value)
            localStorage.setItem("myLinks", JSON.stringify(myleads))
            inputEl.value = ""
            render(myleads)
            console.log(localStorage.getItem("myLinks"))
        }
})

function render(leads) {
let listItems = ""
for (let i = 0; i < myleads.length; i++){
   listItems += `
                <li>
                    <a target='_blank' href=${leads[i]}> 
                    ${leads[i]}
                    </a>
                </li>`
    }
    ulEl.innerHTML = listItems
}