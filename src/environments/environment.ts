// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiUrl : "http://api.fyltravel.it:8000/api/",

  providers : {
    "google": { 
      "clientId": "546741882410-qnsepcr5183n5hi25f49dn5ms5hqo5ku.apps.googleusercontent.com"
    },
    // "linkedin": {
    //   "clientId": "LINKEDIN_CLIENT_ID"
    // },
    "facebook": {
      "clientId": "174233093153100",
      "apiVersion": "v2.10" //like v2.4 
    }
  }


};
