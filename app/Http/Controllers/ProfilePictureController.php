<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilePictureController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {

        return view('profile_picture.new_picture');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'picture' => ['required', 'image', 'mimes:jpeg,png,jpg,gif'],
        ]);

        $user = auth()->user();

        // Delete the previous profile picture if it exists
        $previousPicture = $user->profile_picture;
        if ($previousPicture) {
            // Unlink the old profile picture file
            if (Storage::exists("public/pictures/{$previousPicture}")) {
                Storage::delete("public/pictures/{$previousPicture}");
            }
        }

        $image = $request->file('picture');
        $extension = $image->getClientOriginalExtension();
        $filename = \Illuminate\Support\Str::uuid() . '.' . $extension;

        // Use the store method to store the image in the 'public/pictures' directory
        $path = $image->storeAs('public/pictures', $filename);

        // You can also resize the image here if needed using Intervention Image or other image processing libraries

        // Update the user's profile picture field with the new filename
        $user->profile_picture = $filename;
        $user->save();

        return redirect()->route('account', ['user' => $user]);
    }

}
