@extends('layouts.app')

<style>
    .grid-2 {
        z-index: 50 !important;
    }
</style>

@section('content')
    <div class="flex flex-col sm:items-center py-10 pb-20  lg:items-center" style="margin-top: 70px;">
        <div class="lg:w-[80%]">
            <div class="flex gap-5 sm:justify-start sm:gap-20 pb-10 px-6 sm:px-10 w-full">
                <div>
                    <img src="{{ asset($user->profile->getProfileImage()) }}"
                        class="rounded-full max-w-[100px] sm:max-w-[150px]">
                </div>

                <div class="flex flex-col justify-center sm:gap-3">
                    <div class="flex flex-col sm:flex-row items-center">
                        <h1 class="text-base sm:text-lg font-semibold">{{ $user->username }}</h1>

                        @can('update', $user->profile)
                            <a class="cursor-pointer text-sm sm:ml-8 px-6 my-[0.4rem] py-[0.3rem] sm:py-[0.6rem] bg-gray-100 no-underline hover:font-semibold transition-all"
                                onclick="onClkToggleEditProfile()" role="button">
                                Edit Profile
                            </a>
                        @else
                            <follow-button user-id="{{ $user->username }}" follows="{{ $follows }}"></follow-button>
                        @endcan

                    </div>

                    <div class="sm:flex gap-8 hidden">
                        <div> <strong> {{ $postCount }} </strong> posts</div>
                        <div> <strong> {{ $followersCount }} </strong> followers</div>
                        <div> <strong> {{ $followingCount }} </strong> following</div>
                    </div>

                    <div class="sm:block">
                        <div class="hidden sm:inline-block font-semibold">{{ $user->name }}</div>
                        <span class="font-light">
                            &nbsp;&nbsp;{!! nl2br(e($user->profile->bio)) !!}
                        </span>
                    </div>

                </div>

            </div>

            <div class="flex justify-center py-2 border-t gap-8 sm:hidden">
                <div> <strong> {{ $postCount }} </strong> posts</div>
                <div> <strong> {{ $followersCount }} </strong> followers</div>
                <div> <strong> {{ $followingCount }} </strong> following</div>
            </div>

            <div class="pt-4 grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-4 border-top">

                @forelse ($user->posts as $post)
                    <div class="border">
                        <a class="relative min-h-[300px w-[300px] h-[300px] sm:h-[300px] sm:w-[300px]"
                            href="/p/{{ $post->id }}">
                            <img class="object-cover w-full h-full" src="{{ $post->image_path }}">
                            <div
                                class="absolute group inset-0 transtion-all bg-black bg-opacity-0 hover:bg-opacity-30 flex justify-center items-center gap-3">
                                <span class="hidden group-hover:flex like text-white items-center gap-2">
                                    <i class="fa fa-heart fa-2x"></i>
                                    <p>
                                        {{ count($post->like->where('State', true)) }}
                                    </p>

                                </span>

                                <span class="hidden group-hover:flex comment text-white items-center gap-2">
                                    <i class="far fa-comment fa-2x"></i>
                                    <p>{{ count($post->comments) }}</p>
                                </span>
                            </div>
                        </a>
                    </div>

                @empty
                    <div class="flex flex-col col-span-3 items-center justify-center ">
                        <div class="card-body ">
                            <h1 style="font-size: 25px">No Posts Yet</h1>
                        </div>
                    </div>
                @endforelse
            </div>



        </div>

        <div EditProfileContainer>

            <div EditProfileBackground
                class="fixed top-0 left-0 h-full w-full grid place-items-center opacity-0 invisible bg-black bg-opacity-5 transition-all scale-100"
                onclick="onClkToggleEditProfile()"></div>


            <div EditProfileContent
                class="h-[200px] bg-white absolute hidden Modal-ScaleOut-Center rounded-2xl shadow-2xl min-h-[200px] sm:h-[150px] md:h-[250px] lg:h-[350px]">

                <form method="POST" action="/profile/{{ $user->username }}" enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')
                    <div EditProfileHeader
                        class="flex justify-between items-center text-lg h-12 px-4 font-semibold border-b border-[#DBDBDB]">
                        <span onclick="onClkToggleEditProfile()">
                            <i class="fa-solid fa-xmark transition-all hover:text-black hover:scale-110"></i>
                        </span>

                        <span class="text-[#121316]">Edit Profile</span>

                    </div>

                    <div EditProfileBody class="h-[calc(100%_-_48px)]">

                        <div class="form-group row mt-3">
                            <label for="name" class="col-md-4 col-form-label text-md-right"><strong>
                                    {{ __('Name') }}</strong></label>

                            <div class="col-md-6">
                                <input id="name" type="text"
                                    class="form-control @error('name') is-invalid @enderror" name="name"
                                    value="{{ old('name') ?? $user->name }}" autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row ">
                            <label for="username" class="col-md-4 col-form-label text-md-right"><strong>
                                    {{ __('Username') }}</strong></label>

                            <div class="col-md-6">
                                <input id="username" type="text"
                                    class="form-control @error('username') is-invalid @enderror" name="username"
                                    value="{{ old('username') ?? $user->username }}" autocomplete="username" autofocus>

                                @error('username')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>


                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right"><strong>
                                    {{ __('Email') }}</strong></label>

                            <div class="col-md-6">
                                <input id="email" type="email"
                                    class="form-control @error('email') is-invalid @enderror" name="email"
                                    value="{{ old('email') ?? $user->email }}" autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">

                            <label for="image" class="col-md-4 col-form-label text-md-right"><strong>Change
                                    Profile Photo</strong></label>

                            <div class="col-md-6 ">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input @error('image') is-invalid @enderror"
                                        id="image" name="image">
                                    <label class="custom-file-label"
                                        for="image">{{ old('image') ?? 'Upload Photo...' }}</label>

                                    @error('image')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div style="margin-right: 15px; float: right;">
                            <input type="submit"
                                class="btn btn-primary text-blue-600 text-sm transition-all hover:text-blue-white"
                                value="Edit Changes">
                        </div>

                    </div>
                </form>

            </div>
        </div>

    </div>
@endsection
