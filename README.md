# README - Microsoft Windows File Server Locked File Watcher

## Quick summary

* It is common for companies to work from Excel, Word and other files on Windows network shared folders.
* More than one user cannot usually work on files like Excel at the same time.
* When trying to open a locked network file it can be hard to see who has it locked.
* The best method to see who has a file locked is from the Windows file server.  But that requires Administrator level access. That level of access is not practical for all users for security reasons.
* This tool has two parts:
    * A Powershell process that watches for locked files and saves the result.
    * A web server that displays the locked files and who has them locked.
* No special access is require to view the web results.
* The Powershell process uses list of _watched_ files and folders. This limits the number of files displayed. This also allows it to avoid showing sensitive files or network folders.

## Summary of set up

* File server watcher - the Powershell process requires administrator privledges on the Windows file server.  It runs in a continuous loop.
* Web server - the NodeJS simple http-server is included to show the web page. Microsoft IIS can also host the **wwwroot** folder.  Be sure that IIS doesn't cache the content; especially _./assets/data/output.json_.

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

* Install NodeJS if using the _**http-server**_ or configure the _**wwwroot**_ folder with IIS
* After installing NodeJS change to the cloned folder.
* From the command line run this to install NodeJS http-server:

```bash
npm install
```

* Use IIS manager to serve the wwwroot folder otherwise.
