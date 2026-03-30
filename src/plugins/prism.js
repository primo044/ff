import 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-bash'
import 'prismjs/themes/prism-tomorrow.css'

export const prismPlugin = {
  install(app) {
    app.config.globalProperties.$prism = window.Prism
  }
}
