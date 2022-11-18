interface Window {
  $ipc: import('@quiteer/electron-preload').PreloadIpc
  $clipboard: import('@quiteer/electron-preload').PreLoadPath
  $webFrame: import('@quiteer/electron-preload').PreloadWebFrame
  $path: import('@quiteer/electron-preload').PreLoadPath
  $loadingBar: import('naive-ui').LoadingBarProviderInst
  $dialog: import('naive-ui').DialogProviderInst
  $message: import('naive-ui').MessageProviderInst
  $notification: import('naive-ui').NotificationProviderInst
}

declare module '*.json'
