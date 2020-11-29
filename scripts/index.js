const inquirer = require('inquirer');
const fs = require('fs');

// List of questions
inquirer
    .prompt([{
        type: 'input',
        message: 'What is your project title?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'What is your project description?',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Enter Installation instructions for your project:',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Enter usage details for your project:',
        name: 'usage',
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
        fs.appendFile('my-project-2.md', readMeStr, (err) => {
            if (err !== null)
                console.log(err);
        });
    });