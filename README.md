# Dunhuang Caves
This website encompasses all the work done on the caves.

It's main purpose is to showcase our work to the outside world, including
Harvard and the Dunhuang Research Academy.

## Developing Locally
The project may be cloned at [git@github.com:gruan/MogaoCaves.git](git@github.com:gruan/MogaoCaves.git)

### Required Software
- npm
- nodemon

### Testing Locally
1. Navigate to the directory with server.js.
2. `# npm install`
3. `# nodemon server.js`

## Server Setup
This section details the process in setting up the server.

### Setup From Scratch
#### Droplet Configuration Instructions
Before beginning, deploy an Ubuntu droplet with NodeJS pre-installed.
- **Login As Root**  
Use the password from the e-mail.  
`# ssh root@SERVER_IP_ADDRESS`
- `# adduser NEW_USER` **Create A New User.**
- `# gpasswd -a NEW_USER sudo` **Add Root Privileges.** Add the user to the sudo group.
- `local$ ssh-copy-id NEW_USER@SERVER_IP_ADDRESS` **(Optional) Add Public Key Authentication.** Install ssh-copy-id if necessary.
-






### Domain Name Service Setup
TODO

### Accessing the server
Ask for permission.

## Troubleshoot Issues
This section details issues that may be encountered.

### Broken Videos - FTP Solution
Due to the videos being too large to host on Github, they must be loaded onto
the server manually.

To load them manually, use FTP and FileZilla.
To connect to the FTP
