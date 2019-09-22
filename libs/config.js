'use strict'

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'production',
  port: +process.env.PORT || 5000,
  guardianKey: process.env.GUARDIAN_KEY,
  guardianUrl: process.env.GUARDIAN_URL
}
