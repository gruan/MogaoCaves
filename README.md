# Dunhuang Caves
This website encompasses all the work done on the caves.

It's main purpose is to showcase our work to the outside world, including
Harvard and the Dunhuang Research Academy.

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Developing Locally](#developing-locally)
  - [Required Software](#required-software)
  - [Testing Locally](#testing-locally)
- [Server Setup](#server-setup)
  - [Droplet Configuration Instructions](#droplet-configuration-instructions)
      - [Login As Root](#login-as-root)
      - [Create A New User](#create-a-new-user)
      - [Add Root Privileges](#add-root-privileges)
      - [(Optional) Add Public Key Authentication.](#optional-add-public-key-authentication)
      - [Configure SSH Daemon](#configure-ssh-daemon)
      - [Reload SSH](#reload-ssh)
  - [Obtaining the Project](#obtaining-the-project)
      - [Add The Droplet's SSH Key To Git](#add-the-droplets-ssh-key-to-git)
      - [Cloning the Project](#cloning-the-project)
      - [Install Node Modules](#install-node-modules)
  - [Setting Up FTP](#setting-up-ftp)
      - [Install A FTP Service](#install-a-ftp-service)
      - [Configure vsftpd](#configure-vsftpd)
      - [Reload vsftpd](#reload-vsftpd)
  - [Migrate Large Files with FTP](#migrate-large-files-with-ftp)
  - [Deploying the Server](#deploying-the-server)
      - [Install forever](#install-forever)
      - [Boot Up the Server!](#boot-up-the-server)
  - [Domain Name Service Setup](#domain-name-service-setup)
      - [Change The DNS](#change-the-dns)
      - [Configure Droplet Domain](#configure-droplet-domain)
- [Troubleshoot Issues](#troubleshoot-issues)
  - [Broken Videos - FTP Solution](#broken-videos---ftp-solution)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Developing Locally
The project may be cloned at [git@github.com:gruan/MogaoCaves.git](git@github.com:gruan/MogaoCaves.git)

### Required Software
- npm
- nodemon

### Testing Locally
Navigate to the directory with server.js and run
```
$ npm install
$ nodemon server.js
```

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

### Setting Up FTP
Due to the size of certain files, they are not hosted on Github and must
be transferred using FTP.

##### Install A FTP Service
In the following, we use vsftpd as our FTP service.
```
sudo apt-get install vsftpd
```

##### Configure vsftpd
By default, vsftpd allows access as anonymous users.
Open the configuration file:
```
$ sudo vim /etc/vsftpd.conf
```
Copy and paste the following as the entire file
```
listen=YES
anonymous_enable=NO
anon_root=/home/user
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/private/vsftpd.pem
```

##### Reload vsftpd
```
$ sudo service vsftpd restart
```

Access the FTP service using FileZilla or the command line.

### Migrate Large Files with FTP
The following need to be migrated. The list may be incomplete, so update it
if there is an item that is missing or no longer needed.
```
- PROJDIR/app/video/
```

### Deploying the Server
##### Install forever
```
$ sudo npm install -g forever
```
##### Boot Up the Server!
Before deploying, change the port from 8080 to 80 in `server.js`
```
$ vim server.js
// change var port = 8080 to var port = 80
```
To deploy the server, run the following in the project directory:
```
$ sudo forever start server.js
```
To stop the server, run:
```
$ sudo forever stopall
```

### Domain Name Service Setup
##### Change The DNS
Change the "Domain Name Server" fields to include:
**ns1.digitalocean.com**
**ns2.digitalocean.com**
**ns3.digitalocean.com**

##### Configure Droplet Domain
Navigate to Domains on Digital Ocean and add the droplet to your domain name.
The following fields are of interest:
- *A* IPv4 Address - Put @ and the IPv4 Address of the droplet
- *AAAA* IPv6 Address - Put @ and the IPv6 Address of the droplet only if it has an IPv6 Address.
- *CNAME* Subdomain Alias - Put \* and @. This field has the subdomain (name) field act as an alias of the Hostname. Here, \* acts as a wildcard.

Note: \* acts as a wildcard and @ is an alias to the domain name with nothing before it.

## Troubleshoot Issues
This section details issues that may be encountered.

### Broken Videos - FTP Solution
Due to the videos being too large to host on Github, they must be loaded onto
the server manually. See [here](#setting-up-ftp)
