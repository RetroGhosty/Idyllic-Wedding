# Installation
1. apt install php8.1 (check: php --version)
2. disable apache2 
3. install composer (check: composer --version)
4. composer install
5. npm install
6. ilagay sa .env yung mga database details
7. php artisan migrate
8. dagdag mo ito!!
9. config -> database.php
10. hanapin mo ito: https://imgur.com/eUynBkf
11. Tapos idagdag mo ito sa ilalim ng 'engine' => null

## .env
- APP_NAME="Idyllic-Wedding"
- APP_ENV=local
- APP_KEY=base64:DqmnMUpGjQOvF9BjlXI67JvMBcfiaSHVxkC0OaGg0Ts=
- APP_DEBUG=true
- APP_URL=http://localhost

- DB_CONNECTION=mysql
- DB_HOST=db-mysql-sgp1-90992-do-user-14606689-0.c.db.ondigitalocean.com
- DB_PORT=25060
- DB_DATABASE=defaultdb
- DB_USERNAME=doadmin
- DB_PASSWORD=AVNS_OaryjuMTPupy_4kd_Ic
- DB_SSLMODE=REQUIRED

- MAIL_MAILER=mailgun
- MAIL_HOST=mailpit
- MAIL_PORT=587
- MAIL_USERNAME=postmaster@ph.redemption-dev.online
- MAIL_PASSWORD=3a2f5e9a77b8b97508f7dcb8f3c4fd40-3750a53b-8510d6fd
- MAIL_ENCRYPTION=SSL
- MAILGUN_DOMAIN=ph.redemption-dev.online
- MAILGUN_SECRET=fb580727c384ef2c17dbe7b905c282bb-3750a53b-e5fad418
- MAIL_FROM_ADDRESS="plant-ecommerce@no-reply.com"
- MAIL_FROM_NAME="${APP_NAME}"

- VITE_APP_NAME="${APP_NAME}"
- VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
- VITE_PUSHER_HOST="${PUSHER_HOST}"
- VITE_PUSHER_PORT="${PUSHER_PORT}"
- VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
- VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
