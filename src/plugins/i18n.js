import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    common: {
      home: 'Home',
      logout: 'Logout',
      login: 'Login',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      back: 'Back',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort'
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      loginError: 'Login failed. Please check your credentials.',
      logoutSuccess: 'You have been logged out successfully.'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Manage your business operations',
      modules: 'Modules',
      modulesSubtitle: 'Access all system modules',
      statisticsTitle: 'Business Statistics',
      statisticsSubtitle: 'Track key performance indicators',
      keyMetrics: 'Key Metrics',
      analytics: 'Analytics',
      summary: 'Summary',
      loading: 'Loading...',
      loadingStatistics: 'Loading dashboard statistics...',
      refresh: 'Refresh',
      clientStatus: 'Client Status',
      employeeBySector: 'Employees by Sector',
      projectStatus: 'Project Status',
      userByRole: 'Users by Role',
      contractStatus: 'Contract Status',
      totalClients: 'Total Clients',
      totalEmployees: 'Total Employees',
      totalProjects: 'Total Projects',
      totalContracts: 'Total Contracts',
      totalUsers: 'Total Users',
      active: 'Active',
      inactive: 'Inactive'
    },
    clients: {
      title: 'Clients',
      subtitle: 'Manage and track all your clients'
    },
    contracts: {
      title: 'Contracts',
      subtitle: 'View and manage client contracts'
    },
    users: {
      title: 'Users',
      subtitle: 'Manage user accounts and permissions'
    },
    projects: {
      title: 'Projects',
      subtitle: 'Manage client and company projects'
    },
    actions: {
      create: 'Create',
      logout: 'Logout',
      dashboard: 'Dashboard',
      clients: 'Clients',
      users: 'Users',
      settings: 'Settings',
      add: 'Add',
      edit: 'Edit',
      update: 'Update',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      saving: 'Saving...',
      loading: 'Loading...',
      manage: 'Manage',
      managementTitle: 'Management'
    },
    theme: {
      dark: 'Dark',
      light: 'Light',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode'
    },
    nav: {
      dashboard: 'Dashboard',
      clients: 'Clients',
      users: 'Users',
      roles: 'Roles',
      rights: 'Rights',
      sectors: 'Sectors',
      employees: 'Employees',
      parametrage: 'Parametrage',
      security: 'Security',
      statistics: 'Statistics'
    },
    management: {
      rolesManagement: 'Roles Management',
      usersManagement: 'Users Management',
      rightsManagement: 'Rights Management',
      addRole: 'Add Role',
      addRight: 'Add Right',
      addUser: 'Add User',
      editUser: 'Edit User',
      createUser: 'Create User',
      editRole: 'Edit Role',
      createRole: 'Create Role',
      noRolesFound: 'No roles found',
      noRightsFound: 'No rights found',
      createOne: 'Create one',
      manageRights: 'Manage Rights'
    },
    footer: {
      about: 'About',
      aboutText: 'ERP KAY System - Enterprise Resource Planning Solution',
      quickLinks: 'Quick Links',
      support: 'Support',
      emailSupport: 'Email Support',
      documentation: 'Documentation',
      contactUs: 'Contact Us',
      copyright: '© 2026 ERP KAY System. All rights reserved.',
      version: 'v1.0.0'
    },
    modules: {
      clients: {
        title: 'Clients',
        desc: 'Manage client accounts & profiles'
      },
      contacts: {
        title: 'Contacts',
        desc: 'Client contact management'
      },
      contracts: {
        title: 'Contracts',
        desc: 'Client contract management'
      },
      followups: {
        title: 'Follow-ups',
        desc: 'Contract follow-up tracking'
      },
      contractTypes: {
        title: 'Contract Types',
        desc: 'Contract type definitions'
      },
      clientProjects: {
        title: 'Client Projects',
        desc: 'Projects for clients'
      },
      users: {
        title: 'Users',
        desc: 'User accounts & authentication'
      },
      roles: {
        title: 'Roles',
        desc: 'Role definitions & hierarchy'
      },
      rights: {
        title: 'Rights',
        desc: 'Access rights & permissions'
      },
      sectors: {
        title: 'Sectors',
        desc: 'Organizational sector management'
      },
      employees: {
        title: 'Employees',
        desc: 'Employee directory & records'
      },
      functions: {
        title: 'Functions',
        desc: 'Function definitions'
      },
      metiers: {
        title: 'Metiers',
        desc: 'Trade & profession management'
      },
      projects: {
        title: 'Projects',
        desc: 'General project management'
      },
      organizations: {
        title: 'Organizations',
        desc: 'Organization management'
      }
    }
  },
  fr: {
    common: {
      home: 'Accueil',
      logout: 'Déconnexion',
      login: 'Connexion',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      back: 'Retour',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier'
    },
    auth: {
      login: 'Connexion',
      logout: 'Déconnexion',
      email: 'Email',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié?',
      loginError: 'Erreur de connexion. Veuillez vérifier vos identifiants.',
      logoutSuccess: 'Vous avez été déconnecté avec succès.'
    },
    dashboard: {
      title: 'Tableau de bord',
      subtitle: 'Gérez vos opérations commerciales',
      modules: 'Modules',
      modulesSubtitle: 'Accédez à tous les modules du système',
      statisticsTitle: 'Statistiques commerciales',
      statisticsSubtitle: 'Suivez les indicateurs clés de performance',
      keyMetrics: 'Métriques clés',
      analytics: 'Analyses',
      summary: 'Résumé',
      loading: 'Chargement...',
      loadingStatistics: 'Chargement des statistiques du tableau de bord...',
      refresh: 'Actualiser',
      clientStatus: 'Statut des clients',
      employeeBySector: 'Employés par secteur',
      projectStatus: 'Statut des projets',
      userByRole: 'Utilisateurs par rôle',
      contractStatus: 'Statut des contrats',
      totalClients: 'Total des clients',
      totalEmployees: 'Total des employés',
      totalProjects: 'Total des projets',
      totalContracts: 'Total des contrats',
      totalUsers: 'Total des utilisateurs',
      active: 'Actif',
      inactive: 'Inactif'
    },
    clients: {
      title: 'Clients',
      subtitle: 'Gérer et suivre tous vos clients'
    },
    contracts: {
      title: 'Contrats',
      subtitle: 'Consulter et gérer les contrats clients'
    },
    users: {
      title: 'Utilisateurs',
      subtitle: 'Gérer les comptes utilisateurs et permissions'
    },
    projects: {
      title: 'Projets',
      subtitle: 'Gérer les projets clients et entreprise'
    },
    actions: {
      create: 'Créer',
      logout: 'Déconnexion',
      dashboard: 'Tableau de bord',
      clients: 'Clients',
      users: 'Utilisateurs',
      settings: 'Paramètres',
      add: 'Ajouter',
      edit: 'Modifier',
      update: 'Mettre à jour',
      delete: 'Supprimer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      saving: 'Enregistrement...',
      loading: 'Chargement...',
      manage: 'Gérer',
      managementTitle: 'Gestion'
    },
    theme: {
      dark: 'Sombre',
      light: 'Clair',
      switchToDark: 'Passer au mode sombre',
      switchToLight: 'Passer au mode clair'
    },
    nav: {
      dashboard: 'Tableau de bord',
      clients: 'Clients',
      users: 'Utilisateurs',
      roles: 'Rôles',
      rights: 'Droits',
      sectors: 'Secteurs',
      employees: 'Employés',
      parametrage: 'Paramétrage',
      security: 'Sécurité',
      statistics: 'Statistiques'
    },
    management: {
      rolesManagement: 'Gestion des rôles',
      usersManagement: 'Gestion des utilisateurs',
      rightsManagement: 'Gestion des droits',
      addRole: 'Ajouter un rôle',
      addRight: 'Ajouter un droit',
      addUser: 'Ajouter un utilisateur',
      editUser: 'Modifier l\'utilisateur',
      createUser: 'Créer un utilisateur',
      editRole: 'Modifier le rôle',
      createRole: 'Créer un rôle',
      noRolesFound: 'Aucun rôle trouvé',
      noRightsFound: 'Aucun droit trouvé',
      createOne: 'En créer un',
      manageRights: 'Gérer les droits'
    },
    footer: {
      about: 'À propos',
      aboutText: 'Système ERP KAY - Solution de Planification des Ressources Entreprise',
      quickLinks: 'Liens rapides',
      support: 'Support',
      emailSupport: 'Support par email',
      documentation: 'Documentation',
      contactUs: 'Nous contacter',
      copyright: '© 2026 Système ERP KAY. Tous les droits réservés.',
      version: 'v1.0.0'
    },
    modules: {
      clients: {
        title: 'Clients',
        desc: 'Gérer les comptes et profils clients'
      },
      contacts: {
        title: 'Contacts',
        desc: 'Gestion des contacts clients'
      },
      contracts: {
        title: 'Contrats',
        desc: 'Gestion des contrats clients'
      },
      followups: {
        title: 'Suivi des contrats',
        desc: 'Suivi des contrats en cours'
      },
      contractTypes: {
        title: 'Types de contrats',
        desc: 'Définition des types de contrats'
      },
      clientProjects: {
        title: 'Projets clients',
        desc: 'Projets pour les clients'
      },
      users: {
        title: 'Utilisateurs',
        desc: 'Comptes utilisateurs et authentification'
      },
      roles: {
        title: 'Rôles',
        desc: 'Définition des rôles et hiérarchie'
      },
      rights: {
        title: 'Droits',
        desc: 'Droits d\'accès et permissions'
      },
      sectors: {
        title: 'Secteurs',
        desc: 'Gestion des secteurs organisationnels'
      },
      employees: {
        title: 'Employés',
        desc: 'Annuaire des employés et dossiers'
      },
      functions: {
        title: 'Fonctions',
        desc: 'Définition des fonctions'
      },
      metiers: {
        title: 'Métiers',
        desc: 'Gestion des métiers et professions'
      },
      projects: {
        title: 'Projets',
        desc: 'Gestion générale des projets'
      },
      organizations: {
        title: 'Organisations',
        desc: 'Gestion des organisations'
      }
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'fr',
  fallbackLocale: 'fr',
  messages
})
