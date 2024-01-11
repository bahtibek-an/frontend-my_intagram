@extends('navbar')
@section('title')
    New Profile Picture
@endsection

@section('content')
    <section class="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form enctype="multipart/form-data" novalidate="" action="{{route('new_profile_picture.store')}}" method="POST" class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
            @csrf
            <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div class="space-y-2 col-span-full lg:col-span-1">
                    <p class="font-medium">New profile picture</p>
                    <p class="text-xs">This will be your new profile picture and it will be visible to everyone.</p>
                </div>
                <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                    <div class="col-span-full">

                        <label for="picture" class="px-4 py-2 flex flex-row w-fit gap-2 border rounded-md border-gray-900 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>

                            Picture</label>

                        <div class="flex items-center space-x-2">
                            @error('picture')
                            <p class="mt-1  form-input block mb-1 text-xs uppercase  border border-red-500 p-2 font-bold text-red-500">{{$message}}</p>
                            @enderror
                            <input type="file" name="picture" id="picture" accept="image/*" class="hidden">




                        </div>
                    </div>
                    <div class="col-span-full">
                        <button type="submit"
                                class="font-bold items-center gap-2 rounded border-2 border-[#0077b5] bg-[#0077b5] px-5 py-3  text-white transition-colors hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75"

                                target="_blank"
                                rel="noreferrer"
                        >
                            Update profile picture

                        </button>
                    </div>

                </div>
            </fieldset>
        </form>
        @if(session('message'))
            {{session('message')}}
        @endif
    </section>
@endsection
