@extends('layouts.app')

@section('contenido')
    <div class="flex">
        <div class="sidebar" style="margin-right: 120px;">
            <div class="p-4">
                <h3 class="text-xl font-bold mb-4" >Suggestion Users</h3>
                <ul>
                    @foreach ($users as $user)
                        @if (auth()->user() && $user->id !== auth()->user()->id)
                            <li><a href="{{ route('posts.index', $user->username) }}"
                                    class="text-blue-500 hover:underline">{{ $user->username }}</a></li>
                        @endif
                    @endforeach
                </ul>
            </div>
        </div>
        <div class="home flex">
            @if ($posts->count())
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    @foreach ($posts as $post)
                        <div class="p-4">
                            <a href="{{ route('posts.show', ['user' => $post->user, 'post' => $post]) }}">
                                <img src="{{ asset('storage/uploads/' . $post->imagen) }}" alt="Imagen del post {{ $post->titulo }}"
                                    class="w-full h-auto">
                            </a>
                        </div>
                    @endforeach
                </div>

                <div class="my-10">
                    {{ $posts->links() }}
                </div>
            @else
                <p class="text-gray-600 text-lg text-center font-bold" style="font-size: 20px; margin-left: 20%">There are no
                    posts. Follow someone to see their posts.</p>
            @endif
        </div>
        
    </div>
@endsection
