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
</head>

<body class="bg-gray-100">
    <header class="p-5 border-b bg-white shadow">
        <div class="container mx-auto flex justify-between items-center">
            <a href="{{ route('home') }}" class="text-3xl font-black">
                Instagram
            </a>
            <form id="searchForm">
                <label for="username">Search by Username: </label>
                <input type="text" id="searchUsername" name="username" placeholder="Enter username">
                <button class="bg-blue-600 text-white uppercase rounded-lg px-3 py-1 text-sm font-bold cursor-pointer" type="submit">Search</button>
            </form>
            <nav class="flex gap-4 items-center">
                @auth
                    
                    <!-- End of Search form -->

                    <a class="flex items-center gap-2 bg-white border p-2 text-gray-600 rounded text-sm font-bold cursor-pointer"
                        href="{{ route('posts.create') }}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                        Create Post
                    </a>

                    <a class="font-bold text-gray-600 text-sm" href="{{ route('posts.index', auth()->user()->username) }}">Welcome
                        <span class="font-normal">{{ auth()->user()->username }}</span></a>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="font-bold uppercase text-gray-600 text-sm">Logout</button>
                    </form>
                @endauth
                @guest
                    <a class="font-bold uppercase text-gray-600 text-sm" href="{{ route('login') }}">Login</a>
                    <a class="font-bold uppercase text-gray-600 text-sm" href="{{ route('register') }}">Register</a>
                @endguest
            </nav>
        </div>
    </header>

    <main class="container m-2 mt-10 mx-auto">
        <h2 class="font-black text-center text-3xl mb-2">
            @yield('titulo')
        </h2>
        @yield('sidebar')
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
    
                const profileRoute = "{{ route('posts.index', ':username') }}".replace(':username', searchTerm);
    
                window.location.href = profileRoute;
            });
        });
    </script>
    
</body>

</html>
