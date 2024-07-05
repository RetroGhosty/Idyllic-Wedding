![Mock](https://github.com/RetroGhosty/Idyllic-Wedding/assets/54449218/438de10f-3e6f-4593-a22d-0563c1eb3075)
<p align="center">
Made by Laravel and React with Inertia.js   
</p>
✅ A web application to book a venue for wedding events<br/>
✅ A superadmin access that manages the account of the staff account<br/>
✅ Customizable menu that will help you add and manage venues<br/>
✅ Search button, city and wedding theme filter<br/>
✅ Fully functional e-wallet and credit card payment using Paymongo gateway<br/>   

# Installation

1. `sudo apt install php8.1 (check: php --version)`
2. disable apache2
3. install composer (check: composer --version)
4. `composer install`
5. `npm install`
6. put the authorization details in the .env file
7. `php artisan migrate`

## Database refresher

1. `php artisan migrate:reset`
2. `php artisan migrate`

## How to run the website

1. Open two command prompt
2. First CLI (backend) `php artisan serve`
3. Second CLI (frontend) `npm run dev`
