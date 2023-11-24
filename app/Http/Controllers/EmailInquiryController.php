<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailInquiryRequest;
use App\Models\EmailInquiry;
use Illuminate\Http\Request;

class EmailInquiryController extends Controller
{
    //
    public function makeInquiry(EmailInquiryRequest $request){
        $validated = $request->validated();
        $messageInquiry = EmailInquiry::create($validated);
        $messageInquiry->save();
        return back()->with('success', 'Your message has been sent successfully');
    }
}
