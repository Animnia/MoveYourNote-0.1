const { ipcRenderer } = require('electron')
document.getElementById('changebtn').addEventListener('click',()=>{
    ipcRenderer.send('open-new-window')
})

document.getElementById('writebtn').addEventListener('click',()=>{
    ipcRenderer.send('open-write-window')
})