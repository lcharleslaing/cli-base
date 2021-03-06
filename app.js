#!/usr/bin/env node
const { exec } = require("child_process")
const fs = require("fs")
const inquirer = require("inquirer")
const prependFile = require('prepend-file');
const path = require('path');

const BaseGen = require("./lib/BaseGen")

// App Questions
const questions = [
    {
        type: "input",
        name: "title",
        message: "Project Title?",
        default: "Sample Cool Project"
    },
    {
        type: "input",
        name: "description",
        message: "Project Description?",
        default: "Sample Cool Project Description"

    },
    {
        type: "input",
        name: "installation",
        message: "Installation instructions?",
        default: "npm i sample-cool-project"

    },
    {
        type: "input",
        name: "usage",
        message: "Project Usage?",
        default: "npm run sample-coool-project"

    },
    {
        type: "input",
        name: "contribution",
        message: "Contribution Information?",
        default: "John Henry Doe, Sara Sue Doe"

    },
    {
        type: "input",
        name: "firstname",
        message: "First name?",
        default: "Your first name"
    },
    {
        type: "input",
        name: "middlename",
        message: "Middle name?",
        default: "Your middle name"
    },
    {
        type: "input",
        name: "lastname",
        message: "Last name?",
        default: "Your last name"
    },
    {
        type: "input",
        name: "website",
        message: "My Website that uses this package?",
        default: "https://www.my-website.com"
    },
    {
        type: "input",
        name: "email",
        message: "Email me @ ?",
        default: "my-email@gmail.com"
    },
    {
        type: "input",
        name: "github",
        message: "Check out my Github @ ?",
        default: "your github username"
    },
    {
        type: "input",
        name: "patreon",
        message: "Patreon username?",
        default: "your patreon username"
    },
    {
        type: "input",
        name: "twitter",
        message: "Twitter username?",
        default: "twitter username"
    },
    {
        type: "input",
        name: "linkedin",
        message: "LinkedIn username?",
        default: "linkedin username"
    },
    {
        type: "list",
        name: "license",
        message: "License?",
        default: "MIT",
        choices: ['MIT', 'ISC'],
        filter(val) {
            return val.toLowerCase()
        },
    },
]

const makeDir = (path) => {
    fs.mkdir(path,
        {
            recursive: true
        }, (err) => {
            if (err) {
                console.log("error occurred in creating new directory", err);
                return;
            }

            console.log("New directory created successfully");
        });
}

const createFile = (file, data) => {
    if (!file) {
        fs.writeFile(file, data, (err) => {
            if (err) {
                console.log(`Could not save your README.md file`);
            } else {
                console.log("Successfully create your README.md file")
            }
        })

    } else {
        prependFile(file, data)
    }
}

// Run query function
async function runQuery() {
    return inquirer.prompt(questions)
        .then((answers) => {
            exec("npm i")
            exec("npm i @auth0/auth0-spa-js")
            const markdown = MarkDown.generateReadme(answers)
            const envfile = Env.generateEnv()
            const auth0Configfile = Config.generateConfig()
            const auth0Servicefile = Service.generateService()
            const auth0Storefile = Store.generateStore()
            const layoutfile = Layout.generate()
            const componentfile = Component.generate()
            const navbarfile = Navbar.generate()

            const auth0ServiceFileDir = `./src/lib/auth`
            const auth0ConfigFileDir = `./src/lib/auth`
            const auth0StoreFileDir = `./src/lib/auth`
            const componentsDir = `./src/lib/components`
            const routesDir = `./src/routes`

            makeDir(auth0ConfigFileDir)
            makeDir(auth0ServiceFileDir)
            makeDir(auth0StoreFileDir)
            makeDir(componentsDir)
            makeDir(routesDir)

            createFile("NEW-README.md", markdown)
            createFile("AUTH0.env", envfile)
            createFile(`${auth0ConfigFileDir}/auth0_config.js`, auth0Configfile)
            createFile(`${auth0ServiceFileDir}/auth0_service.js`, auth0Servicefile)
            createFile(`${auth0StoreFileDir}/authStore.js`, auth0Storefile)
            createFile(`${componentsDir}/SveltekitAuth0.svelte`, componentfile)
            createFile(`${componentsDir}/NavbarAuth0.svelte`, navbarfile)
            createFile(`${routesDir}/__layout.svelte`, layoutfile)
        })
        .catch((error) => { console.log("error: ", error); })
}
runQuery()
