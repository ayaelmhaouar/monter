<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class userController extends Controller
{
    public function index(){


        if (Auth::user()->user_type=="user"){
           return view('dashbord');
    }
        
        else if (Auth::user()->user_type=="admin"){
           return view('admin.dashbord');
    }
}

}