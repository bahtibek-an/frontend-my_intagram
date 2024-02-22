<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Intervention\Image\Facades\Image;


class ProfilesController extends Controller
{
    public function index(User $user)
    {

        $follows = (auth()->user()) ? auth()->user()->following->contains($user->profile) : false;

        $postCount = Cache::remember(
            'count.posts.' . $user->id,
            now()->addSeconds(10),
            function () use ($user) {
                return $user->posts->count();
            }
        );

        $followersCount = Cache::remember(
            'count.followers.' . $user->id,
            now()->addSeconds(10),
            function () use ($user) {
                return $user->profile->followers->count();
            }
        );

        $followingCount = Cache::remember(
            'count.following.' . $user->id,
            now()->addSeconds(10),
            function () use ($user) {
                return $user->following->count();
            }
        );

        return view('profiles.index', compact('user', 'follows', 'postCount', 'followersCount', 'followingCount'));
    }

    public function edit(User $user)
    {
        $this->authorize('update', $user->profile);

        return view('profiles.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user->profile);

        $dataProfile = $request->validate([
            'website' => ['sometimes', 'url', 'nullable'],
            'bio' => ['sometimes', 'string', 'nullable'],
            'image' => ['sometimes', 'image', 'max:3000']
        ]);

        $dataUser = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        if (request('image')) {
            $imagePath = request('image')->store('/profile', 'public');
            $image = Image::make(public_path("storage/{$imagePath}"))->fit(300, 300);
            $image->save();
            $imageArray = ['image' => $imagePath];
        }
        if(request('image')){
            $imagePath = request('image')->store('/users-avatar', 'public');
            $image = Image::make(public_path("storage/{$imagePath}"))->fit(300, 300);
            $imagePath2 = $image->filename.'.'.$image->extension;
            $image->save();
            $imageArray2 = ['avatar' => $imagePath2];
        }
        auth()->user()->profile->update(array_merge(
            $dataProfile,
            $imageArray ?? []
            // ['image' => $imagePath ?? $user->profile->image]
        ));

        auth()->user()->update(array_merge(
            $dataUser,
            $imageArray2 ?? []
        ));

        return redirect('/profile/' . auth()->user()->username);
    }

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
