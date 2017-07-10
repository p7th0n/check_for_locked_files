# README - Microsoft Windows File Server Locked File Watcher

## Quick summary

* It is common for companies to work from Excel, Word and other files on Windows network shared folders.
* More than one user cannot usually work on these files at the same time.
* It can be hard to see who has a file locked.
* The best way to see who locked a file is from the Windows file server as Administrator. That level of access is not practical for all users for security reasons.
* This tool has two parts:
    * A process that watches for locked files. The watcher uses a list of _watched_ files and folders.
    * A web server that displays the locked files and who locked them. No need for special access.

## Summary of set up

* File server watcher - this Powershell process requires administrator privledges on the Windows file server.
* Web server - the NodeJS simple http-server shows the web page. Microsoft IIS can also host the web page.  Be sure that IIS doesn't cache the content; especially _./assets/data/output.json_.

## Configuration

* wwwroot/index.html - main web page
* wwwroot/assets/css - stylesheet
* wwwroot/assets/data - JSON data containing locked files information
* wwwroot/assets/img - images
* wwwroot/assets/js - JavaScript
* bin/checkforlocks.ps1 - Powershell script

### Configure Watch list

* Open _**bin/checkforlocks.ps1**_
* Change _**$watchList**_ to watch files and folders that you want.
* Save changes.
* Restart the Powershell process if it is running [_**bin/checkforlocks.ps1**_]

### Run Windows Lock File Watcher

* Start with the NodeJS web server - **npm start**
* Start File lock watcher - **npm run watch** [requires _**Administrator**_ privledges]

## Deployment instructions

* Clone to a folder on the file server

### Configure Web Server

* Install [NodeJS](https://nodejs.org/en/) if using the _**http-server**_ or configure the _**wwwroot**_ folder with IIS
* After installing NodeJS change to the cloned folder.
* From the command line run this to install NodeJS http-server:

```bash
npm install
```

* Use IIS manager to serve the wwwroot folder otherwise.
