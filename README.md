# tumblr-reader
This app is a simple browser based feed reader for tumblr blogs, built on the tumblr api and using angular 2.

# Screenshots
## Desktop
![Desktop Screenshot](docs/Screenshot_Desktop.png)

## Mobile
![Mobile Screenshot](docs/Screenshot_Mobile.png)

# Using the app
## Shortcuts
- Next Post: `j`
- Previous Post: `k`


- Next Blog: `shift + j`
- Previous Blog: `shift + k`

# Running the app
## Generate a tumblr api key
1. Generate a tumblr api key as described [here](https://www.tumblr.com/docs/en/api/v2#what_you_need).

2. Create a file named `config.json` under `src/app/config` with the following content (replace placeholders with the
key you just generated):
  ```
  {
    "consumerKey": "Your consumer key here",
    "secretKey": "Your secret key here"
  }
  ```

## Development
To run the app locally for development, clone the repository, install the dependencies with `npm install` and 
start the development server with `npm start` the app is then available in the browser under `localhost:8080`.

## Production (Apache)
1. Build the app using `npm run build` - the generated files will appear in the `dist` directory.

2. Create the directory `tumblr-reader` in the www root of your apache server and place the generated files from 
the `dist` directory there.

3. Enable `AllowOverride` in your apache configuration and place a `.htaccess` file in the `tumblr-reader` directory
with the following content: 

  ```
  <IfModule mod_rewrite.c>
      Options Indexes FollowSymLinks
      RewriteEngine On
      RewriteBase /tumblr-reader
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . index.html [L]
  </IfModule>
  ```

# License
This project is licensed under the MIT license. See the LICENSE file for details.
