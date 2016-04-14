var remote = require('remote');
var app = remote.app;
var Menu = remote.require('menu');
var Dialog = remote.require('dialog');
var packageJson = require('./package.json');

const OSX = process.platform === 'darwin';
const WIN = process.platform === 'win32';

// Menu bar
var template = [{
    label: app.getName(),
    submenu: [{
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: function (item, focusedWindow) {
            focusedWindow.close();
        }
    }
]
},
{
    label: 'File',
    submenu: [
        {
            label: 'New',
            accelerator: 'CmdOrCtrl+N',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    newFile();
                }
            }
        },
        {
            label: 'Open',
            accelerator: 'CmdOrCtrl+O',
            click: function(item, focusedWindow) {
                if (focusedWindow) {
                    dialogOpenFile();
                }
            },
        },
        {
            label: 'Save',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    saveFile();
                }
            },
            accelerator: 'CmdOrCtrl+S',
        },
        {
            label: 'Save as ...',
            accelerator: 'CmdOrCtrl+Shift+S',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    dialogSaveAs();
                }
            },
        },
        // { type: 'separator' },
        // {
        //     label: 'Save as LocalStorage',
        //     accelerator: 'CmdOrCtrl+Shift+S',
        //     click: function (item, focusedWindow) {
        //         if (focusedWindow) {
        //             focusedWindow.webContents.executeJavaScript('save()');
        //         }
        //     }
        // },
        // {
        //     label: 'Clear as LocalStorage',
        //     accelerator: 'CmdOrCtrl+Shift+Delete',
        //     click: function (item, focusedWindow) {
        //         if (focusedWindow) {
        //             focusedWindow.webContents.executeJavaScript('clear()');
        //         }
        //     }
        // },
    ]
},
{
    label: 'Edit',
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
},
{
    label: 'Window',
    submenu: [
        {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function (item, focusedWindow) {
                if (focusedWindow)
                focusedWindow.reload();
            }
        },
        {
            label: 'Toggle Full Screen',
            accelerator: (function () {
                return OSX ? 'Ctrl+Command+F' : 'F11';
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow)
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
        },
        {
            label: 'Toggle Developer Tools',
            accelerator: (function () {
                return OSX ? 'Alt+Command+I' :'Ctrl+Shift+I';
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow)
                focusedWindow.toggleDevTools();
            }
        },
    ]
},
{
    label: 'Help',
    submenu: [
        {
            label: 'Release Note',
            click: function () {
                require('shell').openExternal('https://github.com/hiro0218/editor/releases');
            }
        },
        { type: 'separator' },
        {
            label: 'About',
            click: function () {
                dialogAbout();
            }
        },
    ]
}];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);