import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const toastConfig = {
  autoClose: 3000,
  position: 'top-right',
  closeButton: true,
  pauseOnHover: true,
  draggable: true
}

export const toastPlugin = Toast
