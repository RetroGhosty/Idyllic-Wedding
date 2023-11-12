<?php

namespace App\choices;

enum TransactionStatusEnum:string{
    case PENDING = "pending";
    case APPROVED = "approved";
    case CANCELLED = "cancelled";
}
