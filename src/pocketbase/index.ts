
// Import the PocketBase JS library
import PocketBase from 'pocketbase'

// Init the PocketBase instance with the correct URL.
// By setting this in a .env file you can easily switch between development and production environments
const client = new PocketBase('http://127.0.0.1:8090');

export default client