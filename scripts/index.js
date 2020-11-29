const inquirer = require('inquirer'); // command-line UI
const fs = require('fs'); // FileSystem
let licenseAbbrev = {
    'MIT': 'MIT',
    'GNU GPLv3': 'GNUGPLv3',
    'Mozilla Public 2.0': 'MP2.0',
    'Apache 2.0': 'Apache2.0',
    'Boost Software 1.0': 'BS1.0'
};

// List of questions
inquirer
    .prompt([{
        type: 'input',
        message: 'Enter project title:',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Enter project description:',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Enter comma-separated installation instructions for your project:',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Enter usage details for your project:',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Enter contribution guidelines for your project:',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'Enter comma-separated test instructions for your project:',
        name: 'testing',
    },
    {
        type: 'rawlist',
        message: 'Choose a license for your project:',
        name: 'license',
        choices: ['MIT', 'GNU GPLv3', 'Mozilla Public 2.0', 'Apache 2.0', 'Boost Software 1.0'],
    },
    {
        type: 'input',
        message: 'Enter your github user-name:',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Enter your e-mail address:',
        name: 'email',
    },
    ])
    .then((response) => {
        // Empty readMeStr string
        let readMeStr = '';
        // Add project title
        let title = ('# ' + response.title.trim() + '\n\n');
        readMeStr += title;
        // Add project description
        let description = '## ' + 'Description\n' + `${response.description.trim()}` + '\n\n';
        readMeStr += description;
        // Add TOC
        let toc = '## ' + 'Table of Contents\n';
        toc += '* [Installation](#installation)\n';
        toc += '* [Usage](#usage)\n';
        toc += '* [Contributing](#contributing)\n';
        toc += '* [Tests](#tests)\n';
        toc += '* [License](#license)\n';
        toc += '* [Questions](#questions)\n\n';
        readMeStr += toc;
        // Add installation instructions
        let installationStepsArray = response.installation.split(",");
        let installationListMd = '';
        // process comma-separated data
        for (let i = 0; i < installationStepsArray.length; i++) {
            installationListMd += `${i + 1}. ${installationStepsArray[i].trim()}\n`;
        }
        let installation = '## ' + 'Installation\n' + `${installationListMd}` + '\n\n';
        readMeStr += installation;
        // Add usage information
        let usage = '## ' + 'Usage\n' + `${response.usage.trim()}` + '\n\n';
        readMeStr += usage;
        // Add contributing information
        let contributing = '## ' + 'Contributing\n' + `${response.contributing.trim()}` + '\n\n';
        readMeStr += contributing;
        // Add testing information
        let testStepsArray = response.testing.split(",");
        let testListMd = '';
        // process comma-separated data
        for (let i = 0; i < testStepsArray.length; i++) {
            testListMd += `${i + 1}. ${testStepsArray[i].trim()}\n`;
        }
        let testing = '## ' + 'Tests\n' + `${testListMd}` + '\n\n';
        readMeStr += testing;
        // Add license information
        let license = '## ' + 'License\n' + 'This application is covered under the ' + `${response.license}` + ' license.\n\n';
        // Add license section to end of README
        readMeStr += license;
        let licenseShield = `![license](https://img.shields.io/badge/license-${licenseAbbrev[response.license]}-brightgreen)` + '\n';
        // Add badge to top of README
        licenseShield += readMeStr;
        // Update README
        readMeStr = licenseShield;
        // Add github information
        let githubLink = `https://github.com/${response.github.trim()}`;
        let githubLinkMd = `[${githubLink}](${githubLink})`;
        let github = '## ' + 'Questions\n' + `${response.github.trim()}: ${githubLinkMd}` + '<br>';
        readMeStr += github;
        // Add email
        readMeStr += `For additional questions, send an e-mail to: <${response.email.trim()}>\n\n`;
        // write everything to file
        fs.appendFile('output.md', readMeStr, (err) => {
            if (err !== null)
                console.log(err);
        });
    });