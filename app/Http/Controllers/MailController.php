<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\signupEmail;
use Illuminate\Support\Facades\Mail;


class MailController extends Controller
{
    public static function sendSignupMail($name, $email,$verification_code){
        $data = [
            'name' => $name,
            'verification_code' => $verification_code
        ];
        // Mail::to($email) -> send(new signupEmail($data));
    }
}
