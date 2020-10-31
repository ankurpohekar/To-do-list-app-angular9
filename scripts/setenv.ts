const fs = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
const colors = require('colors');
require('dotenv').config();
const targetPath = './src/environments/environment.ts';
// `environment.ts` file structure
const envConfigFile = `export const environment = {
	 production: false,
	 firebaseConfig: {
	   apiKey: '${process.env.APIKEY}',
	   authDomain: '${process.env.AUTHDOMAIN}',
	   databaseURL: '${process.env.DATABASEURL}',
	   projectId: '${process.env.PROJECTID}',
	   storageBucket: '${process.env.STORAGEBUCKET}',
	   messagingSenderId: '${process.env.MESSAGINGSENDERID}',
	   appId: '${process.env.APPID}',
	   measurementId: '${process.env.MEASUREMENTID}'
	 }
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});