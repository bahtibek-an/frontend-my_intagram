@extends('layouts.app')

@section('titulo')
    Register
@endsection

@section('contenido')
    <div class="md:flex md:justify-center md:gap-8 md:items-center ">

        <div class="md:w-4/12 bg-white p-6 rounded-lg shadow-xl">
            <form action="{{route('register')}}" method="POST">
                @csrf
                <div class="mb-5">
                    <label for="name" class="mb-2 block uppercase text-gray-500 font-bold">
                        Name
                    </label>
    
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        class="border p-3 w-full rounded-lg @error('name') border-red-500                            
                        @enderror"
                        value="{{ old('name') }}"
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
                    <label for="password_confirmation" class="mb-2 block uppercase text-gray-500 font-bold">
                        Password Confirmation
                    </label>

                    <input 
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder="Password Confirmation"
                        class="border p-3 w-full rounded-lg"
                    />
                </div>

                <input type="submit" value="register" class="bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg">
            </form>
        </div>
    </div>
@endsection