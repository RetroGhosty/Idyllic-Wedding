# Important

## Ubuntu directory
`/etc/nginx`
`/etc/nginx/sites-available`
`/var/www/{project_name}`

## Nginx Access and Error log helps alot
`/var/log/nginx/`

## Checking nginx current user
`ps aux | grep "nginx: worker process" | awk '{print $1}' | grep -v root`
   
## PREVIOUSLY ENCOUNTERED ERRORS
What | Why
1. Nginx returns 502 bad gateaway : PHP-FPM is not running

# Installation \ Production

1. install node.js with ubuntu node manager nvm
`https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating`

2. install node.js version 21 
`nvm use 21 (means version 21)`

3. install php
`sudo apt install --no-install-recommends php8.2-cli`

4. install the necessary
`sudo apt install php8.2-cli php8.2-fpm curl php8.2mbstring php8.2-xml unzip`

5. install the cloned repository
`composer install`
`npm install`

6. Set permission, get inside the cloned repository then type
`chown -R www-data storage
``chown -R www-data bootstrap/cache`
`sudo ls -l (for checking)`

7. symbolically link the file to the /etc/nginx/sites-enabled
`sudo ln -s /etc/nginx/sites-available/{project_name} /etc/nginx/sites-enabled`
`sudo nginx -t`

8. Cleaning up
`systemctl restart nginx`
`php artisan migrate`
`npm run build`


## Database refresher

1. `php artisan migrate:reset`
2. `php artisan migrate`

