<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Title --}}
    <title>{{ config('app.name', 'InstaClone') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/add.js') }}" defer></script>
    {{-- <script src="{{ asset('js/create-post.js') }}" defer></script> --}}
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('css/add.css') }}" rel="stylesheet">
    {{-- <link href="{{ asset('css/scss.css') }}" rel="stylesheet"> --}}
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />


</head>


<body>
    <div id="app" class="containerr content">
        <div class="z-10">
            <div class="sidebar ">
                <header class="sidebar-header">
                    <h2 class="" style="font-size: 28px; margin-left: 10px;">Instagram</h2>
                    <i class="logo-icon uil uil-instagram"></i>
                </header>
                <nav>
                    <button class="h-[60px] bg-transparent b-0  p-0 cursor-pointer text-inherit"
                        onclick="location.href = '/';">
                        <span>
                            <i class="uil uil-estate"></i>
                            <span>Home</span>
                        </span>
                    </button>
                    <button class="h-[60px] bg-transparent b-0  p-0 cursor-pointer text-inherit"
                        onclick="onClkSearchBtn()">
                        <span>
                            <i class="uil uil-search"></i>
                            <span>Search</span>
                        </span>
                    </button>

                    <button class="h-[60px] bg-transparent b-0 p-0 cursor-pointer text-inherit"
                        onclick="onClkToggleCreatePost()">
                        <span>
                            <i class="uil uil-plus-circle"> </i>
                            <span>Create</span>
                        </span>

                    </button>
                    <div ModalContainer>

                        <div ModalBackground
                            class="fixed top-0 left-0 h-full w-full grid place-items-center opacity-0 invisible bg-black bg-opacity-5 transition-all scale-100"
                            onclick="onClkToggleCreatePost()"></div>

                        <div ModalContent
                            class="h-[400px] bg-white absolute hidden Modal-ScaleOut-Center rounded-2xl shadow-2xl min-h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
                            <form action="{{ route('post.store') }}" class="h-[100%]" method="post"
                                enctype="multipart/form-data">
                                @csrf
                                <div ModalHeader
                                    class="flex justify-between items-center text-lg h-12 px-4 font-semibold border-b border-[#DBDBDB]">
                                    <span onclick="onClkToggleCreatePost()">
                                        <i
                                            class="fa-solid fa-xmark transition-all hover:text-black hover:scale-110"></i>
                                    </span>

                                    <span class="text-[#121316]">Create New Post</span>

                                    <input type="submit"
                                        class="text-blue-600 text-sm transition-all hover:scale-110 hover:text-blue-400"
                                        value="Post">
                                </div>

                                <div ModalBody class="h-[calc(100%_-_48px)] flex ">



                                    <div class="flex flex-col items-center justify-center p-4">

                                        <svg aria-label="Icon to represent media such as images or videos"
                                            class="_ab6-" color="#262626" fill="#262626" height="77" role="img"
                                            viewBox="0 0 97.6 77.3" width="96">
                                            <path
                                                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                                                fill="currentColor"></path>
                                            <path
                                                d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                                                fill="currentColor"></path>
                                            <path
                                                d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                                                fill="currentColor"></path>
                                        </svg>

                                        <label for="image"></label>

                                        <div class="custom-file">
                                            <input type="file"
                                                class="custom-file-input @error('video') is-invalid @enderror"
                                                name="image" id="image">
                                            <label class="custom-file-label"
                                                for="video">{{ old('image') ?? 'Select File...' }}</label>

                                            @error('video')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
                                        </div>
                                    </div>


                                    <div class="border-l border-[#DBDBDB] p-4">
                                        <div class="flex gap-2 items-center">
                                            <img class="rounded-full h-[30px] w-[30px]"
                                                src="{{ asset(Auth::user()->profile->getProfileImage()) }}">
                                            <span class="text-xs font-semibold">{{ Auth::user()->username }}</span>
                                        </div>

                                        <div class="mt-4">
                                            <textarea
                                                class="caption w-full h-[120px] border-0 p-2 focus:outline-none !shadow-sm focus:!border-0 bg-[#e7e7e7] rounded-md resize-none"
                                                name="caption" placeholder="Write a caption.."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <button class="h-[60px] bg-transparent b-0  p-0 cursor-pointer text-inherit"
                        onclick="location.href = '/profile/{{ Auth::user()->username }}';">
                        <span>
                            <img class="rounded-full object-cover"
                                src="{{ asset(Auth::user()->profile->getProfileImage()) }}" />
                            <span>Profile</span>
                        </span>
                    </button>
                    <button class="relative h-[60px] bg-transparent b-0 p-0 mt-auto cursor-pointer text-inherit"
                        onclick="onClkMoreActionBtn()">

                        <div id=""
                            class="modal-shadow bg-gray-50 absolute bottom-16 right-[16px] md:right-[10px] rounded-md Modal-Slide-Down hidden">
                            <ul>
                                <li class="px-10 py-2 border-b bg-[#fbfbfb] transition-all hover:shadow rounded-b-lg">
                                    <a href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();"
                                        class="flex items-center justify-between text-[13px] font-light hover:font-semibold transition-all rounded-b-lg text-gray-900 no-underline">
                                        <p class="whitespace-nowrap">Logout</p>
                                    </a>
                                </li>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                    style="display: none;">
                                    @csrf
                                </form>
                            </ul>
                        </div>
                        <span>
                            <i class="uil uil-signout"> </i>
                            <a href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();"
                                class="flex items-center justify-between font-light hover:font-semibold transition-all rounded-b-lg text-gray-900 no-underline">
                                <p class="whitespace-nowrap">Logout</p>
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                style="display: none;">
                                @csrf
                            </form>
                        </span>

                    </button>
                </nav>
            </div>

            <div
                class="searchbar hide-searchBar fixed rounded-r-2xl h-full transition-all border-r bg-white translate-x-[4.5rem] z-10">

                <div class="py-7 space-y-7 px-3">
                    <span class="text-xl px-3  font-semibold block">Search</span>

                    <input class="input" placeholder="search" name="q" type="search">

                </div>

                <div class="box">

                </div>
            </div>

        </div>

        <div class="relative z-0">
            @yield('content')
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $(document).ready(function() {
            var noBio = "No bio available";
            $('.input').on('keyup', function() {
                let token = $('meta[name="csrf-token"]').attr('content');
                var value = $(this).val();
                $.ajax({
                    type: 'post',
                    url: '/search',
                    dataType: 'json',
                    data: {
                        _token: token,
                        q: value
                    },
                    success: function(data) {
                        if (data.length > 0) {
                            $('.box').html('');
                            $.each(data, function(key, value) {
                                $('.box').append(
                                    '<a href="/profile/' + value.username +
                                    '" class="list">' +
                                    '<div class="imgBx">' +
                                    '<img src="' + value.image_path +
                                    '" alt="" class="user_profile_img">' +
                                    '</div>' +
                                    '<div class="content">' +
                                    '<h2 class="rank"><small>#</small>' + (key +
                                        1) +
                                    '</h2>' +
                                    '<h3>' + value.name + '</h3>' +
                                    '<p>' + (value.profile.bio ? value.profile.bio :
                                        noBio) + '</p>' +
                                    '</div>' +
                                    '</a>'
                                );

                            });

                        } else {
                            $('.box').html('<p class="text-center">No result found</p>');
                        }
                    },
                    error: function(data) {
                        console.log("error: ", data);
                    }
                });
            })
        })
    </script>
    @yield('exscript')

</body>

</html>
