![Mock](https://github.com/RetroGhosty/Idyllic-Wedding/assets/54449218/438de10f-3e6f-4593-a22d-0563c1eb3075)

✅ A web application to book a venue for wedding events
✅ A superadmin access that manages the account of the staff account
✅ Fully functional e-wallet and credit card payment using Paymongo gateway

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
