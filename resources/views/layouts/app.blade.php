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
    <link rel="icon" href="{{ asset('images/favicon.png') }}" type="image/x-icon"/>

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap">

    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
        }

        #app {
            display: block;
            height: 100vh;
        }

        .navbar-buttons {
            display: flex;
            gap: 10px;
            margin-right: 20px;
        }

        .navbar-button {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 10px;
            cursor: pointer;
            color: #333;
            text-decoration: none;
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .navbar-button:hover {
            background-color: #e0e0e0;
        }

        .navbar-button img {
            border-radius: 50%;
            height: 30px;
            width: 30px;
            object-fit: cover;
        }

        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            /* Set a high z-index to keep it above other elements */
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
        }

        .navbar-logo img {
            height: 30px;
        }

        
        .search-container {
          display: flex;
        }
        


        .list1 {
            display: flex;
            padding: 10px;
            text-decoration: none;
            color: #333;
            transition: background-color 0.3s ease;
        }

        .imgBx1 {
            overflow: hidden;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            object-fit: cover;
        }

        .user_profile_img1 {
            border-radius: 50%;
            height: 100%;
            width: 100%;
        }

        .content1 {
            margin-left: 10px;
        }

        .username {
            padding: 5px;
        }

        .rank1 {
            font-size: 16px;
            color: #333;
            margin-left: 20px;
            padding-bottom: 5px;
        }

        .input {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 350px;
        }

        .box {
            position: absolute;
            top: 60px;
            z-index: 10;
            width: 350px;
            height: 300px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: none;
        }

        .content {
            z-index: 5;
        }
        
        .search-icon {
            width: 30px;
            height: 30px;
            /* margin-top: 5px; */
            margin: 4px;
        }
    </style>
    
</head>

<body>
    <div id="app" class="container">
        <!-- Navbar -->
        <div class="navbar">
            <!-- Search Bar -->
            <div class="search-container">
              <img class="search-icon" src="{{ asset('images/search-icon.png') }}" />
              <input class="input" placeholder="Search" name="q" type="search">
            </div>

            <div class="box">

            </div>
            <!-- Logo -->
            <div class="navbar-logo">
                <a href="/"><span style="font-size: 37px; font-family: 'Pacifico', cursive; text-decoration: none;">Instagram</span></a>
            </div>

            
            

            <!-- Buttons (Home, Create, Profile, Logout) -->
            <div class="navbar-buttons">
                <a href="/" class="navbar-button">
                    <i class="uil uil-estate"></i> Home
                </a>
                <a href="{{ url('p/create')}}" class="navbar-button">
                    <i class="uil uil-plus-circle"></i> Create
                </a>
                <a href="/profile/{{ Auth::user()->username }}" class="navbar-button">
                    <img src="{{ asset(Auth::user()->profile->getProfileImage()) }}" alt="Profile Image">
                    Profile
                </a>
                <div class="navbar-button" onclick="onClkMoreActionBtn()">
                    <i class="uil uil-signout"></i>
                    <a href="{{ route('logout') }}"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                        class="logout-link">Logout</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
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
            var box = $('.box');

            $('.input').on('input', function() {
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
                            box.html('');
                            $.each(data, function(key, value) {
                                box.append(
                                    '<a href="/profile/' + value.username +
                                    '" class="list1">' +
                                    '<div class="imgBx1">' +
                                    '<img src="' + value.image_path +
                                    '" alt="" class="user_profile_img1">' +
                                    '</div>' + '<h3 class="username">' + value.name + '</h3>' +
                                    '</a>'
                                );
                            });

                            box.show(); // Display the search results box
                        } else {
                            box.html('');
                            box.hide(); // Hide the search results box if no results
                        }
                    },
                    error: function(data) {
                        console.log("error: ", data);
                    }
                });
            });

            // Hide search results when clicking outside the search input and results
            $(document).on('click', function(event) {
                if (!$(event.target).closest('.navbar-search').length && !$(event.target).closest('.box')
                    .length) {
                    box.hide();
                }
            });
        });
    </script>

    @yield('exscript')

</body>

</html>
