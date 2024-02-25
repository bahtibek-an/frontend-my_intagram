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

        $imageArray = [];
        $imageArray2 = [];

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('/profile', 'public');
            $imageArray = ['image' => $imagePath];
        }

        if ($request->hasFile('image')) {
            $imagePath2 = $request->file('image')->store('/users-avatar', 'public');
            $imageArray2 = ['avatar' => $imagePath2];
        }

        auth()->user()->profile->update(array_merge(
            $dataProfile,
            $imageArray
        ));

        auth()->user()->update(array_merge(
            $dataUser,
            $imageArray2
        ));

        return redirect('/profile/' . auth()->user()->username);
    }
}
