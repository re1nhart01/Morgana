const { ipcRenderer } = window.require('electron')
const exitButton = document.querySelector(".__internal__exit_button");
const maximizeButton = document.querySelector(".__internal__maximize_button");
const shrinkButton = document.querySelector(".__internal__shrink_button");
const drawerButton = document.querySelector(".__internal__drawer_button");
const content = document.querySelector("#__internal_application_container")
let isFullScreen = false;
let isOpenedDrawer = false;

exitButton.addEventListener('click', () => {
    const data = null;
    ipcRenderer.send('topBar_close')
});

maximizeButton.addEventListener('click', () => {
    isFullScreen = !isFullScreen;
    maximizeButton.children[0].src = `http://localhost:3000/internal/icons/${isFullScreen ? 'shrink' : 'expand'}.svg`
    ipcRenderer.send('topBar_maximize', isFullScreen)
});

shrinkButton.addEventListener('click', () => {
    const data = null;
    ipcRenderer.send('topBar_shrink')
});

drawerButton.addEventListener('click', () => {
    const data = null;
    const windowWidth = window.innerWidth;
    isOpenedDrawer = !isOpenedDrawer
    content.classList.add('openDrower')
    window.scrollTo({
        left: !isOpenedDrawer ? 0 : windowWidth * 2,
        behavior: 'smooth'
    })
    console.log(windowWidth)
    ipcRenderer.send('topBar_drawer')
});