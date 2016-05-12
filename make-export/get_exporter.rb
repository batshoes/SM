require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :authorization => 'Token API_KEY',
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.get 'https://api.salemove.com/sites/SITE_ID/crm/exports', headers
response = JSON.parse response
puts response