const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Start the server listening on all network interfaces
app.listen(port, '192.168.137.1', () => {
  console.log(`Server running at http://192.168.137.1:${port}/`);
  console.log('You can access this server from other machines on the network using this machine\'s IP address and the port.');
});
