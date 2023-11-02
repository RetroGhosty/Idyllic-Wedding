<?php

namespace App\choices;

enum ReservationStatusEnum:string{
    case PENDING = "pending";
    case APPROVED = "approved";
    case CANCELLED = "cancelled";
}
