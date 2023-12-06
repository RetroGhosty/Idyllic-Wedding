<?php

namespace App\choices;

enum TransactionStatusEnum:string{
    case PENDING = "pending";
    case APPROVED = "approved";
    case CANCELLED = "cancelled";
    case PAID = 'paid';
    case REFUNDED = 'refunded';
    case PENDING_REFUND = 'pending_refund';
}
