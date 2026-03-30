import { useVuelidate } from '@vuelidate/core'
import * as validators from '@vuelidate/validators'

export const validationPlugin = {
  install(app) {
    app.config.globalProperties.$v = useVuelidate
    // Make validators globally available
    app.config.globalProperties.$validators = validators
  }
}

export { useVuelidate, validators }
