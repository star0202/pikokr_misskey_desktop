import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false
    })
    mainWindow.removeMenu()
    mainWindow.loadURL('https://pikokr.dev/')
    mainWindow.maximize()
})


app.whenReady().then(() => {
    mainWindow.on('close', event => {
        event.preventDefault()
        mainWindow.hide()
    })
    let tray = new Tray(path.dirname(path.basename(__dirname)) + '/assets/icon.ico')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Chat', type: 'normal', click: () => {
                mainWindow.loadURL('https://pikokr.dev/my/messaging')
                mainWindow.maximize()
            }
        },
        {
            label: 'Notification', type: 'normal', click: () => {
                mainWindow.loadURL('https://pikokr.dev/my/notifications')
                mainWindow.maximize()
            }
        },
        {
            label: 'Settings', type: 'normal', click: () => {
                mainWindow.loadURL('https://pikokr.dev/settings')
                mainWindow.maximize()
            }
        },
        {
            label: 'Quit', type: 'normal', click: () => {
                app.exit()
            }
        }
    ])
    tray.setToolTip('Pikokr Misskey')
    tray.setContextMenu(contextMenu)
    tray.on('double-click', () => {
        if (!mainWindow.isVisible()) {
            mainWindow.maximize()
        }
    })
})
