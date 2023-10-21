<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageNotFoundController extends Controller
{
    public function index(){
        return Inertia::render("NotFound");
    }
}
