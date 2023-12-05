@extends('layouts.app')

@section('titulo')
    Edit Profile
@endsection

@section('contenido')
    <div class="md:flex md:justify-center">
        <div class="md:w-1/2 bg-white shadow p-6">
            <form action="{{route('perfil.store')}}" method="POST" enctype="multipart/form-data" class="mt-10 md:mt-0">
                @csrf
                <div class="mb-5">
                    <label for="Username" class="mb-2 block uppercase text-gray-500 font-bold">
                        Username
                    </label>
    
                    <input 
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        class="border p-3 w-full rounded-lg @error('username') border-red-500                            
                        @enderror"
                        value="{{ auth()->user()->username }}"
                    />
                    @error('username')
                        <p class="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">{{$message}}</p>
                    @enderror
                </div>

                <div class="mb-5">
                    <label for="imagen" class="mb-2 block uppercase text-gray-500 font-bold">
                        Image User
                    </label>
    
                    <input 
                        id="imagen"
                        name="imagen"
                        type="file"
                        class="border p-3 w-full rounded-lg"
                        accept=".jpg, .jpeg .png"
                    />
                </div>

                <input type="submit" value="Update" class="bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg">
            </form>
        </div>
    </div>
@endsection