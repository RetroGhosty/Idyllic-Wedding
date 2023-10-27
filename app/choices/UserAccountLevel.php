<?php
namespace App\choices;
enum UserAccountLevel:string{
    case ADMIN = "admin";
    case VENDOR = "vendor";
    case CUSTOMER = "customer";
}
