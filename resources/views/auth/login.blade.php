<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    @stack('styles')
    <title>Instagram - @yield('titulo')</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>

<body>
    <div class="md:flex md:justify-center md:gap-10 md:items-center " style="margin-top: 80px;">


        <div class="md:w-4/12 bg-white p-6 rounded-lg shadow-xl">
            <h1 class="mb-2 block uppercase text-gray-500 font-bold" style="text-align: center; font-size: 27px;">Login
            </h1>
            <form action="{{ route('login') }}" method="POST">
                @csrf


                <div class="mb-5">
                    <label for="email" class="mb-2 block uppercase text-gray-500 font-bold">
                        Email
                    </label>

                    <input id="email" name="email" type="email" placeholder="Email"
                        class="border p-3 w-full rounded-lg @error('email') border-red-500                            
                        @enderror"
                        value="{{ old('email') }}" />

                </div>

                <div class="mb-5">
                    <label for="username" class="mb-2 block uppercase text-gray-500 font-bold">
                        Username
                    </label>

                    <input id="username" name="username" type="text" placeholder="Username"
                        class="border p-3 w-full rounded-lg @error('username') border-red-500                            
                        @enderror"
                        value="{{ old('username') }}" />

                </div>

                <div class="mb-5">
                    <label for="password" class="mb-2 block uppercase text-gray-500 font-bold">
                        Password
                    </label>

                    <input id="password" name="password" type="password" placeholder="Password"
                        class="border p-3 w-full rounded-lg @error('password') border-red-500                            
                        @enderror" />

                </div>

                <div class="mb-5">
                    <input type="checkbox" name="remember">
                    <label class="text-gray-500 font-bold text-sm" for="remember">Remember me</label>
                </div>

                <input type="submit" value="Login"
                    class="bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg">
            </form>
            <div style="margin: 10px;">
                Create Account <a class="text-blue-500 ml-3 text-sm" style="color: blue;"
                    href="{{ route('register') }}">Register</a>
            </div>
        </div>
    </div>
</body>

</html>
