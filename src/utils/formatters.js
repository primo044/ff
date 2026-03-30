// Date utilities
export const dateUtils = {
  format: (date, format = 'DD/MM/YYYY') => {
    if (!date) return ''
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')

    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year)
      .replace('HH', hours)
      .replace('mm', minutes)
  },

  getDaysDifference: (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2 - d1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  },

  addDays: (date, days) => {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    return d
  },

  isDateInRange: (date, startDate, endDate) => {
    const d = new Date(date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return d >= start && d <= end
  }
}

// String utilities
export const stringUtils = {
  capitalize: (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  slugify: (str) => {
    if (!str) return ''
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },

  truncate: (str, length = 100) => {
    if (!str || str.length <= length) return str
    return str.substring(0, length) + '...'
  },

  escapeHtml: (str) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    return str.replace(/[&<>"']/g, (m) => map[m])
  }
}

// Number utilities
export const numberUtils = {
  format: (num, decimals = 2) => {
    return Number(num).toFixed(decimals)
  },

  formatCurrency: (num, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(num)
  },

  formatPercent: (num, decimals = 2) => {
    return `${Number(num).toFixed(decimals)}%`
  },

  isEven: (num) => num % 2 === 0,
  isOdd: (num) => num % 2 !== 0
}

// Array utilities
export const arrayUtils = {
  unique: (arr) => [...new Set(arr)],

  groupBy: (arr, key) => {
    return arr.reduce((result, obj) => {
      const k = obj[key]
      if (!result[k]) result[k] = []
      result[k].push(obj)
      return result
    }, {})
  },

  sortBy: (arr, key, order = 'asc') => {
    return [...arr].sort((a, b) => {
      if (order === 'desc') {
        return b[key] > a[key] ? 1 : -1
      }
      return a[key] > b[key] ? 1 : -1
    })
  },

  findByKey: (arr, key, value) => {
    return arr.find((item) => item[key] === value)
  },

  chunk: (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }
}

// Object utilities
export const objectUtils = {
  pick: (obj, keys) => {
    return keys.reduce((result, key) => {
      if (key in obj) result[key] = obj[key]
      return result
    }, {})
  },

  omit: (obj, keys) => {
    return Object.keys(obj).reduce((result, key) => {
      if (!keys.includes(key)) result[key] = obj[key]
      return result
    }, {})
  },

  isEmpty: (obj) => {
    return Object.keys(obj).length === 0
  },

  merge: (obj1, obj2) => {
    return { ...obj1, ...obj2 }
  }
}

// Validation utilities
export const validationUtils = {
  isEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },

  isPhone: (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10
  },

  isStrongPassword: (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return re.test(password)
  },

  isUrl: (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
}

// Storage utilities
export const storageUtils = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },

  get: (key) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },

  remove: (key) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  }
}
