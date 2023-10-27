<?php
namespace App\choices;
enum UserAccountStatusEnum: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case DISABLED = 'disabled';
}