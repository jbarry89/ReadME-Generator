// TODO: Include packages needed for this application
import fs from "node:fs";
import inquirer from "inquirer";

import generateMarkdown from "./utils/generateMarkdown.js";

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "Please Enter a Title Name of your Project:",
  },
  {
    type: "input",
    name: "description",
    message: "Please enter a short description of your project:",
  },
  {
    type: "input",
    name: "installation",
    message: "Please enter installation instructions (if any) of your project:",
  },
  {
    type: "input",
    name: "usage",
    message: "Please provide usage information (include screenshots if available) of your project:",
  },
  {
    type: "input",
    name: "testInstruction",
    message: "Please provide test instructions of your project:",
  },
  {
    type: "list",
    name: "license",
    message: "Please select a License for this project:",
    choices: [
      "MIT License",
      "Apache License 2.0",
      "GNU General Public License (GPL) v3.0",
      "Mozilla Public License 2.0",
      "BSD 3-Clause License",
      "None",
    ],
  },
  {
    type: "input",
    name: "gitHub",
    message: "Please enter your gitHub user name:",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your email address:",
  },
];

const askContributors = async () => {
  let contributors = [];
  let addMore = true;

  while (addMore) {
    const {contributor} = await inquirer.prompt([
      {
        type: "input",
        name: "contributor",
        message: "Please enter name of contributor(s) of this project (Use GitHub user name):",
      }
    ]);

    contributors.push(contributor.trim()); //Trim any spaces

    // Creates a Yes/No Prompt question? If user select "Yes", then confirm = true. If "No", then confirm = false.
    const {confirm} = await inquirer.prompt([ 
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to add another contributor?",
            default: false,  // The default case is false if the user press "Enter" without adding anything.
        }
    ]);

    addMore = confirm; 
  }
return contributors;

};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error("Error writing the file", err);
    } else {
      console.log("README file is successfully generated!");
    }
  });
}

// TODO: Create a function to initialize app
async function init() {
    try{
       const answers = await inquirer.prompt(questions);
    //    console.log(colors.blue(answers)); // making the user answers to the prompt as color blue
       const contributors = await askContributors();  
       answers.contributors = contributors;

       // Generate the markdown file
       const readmeContent = generateMarkdown(answers);
       writeToFile("README.md", readmeContent);

    }catch(error){
        console.error("An Error has occured:", error);
    }
    
}

// Function call to initialize app
init();
