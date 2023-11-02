<?php
namespace App\choices;

enum PaymentMethodEnum:string{
    case GCASH = "gcash";
    case COD = "cash-on-delivery";
    case PAYMAYA = "paymaya";
}