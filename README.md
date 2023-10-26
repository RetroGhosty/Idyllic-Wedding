# Important
Laging mag git pull bago magsimula mag code 
* kung bash ang gamit: ```git pull``` 
* kung naka github desktop
    1. Click fetch
    2. Click pull


# Installation
1. ```sudo apt install php8.1 (check: php --version)```
2. disable apache2 
3. install composer (check: composer --version)
4. ```composer install```
5. ```npm install```
6. ilagay sa .env yung mga database details
7. ```php artisan migrate```

## Database refresher
1. ```php artisan migrate:reset```
2. ```php artisan migrate```

## How to run the website
1. Mag open ng dalawang CLI
2. First CLI (backend) ```php artisan serve```
3. Second CLI (frontend) ```npm run dev```

## Creating environment variables
### ```.env```
```
APP_NAME="Idyllic Wedding"
APP_ENV=local
APP_KEY=base64:DqmnMUpGjQOvF9BjlXI67JvMBcfiaSHVxkC0OaGg0Ts=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=db-mysql-sgp1-90992-do-user-14606689-0.c.db.ondigitalocean.com
DB_PORT=25060
DB_DATABASE=defaultdb
DB_USERNAME=doadmin
DB_PASSWORD=AVNS_OaryjuMTPupy_4kd_Ic
DB_SSLMODE=REQUIRED
MAIL_MAILER=mailgun
MAIL_HOST=mailpit
MAIL_PORT=587
MAIL_USERNAME=postmaster@ph.redemption-dev.online
MAIL_PASSWORD=3a2f5e9a77b8b97508f7dcb8f3c4fd40-3750a53b-8510d6fd
MAIL_ENCRYPTION=SSL
MAILGUN_DOMAIN=ph.redemption-dev.online
MAILGUN_SECRET=fb580727c384ef2c17dbe7b905c282bb-3750a53b-e5fad418
MAIL_FROM_ADDRESS="plant-ecommerce@no-reply.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```
### ```.env.testing```
```
APP_NAME="Idyllic Wedding"
APP_ENV=local
APP_KEY=base64:DqmnMUpGjQOvF9BjlXI67JvMBcfiaSHVxkC0OaGg0Ts=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=db-mysql-sgp1-90992-do-user-14606689-0.c.db.ondigitalocean.com
DB_PORT=25060
DB_DATABASE=idyllic-db-test
DB_USERNAME=doadmin
DB_PASSWORD=AVNS_OaryjuMTPupy_4kd_Ic

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=mailgun
MAIL_HOST=smptp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=postmaster@ph.redemption-dev.online
MAIL_PASSWORD=3a2f5e9a77b8b97508f7dcb8f3c4fd40-3750a53b-8510d6fd
MAIL_ENCRYPTION=SSL
MAILGUN_DOMAIN=ph.redemption-dev.online
MAILGUN_SECRET=fb580727c384ef2c17dbe7b905c282bb-3750a53b-e5fad418
MAIL_FROM_ADDRESS="plant-ecommerce@no-reply.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```
