<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @stack('styles')
    <title>Instagram - @yield('titulo')</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')

    @livewireStyles()
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #fafafa;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #fff;
            border-bottom: 1px solid #dbdbdb;
            padding: 1rem 0;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 935px;
            margin: 0 auto;
        }

        .logo {
            font-size: 2rem;
            font-weight: bold;
            color: #262626;
            text-decoration: none;
        }

        .search-form {
            display: flex;
            align-items: center;
            /* Align search input and button vertically */
        }

        .search-input {
            padding: 0.5rem;
            border: 1px solid #dbdbdb;
            border-radius: 3px;
            margin-right: 0.5rem;
            width: 350px;
        }

        .search-button {
            background-color: #0095f6;
            color: #fff;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 3px;
            cursor: pointer;
        }

        nav {
            display: flex;
            gap: 1rem;
            align-items: center;
            /* Align items vertically */
        }

        nav a {
            text-decoration: none;
            color: #262626;
            font-weight: bold;
            font-size: 0.875rem;
        }

        .profile-icon {
            position: relative;
            display: flex;
            align-items: center;
            /* Align icon and dropdown vertically */
        }

        .profile-icon img {
            height: 30px;
            border-radius: 50%;
            margin-right: 0.5rem;
        }

        .profile-dropdown {
            position: absolute;
            width: 115px;
            top: 100%;
            right: 0;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: none;
            flex-direction: column;
            border-radius: 3px;
            z-index: 100;
        }

        .profile-dropdown a,
        .profile-dropdown button {
            padding: 10px;
            color: #2b55a7;
            text-decoration: none;
            font-weight: bold;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
        }
        .profile-dropdown button {
            padding: 10px;
            color: #df2121;
            text-decoration: none;
            font-weight: bold;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
        }

        .profile-dropdown a:hover,
        .profile-dropdown button:hover {
            background-color: #fafafa;
        }

        .profile-icon:hover .profile-dropdown {
            display: flex;
        }

        main {
            margin-top: 60px;
            padding: 2rem 1rem;
        }
    </style>
</head>

<body>
    <header>
        <div class="container">
            <a href="{{ route('home') }}" class="logo">Instagram</a>
            <form id="searchForm" class="search-form">
                <input type="text" id="searchUsername" name="username" class="search-input" placeholder="Search">
                <button class="search-button" type="submit">Search</button>
            </form>
            <nav>
                @auth
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28px" height="28px">
                            <path
                                d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" />
                        </svg>
                    </a>


                    <a href="{{ route('posts.create') }}">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px"
                            viewBox="0 0 48.000000 48.000000" preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" fill="#000000"
                                stroke="none">
                                <path d="M77 402 c-14 -16 -17 -41 -17 -164 0 -182 -1 -180 126 -176 115 4
                                112 21 -3 28 l-88 5 0 145 c0 142 0 144 23 150 30 7 29 24 -1 28 -13 2 -30 -5
                                -40 -16z" />
                                                            <path d="M190 405 c0 -11 20 -15 98 -17 l97 -3 0 -145 0 -145 -27 -3 c-38 -4
                                -37 -32 0 -32 55 0 62 21 62 182 0 182 3 178 -133 178 -79 0 -97 -3 -97 -15z" />
                                                            <path d="M226 324 c-3 -9 -6 -29 -6 -45 0 -27 -2 -29 -40 -29 -40 0 -53 -13
                                -24 -24 9 -3 27 -6 40 -6 19 0 24 -5 24 -27 0 -16 5 -35 10 -43 9 -13 11 -13
                                20 0 5 8 10 27 10 43 0 22 5 27 24 27 13 0 31 3 40 6 29 11 16 24 -24 24 -38
                                0 -40 2 -40 29 0 34 -9 61 -20 61 -4 0 -11 -7 -14 -16z" />
                            </g>
                        </svg>

                    </a>
                    <div class="profile-icon">
                        <img src="{{ auth()->user()->imagen ? asset('perfiles') . '/' . auth()->user()->imagen : asset('img/usuario.svg') }}"
                            alt="Profile Icon">
                        <div class="profile-dropdown">
                            <a href="{{ route('posts.index', auth()->user()->username) }}">
                                Profile
                            </a>
                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                @endauth
                @guest
                    <a href="{{ route('login') }}">Login</a>
                    <a href="{{ route('register') }}">Register</a>
                @endguest
            </nav>
        </div>
    </header>

    <main>
        @yield('contenido')
    </main>

    <div id="searchResults"></div>


    @livewireScripts()
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchForm = document.querySelector('#searchForm');
            const searchInput = document.querySelector('#searchUsername');
            const searchResults = document.querySelector('#searchResults');

            searchForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const searchTerm = searchInput.value;

                const profileRoute = "{{ route('posts.index', ':username') }}".replace(':username',
                    searchTerm);

                window.location.href = profileRoute;
            });
        });
    </script>

</body>

</html>
