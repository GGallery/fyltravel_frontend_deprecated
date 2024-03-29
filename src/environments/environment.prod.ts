// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiUrl : 'https://api.fyltravel.it/api/',
  travelCoverPath : 'https://api.fyltravel.it/storage/_t/',
  travelImagePath : 'https://api.fyltravel.it/storage/_i/',
  travelVideoPath : 'https://api.fyltravel.it/storage/_v/',

  profileImagePath : 'https://api.fyltravel.it/storage/_p/big/',

  customIconPath : 'assets/images/icon/',

  socialProviders : {
    'google': {
      'clientId': '546741882410-qnsepcr5183n5hi25f49dn5ms5hqo5ku.apps.googleusercontent.com'
    },
    // "linkedin": {
    // "clientId": "LINKEDIN_CLIENT_ID"
    // },
    'facebook': {
      'clientId': '174233093153100',
      'apiVersion': 'v2.10' // like v2.4
    }
  },

  googleMapKey:  'AIzaSyDAat_fwjWbHV6KanrhyZzcNEVBuzpVND8'


};
