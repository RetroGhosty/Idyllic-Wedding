# Important

1. Laging mag git pull bago magsimula mag code
    - kung bash ang gamit: `git pull`
    - kung naka github desktop
        1. Click fetch
        2. Click pull
2. Laging mag test muna ng code `php artisan test` bago mag `git push`
   
# Installation

1. `sudo apt install php8.1 (check: php --version)`
2. disable apache2
3. install composer (check: composer --version)
4. `composer install`
5. `npm install`
6. ilagay sa .env yung mga database details
7. `php artisan migrate`

## Database refresher

1. `php artisan migrate:reset`
2. `php artisan migrate`

## How to run the website

1. Mag open ng dalawang CLI
2. First CLI (backend) `php artisan serve`
3. Second CLI (frontend) `npm run dev`
