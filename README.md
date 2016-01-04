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

### Droplet Configuration Instructions
Before beginning, deploy an Ubuntu droplet with NodeJS pre-installed.
##### Login As Root
Using the password from the e-mail.  
```
# ssh root@SERVER_IP_ADDRESS
```  
##### Create A New User
```
# adduser NEW_USER
```
##### Add Root Privileges
Add the user to the sudo group.
```
# gpasswd -a NEW_USER sudo
```
##### (Optional) Add Public Key Authentication.
Install ssh-copy-id if necessary.  
```
local$ ssh-copy-id NEW_USER@SERVER_IP_ADDRESS
```  
##### Configure SSH Daemon
Open the configuration file located here:
```
# vim /etc/ssh/sshd_config
```
Change `PermitRootLogin` from yes to no:
```
PermitRootLogin no    // Previously was 'PermitRootLogin yes'
```
Save and close the configuration file.

##### Reload SSH
Restart the SSH service:
```
# service ssh restart
```
Before logging out from the droplet, test that NEW_USER is correctly setup and
has root privileges.
```
local$ ssh NEW_USER@SERVER_IP_ADDRESS
$ sudo echo cats
```
Logout from the root account.

### Obtaining the Project
##### Add The Droplet's SSH Key To Git
If there are no ssh keys in `$ ~/.ssh/id_rsa`, create an ssh key.
```
// Only if there is no ssh key
$ ssh-keygen -t rsa -b 4096 -C "email@example.com"
```
Add the ssh key to Github
```
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa
$ vim ~/.ssh/id_rsa.pub
```
Copy and paste the full ssh key to your github account.

##### Cloning the Project
Install git, initialize a new git directory, and pull from the repo.
```
$ sudo apt-get update
$ sudo apt-get install git
$ mkdir PROJDIR
$ cd PROJDIR
$ git init
$ git remote add origin GIT_REPO
$ git pull origin master
```

##### Install Node Modules
Install the Node Package Manager
```
$ sudo apt-get install npm
```
Install the repository's node modules
```
$ npm install
```
For testing purposes, install nodemon
```
$ sudo npm install -g nodemon
```



### Domain Name Service Setup
TODO

## Troubleshoot Issues
This section details issues that may be encountered.

### Broken Videos - FTP Solution
Due to the videos being too large to host on Github, they must be loaded onto
the server manually.

To load them manually, use FTP and FileZilla.
To connect to the FTP
