@extends('navbar')
@section('title')
    Feed
@endsection

@section('content')
<div class="flex items-center flex-col gap-8 justify-center mt-5 select-none">
    @foreach($posts as $post)
    <a href="{{route('feed.show',[$post->user, $post])}}" class="flex w-10/12 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="{{asset('storage/posts').'/'. $post->cover}}" alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{$post->title}}</h5>
            <p class="flex items-center gap-1 underline mb-3 font-normal text-gray-700 dark:text-gray-400">
                <img class="w-8 h-8 rounded-full border border-gray-100 shadow-sm"
                     src="{{asset('storage/pictures/').'/'.  $post->user->profile_picture}}" alt="user image"/>

                {{$post->user->username}}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> {{ Str::limit($post->description, 25) }}</p>
        </div>
    </a>
    @endforeach
    <div class="mb-10">
        {{$posts->links('pagination::test')}}
    </div>
</div>
@endsection
