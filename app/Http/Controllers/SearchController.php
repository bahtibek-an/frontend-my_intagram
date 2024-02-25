<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $q = $request->input('q');
        $user = User::where('username', 'LIKE', '%' . $q . '%')->orWhere('email', 'LIKE', '%' . $q . '%')->get();
        // $profile = Profile::where('user_id',$user->id);
        foreach ($user as $person) {
            $profile = Profile::where('user_id', $person->id)->first();
            $person->profile = $profile;
            $person->image_path = ($profile->image) ? "/storage/$profile->image" : "img/default.png";
        }
        if (count($user) > 0)
            return response()->json($user);
        return response()->json(['error' => 'No results found']);
    }
}
