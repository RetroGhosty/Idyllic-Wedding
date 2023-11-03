<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
class ContactController extends Controller
{
    public function view(){
        return Inertia::render('Guest/Contact');
    }
}
