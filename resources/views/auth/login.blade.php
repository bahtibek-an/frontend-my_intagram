@extends('layouts.app')

@section('titulo')
    Login
@endsection

@section('contenido')
    <div class="md:flex md:justify-center md:gap-10 md:items-center ">
        

        <div class="md:w-4/12 bg-white p-6 rounded-lg shadow-xl">
            <form action="{{route('login')}}" method="POST">
                @csrf


                <div class="mb-5">
                    <label for="email" class="mb-2 block uppercase text-gray-500 font-bold">
                        Email
                    </label>

                    <input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        class="border p-3 w-full rounded-lg @error('email') border-red-500                            
                        @enderror"
                        value="{{ old('email') }}"
                    />
                   
                </div>

                <div class="mb-5">
                    <label for="username" class="mb-2 block uppercase text-gray-500 font-bold">
                        Username
                    </label>

                    <input 
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        class="border p-3 w-full rounded-lg @error('username') border-red-500                            
                        @enderror"
                        value="{{ old('username') }}"
                    />
                    
                </div>

                <div class="mb-5">
                    <label for="password" class="mb-2 block uppercase text-gray-500 font-bold">
                        Password
                    </label>

                    <input 
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="border p-3 w-full rounded-lg @error('password') border-red-500                            
                        @enderror"
                    />
                    
                </div>

                <div class="mb-5">
                    <input type="checkbox" name="remember"> 
                    <label class="text-gray-500 font-bold text-sm" for="remember">Remember me</label> 
                </div>

                <input type="submit" value="Login" class="bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg">
            </form>
        </div>
    </div>
@endsection