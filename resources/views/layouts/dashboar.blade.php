@extends('layouts.app')

@section('titulo')
    {{$user->username}}
@endsection

@section('contenido')
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #fafafa;
            margin: 0;
            padding: 0;
        }

        .profile-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 42vh;
            background-color: #fafafa;
        }

        .profile-wrapper {
            display: flex;
            max-width: 800px;
            width: 100%;
        }

        .profile-image {
            flex: 0 0 150px;
            margin-right: 20px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .profile-image img {
            width: 100%;
            height: auto;
        }

        .profile-details {
            flex: 1;
        }

        .profile-username {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .edit-profile-link {
            color: #0095f6;
            font-weight: bold;
            text-decoration: none;
            margin-bottom: 10px;
            display: block;
        }

        .profile-stats {
            display: flex;
            margin-bottom: 20px;
        }

        .profile-stats div {
            margin-right: 20px;
        }

        .profile-stats span {
            font-weight: bold;
            margin-left: 5px;
        }

        .follow-button {
            background-color: #0095f6;
            color: #fff;
            border: none;
            padding: 8px 16px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
        }

        .posts-section {
            max-width: 800px;
            margin: 20px auto;
        }

        .posts-section h2 {
            font-size: 28px;
            margin-bottom: 20px;
        }

        .posts-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .post-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .post-item img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    </style>

    <div class="profile-container">
        <div class="profile-wrapper">
            <div class="profile-image">
                <img src="{{ $user->imagen ? asset('perfiles') . '/' . $user->imagen : asset('img/usuario.svg')}}" alt="Imagen {{$user->username}}">
            </div>
            <div class="profile-details">
                <div class="profile-username">
                    {{$user->username}}
                </div>
                @auth
                    @if ($user->id === auth()->user()->id)
                        <a href="{{route('perfil.index')}}" class="edit-profile-link">Edit Profile</a>
                    @endif
                @endauth
                <div class="profile-stats">
                    <div>{{$user->followers->count()}} <span>Followers</span></div>
                    <div>{{$user->followins->count()}} <span>Following</span></div>
                    <div>{{$user->posts->count()}} <span>Posts</span></div>
                </div>
                @auth
                    @if($user->id !== auth()->user()->id)
                        @if (!$user->siguiendo(auth()->user()))
                            <form action="{{route('users.follow', $user)}}" method="POST">
                                @csrf
                                <input type="submit" class="follow-button" value="Follow">
                            </form>
                        @else
                            <form action="{{route('users.unfollow', $user)}}" method="POST">
                                @method('DELETE')
                                @csrf
                                <input type="submit" class="follow-button" value="Unfollow">
                            </form>
                        @endif
                    @endif
                @endauth
            </div>
        </div>
    </div>

    <section class="posts-section">
        <h2>Posts</h2>
        @if ($posts->count())
            <div class="posts-grid">
                @foreach ($posts as $post)
                    <div class="post-item">
                            <img src="{{asset('storage/uploads'). '/' . $post->imagen}}" alt="Post image {{$post->titulo}}">
                    </div>
                @endforeach
            </div>
            <div class="my-10">
                {{$posts->links()}}
            </div>
        @else 
            <p>No posts available.</p>
        @endif
    </section>
@endsection
