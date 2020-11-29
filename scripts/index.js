const inquirer = require('inquirer'); // command-line UI
const fs = require('fs'); // FileSystem
var licenseAbbrev = {
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
        message: 'Enter installation instructions for your project:',
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
        message: 'Enter test instructions for your project:',
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
        var readMeStr = '';
        // Add project title
        var title = ('# ' + response.title + '\n\n');
        readMeStr += title;
        // Add project description
        var description = '## ' + 'Description\n' + `${response.description}` + '\n\n';
        readMeStr += description;
        // Add installation instructions
        var installation = '## ' + 'Installation\n' + `${response.installation}` + '\n\n';
        readMeStr += installation;
        // Add usage information
        var usage = '## ' + 'Usage\n' + `${response.usage}` + '\n\n';
        readMeStr += usage;
        // Add contributing information
        var contributing = '## ' + 'Contributing\n' + `${response.contributing}` + '\n\n';
        readMeStr += contributing;
        // Add testing information
        var testing = '## ' + 'Tests\n' + `${response.testing}` + '\n\n';
        readMeStr += testing;
        // Add license information
        var license = '## ' + 'License\n' + 'This application is covered under the ' + `${response.license}` + ' license \n\n';
        // Add license section to end of README
        readMeStr += license;
        var licenseShield = `![license](https://img.shields.io/badge/license-${licenseAbbrev[response.license]}-brightgreen)` + '\n';
        // Add badge to top of README
        licenseShield += readMeStr;
        // Update README
        readMeStr = licenseShield;
        // Add github information
        var githubLink = `https://github.com/${response.github}`;
        var githubLinkMd = `[${githubLink}](${githubLink})`;
        var github = '## ' + 'Questions\n' + `${response.github}: ${githubLinkMd}` + '\n';
        readMeStr += github;
        // Add email
        readMeStr += `For additional questions, send an e-mail to: <${response.email}>\n\n`;

        // write everything to file
        fs.appendFile('my-project-06.md', readMeStr, (err) => {
            if (err !== null)
                console.log(err);
        });
    });