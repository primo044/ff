import { createMongoAbility } from '@casl/ability'
import { createPinia } from 'pinia'

// Define ability factory
export const defineAbilitiesFor = (user) => {
  const { can, rules } = createMongoAbility()

  if (!user) {
    return can
  }

  // Admin can do everything
  if (user.roles?.includes('ADMIN')) {
    can('manage', 'all')
  } else {
    // Define default permissions based on roles
    user.roles?.forEach((role) => {
      switch (role) {
        case 'MANAGER':
          can('read', 'all')
          can('create', ['Client', 'Project', 'Contract'])
          can('update', ['Client', 'Project', 'Contract'])
          break
        case 'EMPLOYEE':
          can('read', ['Client', 'Project', 'Contract'])
          break
        case 'USER':
          can('read', ['Dashboard'])
          break
        default:
          break
      }
    })
  }

  return can
}

// Vue plugin
export const caslPlugin = {
  install(app, ability) {
    app.config.globalProperties.$ability = ability
    app.provide('$ability', ability)
  }
}
