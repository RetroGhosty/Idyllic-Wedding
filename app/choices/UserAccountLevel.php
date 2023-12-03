<?php
namespace App\choices;
enum UserAccountLevel:string{
    case SUPERADMIN = "superadmin";
    case ADMIN = "admin";
    case VENDOR = "vendor";
    case CUSTOMER = "customer";
}
