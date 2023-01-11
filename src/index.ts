import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false
    })
    mainWindow.loadURL('https://pikokr.dev/')
    mainWindow.maximize()
    mainWindow.on('close', event => {
        event.preventDefault()
        mainWindow.hide()
    })
})


app.whenReady().then(() => {
    let tray = new Tray(path.dirname(path.basename(__dirname)) + '/assets/icon.ico')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Chat', type: 'normal', click: () => {
                window.loadURL('https://pikokr.dev/my/messaging')
                window.focus()
            }
        },
        {
            label: 'Notification', type: 'normal', click: () => {
                window.loadURL('https://pikokr.dev/my/notifications')
                window.focus()
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
                app.quit()
            }
        }
    ])
    tray.setToolTip('Pikokr Misskey')
    tray.setContextMenu(contextMenu)
})
