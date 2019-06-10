// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

let config = {
  url: {}
}

if (NODE_ENV === 'production') {
  config.url.api = 'http://185.252.28.86/api/' // Change this URL according to your live server
} else {
  config.url.api = '/api/'
}

export default config
