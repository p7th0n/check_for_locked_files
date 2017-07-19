# README - File Server Locked File Watcher

## Who has that damn Excel file locked

Companies work from Excel, Word and other files on network shared folders.  More than one user cannot usually work on these files at the same time.  Time is lost tracking down who has the file locked.

It can be hard to see who has a file locked. Sometimes Excel or Word shows who.  But not always. Other file like shared PDF's and CAD file types do not help much.

One way to see who locked a file is from the Windows file server as Administrator. Not practical for security reasons.

This tool has two parts:

* A watcher that checks for locked files. The watcher uses a search list for _watched_ files and folders.
* A web server that displays the locked files and who locked them. No need for special access. Just check a web page.

**Demo** -- [https://p7th0n.github.io/check_for_locked_files/](https://p7th0n.github.io/check_for_locked_files/)

## Quick setup

* Clone or download and extract this repo to a folder on the file server.
* Install [NodeJS](https://nodejs.org/en/) and npm if not installed.
* Open a command prompt at the repo location and run **npm install** to install **http-server**.
* Run **npm start** to start the webserver.  By default it runs on **port 80** so if that is a problem edit _package.json_ _scripts/start_.  
* Open [http://fileserver-name](http://fileserver-name/) to watch for locked files.
* In a separate command prompt start the watcher - **npm run watch** [requires _**Administrator**_ privledges]

![Screenshot](./wwwroot/assets/img/check-lock-files-screenshot.png)

### Configure Watch list

* Open _**wwwroot/assets/data/watchlist.json**_
* Add, remove or edit items in the watchList array.
* Save changes.
* The watcher reads _watchlist.json_ on each cycle so there's no need to restart the Powershell watcher process.

```json

{
    "watchList": [
        "README",
        "dave",
        "checkforlocks"
    ]
}

```

## Summary

* File server watcher - the Powershell process requires administrator privileges on the Windows file server.
* Web server - the NodeJS http-server serves the web page. 
* TODO - Microsoft IIS can also host the web page.  The setup steps are coming soon.