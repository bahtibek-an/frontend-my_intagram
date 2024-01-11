@extends('navbar')
@section('title')
    Profile: {{ $user->username }}
@endsection


@section('other_scripts')
    <script>
        function openModal() {
            const modal = document.getElementById('defaultModal')
            modal.showModal();
        }


        function closeModal() {
            const modal = document.getElementById('defaultModal')
            modal.close();
        }
    </script>
@endsection

@section('content')
    <div class="p-12">
        <div class="p-8 bg-white shadow mt-24">
            <div class="grid grid-cols-1 md:grid-cols-3" style="margin-bottom: 25px;">
                <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                    <div>
                        <p class="font-bold text-gray-700 text-xl">
                            {{ Str::limit($user->friend_two->count() + $user->friends->count(), 3, '+') }}</p>
                        <p class="text-gray-400">Followers</p>
                    </div>
                    <div>
                        <p class="font-bold text-gray-700 text-xl">{{ Str::limit($post_total_count, 3, '+') }}</p>
                        <p class="text-gray-400">Posts</p>
                    </div>
                </div>
                <div class="relative">
                    <div
                        class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">

                        <img class="h-48 rounded-full w-48" src="{{ asset('storage/pictures/' . $user->profile_picture) }}">

                    </div>
                </div>
                <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">


                    @if (auth()->check() && auth()->user()->id == $user->id)
                        {{-- User is the logged user --}}
                        <div class="flex flex-col md:flex-row text-center mx-auto gap-2">
                            <a href="{{ route('feed.create') }}"
                                class="mx-auto inline-flex items-center gap-2 rounded border-2 border-[#0077b5] bg-[#0077b5]

                                 text-white py-2 px-4 uppercase font-medium

                                  transition-colors hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                New post

                            </a>
                            <a href="{{ route('new_profile_picture.create') }}"
                                class="mx-auto inline-flex items-center gap-2 rounded border-2 border-[#0077b5] bg-[#0077b5]

                                 text-white py-2 px-4 uppercase font-medium

                                  transition-colors hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                                Update profile

                            </a>
                        </div>
                    @else
                        {{-- User is not the one logged in --}}
                        @auth

                            @if (session('success') || $is_request_sent == 1)
                                <button type="submit"
                                    class="mx-auto inline-flex items-center gap-2 rounded border-2 border-[#0077b5] bg-[#0077b5]

                                 text-white py-2 px-4 uppercase font-medium

                                  transition-colors hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75">

                                    Following Request sended
                                </button>
                            @else
                                @if (!$they_are_friends)
                                    <form method="post" class="mx-auto" action="">
                                        @csrf

                                        <input type="hidden" name="friend_id" value="{{ $user->id }}">
                                        <button type="submit"
                                            class="mx-auto inline-flex items-center gap-2 rounded border-2 border-[#0077b5] bg-[#0077b5]

                                 text-white py-2 px-4 uppercase font-medium

                                  transition-colors hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75">

                                            Following Request
                                        </button>

                                    </form>
                                @else
                                    <button onclick="openModal()"
                                        class="mx-auto inline-flex items-center gap-2 rounded border-2

                                 text-white py-2 px-4 uppercase font-medium
 border-[#b50033] bg-[#b50033] transition-colors hover:bg-transparent hover:text-[#b50033] focus:outline-none focus:ring active:opacity-75
                               ">

                                        Unfollowing


                                    </button>
                    </div>
                    @endif
                    @endif

                @endauth
                @endif


            </div>
        </div>
        <div class="mt-20 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">{{ $user->username }}</h1>

            <div class="flex items-center flex-col gap-8 justify-center mt-5 select-none">
                @foreach ($posts as $post)
                    <a href="{{ route('feed.show', [$post->user, $post]) }}"
                        class="flex w-10/12 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img class="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                            src="{{ asset('storage/posts') . '/' . $post->cover }}" alt="">
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {{ $post->title }}</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ $post->user->username }}
                            </p>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {{ Str::limit($post->description, 25) }}
                            </p>


                        </div>
                    </a>
                @endforeach
                <div class="mb-10">
                    {{ $posts->links('pagination::test') }}
                </div>
            </div>



        </div>
    </div>





    <dialog id="defaultModal"
        class="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert">
        <div class="flex">
            <div
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Error icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">
                <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Unfollowing</span>
                <div class="mb-2 text-sm font-normal">Are you sure you want to UNFOLLOW
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <button onclick="closeModal()"
                            class="inline-flex justify-center w-full px-2 py-1.5 text-xs
                           font-medium text-center text-white border-2 border-[#0077b5] bg-[#0077b5]
rounded-lg
                        transition-colors hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75
                         ">Cancel</button>





                    </div>
                    <div>
                        <form action="{{ route('friends.delete') }}" method="POST">
                            @csrf
                            <input type="hidden" name="friend_id" value="{{ $user->id }}">
                            <button type="submit"
                                class="
                           inline-flex justify-center rounded-lg  w-full
                           px-2 py-1.5 text-xs font-medium text-center text-white
                 border-[#b50033] bg-[#b50033] transition-colors hover:bg-transparent border-2
                  hover:text-[#b50033] hover: border-[#b50033] focus:outline-none focus:ring active:opacity-75">Remove</button>
                        </form>

                    </div>
                </div>
            </div>
            <button onclick="closeModal()" type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-interactive" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </dialog>

@endsection
