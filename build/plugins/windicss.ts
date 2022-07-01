import windiCSS from 'vite-plugin-windicss'

export default windiCSS({
  scan: {
    dirs: '.', // 当前目录下所有文件
    fileExtensions: ['vue', 'js', 'ts', 'tsx'] // 同时启用扫描vue/js/ts
  },
  config: {
    darkMode: 'class',
    transformCSS: 'post',
    attributify: {
      prefix: 'a:'
    },
    alias: {
      test: 'bg-[#0ECAFF]'
    },
    shortcuts: {
      'wh-full': 'w-full h-full',
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex-center flex-col'
    },
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary-color)',
          'primary-hover': 'var(--primary-color-hover)',
          'primary-pressed': 'var(--primary-color-pressed)',
          'primary-active': 'var(--primary-color-active)',
          info: 'var(--info-color)',
          'info-hover': 'var(--info-color-hover)',
          'info-pressed': 'var(--info-color-pressed)',
          'info-active': 'var(--info-color-active)',
          success: 'var(--success-color)',
          'success-hover': 'var(--success-color-hover)',
          'success-pressed': 'var(--success-color-pressed)',
          'success-active': 'var(--success-color-active)',
          warning: 'var(--warning-color)',
          'warning-hover': 'var(--warning-color-hover)',
          'warning-pressed': 'var(--warning-color-pressed)',
          'warning-active': 'var(--warning-color-active)',
          error: 'var(--error-color)',
          'error-hover': 'var(--error-color-hover)',
          'error-pressed': 'var(--error-color-pressed)',
          'error-active': 'var(--error-color-active)'
        },
        backgroundColor: {
          dark: '#101014',
          light: '#FCFCFC',
          base: '#1F222A'
        },
        textColor: {
          base: '#FCFCFC'
        },
        transitionProperty: [
          'width',
          'height',
          'background',
          'background-color',
          'padding-left',
          'border-color',
          'right',
          'fill'
        ]
      }
    }
  }
})
