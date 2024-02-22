@extends('layouts.authlayout')

@section('form')
{{-- <div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
        @if (Session::has('alert-' . $msg))
            <div class="alert alert-{{ $msg }} alert-dismissible fade show" role="alert">
                {{ Session::get('alert-' . $msg) }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        @endif
    @endforeach
</div> --}}

{{-- alert section --}}
@if (Session::has('success'))
        <div id="alert-3" class="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200 mx-3 mt-2" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                User registration successfully. <a href="https://www.gmail.com/"
                    class="font-semibold underline hover:text-green-800 dark:hover:text-green-900">Gmail</a>. Go to your mail and verify your email address
            </div>
            <button type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
                data-dismiss-target="#alert-3" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    @endif
    @if (Session::has('failed'))
    <div id="alert-2" class="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200 mx-3 mt-2" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
          Something went wrong <a href="/register" class="font-semibold underline hover:text-red-800 dark:hover:text-red-900">Register</a>. Try again later.
        </div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    @endif
{{-- alert section end  --}}
    <section class="bg-gray-50 min-h-screen flex items-center justify-center p-5">
        <!-- login container -->
        <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
            <!-- form -->
            <div class="md:w-1/2 px-8 md:px-16">
                <h2 class="font-bold text-2xl text-[#002D74]">Register</h2>
                <p class="text-xs mt-4 text-[#002D74]">Let's Go for a great journey with us</p>

                <form action="{{ route('register') }}" method="post" class="flex flex-col gap-4">
                    @csrf
                    <input class="p-2 mt-8 rounded-xl border @error('name') is-invalid @enderror" type="text"
                        name="name" placeholder="Name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                    @error('name')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <input class="p-2 relative rounded-xl border @error('email') is-invalid @enderror" type="email"
                        name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email"
                        autofocus>
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <input class="p-2 relative rounded-xl border @error('username') is-invalid @enderror" type="text"
                        name="username" placeholder="Username" value="{{ old('usename') }}" required autocomplete="username"
                        autofocus>
                    @error('username')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <div class="relative">
                        <input type="password" id="password" class="p-2 rounded-xl border w-full @error('password') is-invalid @enderror"
                            name="password" required autocomplete="current-password" placeholder="Password">
                        {{-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray"
                            class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" viewBox="0 0 16 16" onclick="showPassword()">
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg> --}}
                        <i class="fa-solid fa-eye eyeIcon1 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onclick="showPassword()"></i>

                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                    <div class="relative">
                        <input type="password" id="password-confirm" class="p-2 rounded-xl border w-full"
                            name="password_confirmation" required autocomplete="new-password" placeholder="Confirm Password">
                        {{-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray"
                            class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" viewBox="0 0 16 16" onclick="showPasswordConfirm()">
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg> --}}
                        <i class="fa-solid fa-eye eyeIcon2 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onclick="showPasswordConfirm()"></i>
                    </div>


                    <button type="submit"
                        class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                </form>

                <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
                    <hr class="border-gray-400">
                    <p class="text-center text-sm">OR</p>
                    <hr class="border-gray-400">
                </div>



                <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                    <p>I already have my account.</p>
                    <a href="{{route('login')}}" class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</a>
                </div>
            </div>

            <!-- image -->
            <div class="md:block hidden w-1/2">
                <img class="rounded-2xl"
                    src="https://images.pexels.com/photos/2694344/pexels-photo-2694344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            </div>
        </div>
    </section>
    <script>
        let eye1 = document.querySelector('.eyeIcon1');
        let eye2 = document.querySelector('.eyeIcon2');

        function showPassword() {
            var x = document.getElementById("password");
            if (x.type === "password") {
                x.type = "text";
                eye1.classList.remove('fa-eye');
                eye1.classList.add('fa-eye-slash');
            } else {
                x.type = "password";
                eye1.classList.remove('fa-eye-slash');
                eye1.classList.add('fa-eye');
            }
        }
        function showPasswordConfirm() {
            var x = document.getElementById("password-confirm");
            if (x.type === "password") {
                x.type = "text";
                eye2.classList.remove('fa-eye');
                eye2.classList.add('fa-eye-slash');
            } else {
                x.type = "password";
                eye2.classList.remove('fa-eye-slash');
                eye2.classList.add('fa-eye');
            }
        }

        // Dismiss alert
        const alert3 = document.getElementById('alert-3');

        // options object
        const options = {
            triggerEl: document.getElementById('triggerElement'),
            transition: 'transition-opacity',
            duration: 1000,
            timing: 'ease-out',

            // callback functions
            onHide: (context, targetEl) => {
                console.log('element has been dismissed')
                console.log(targetEl)
            }
        };

        const dismiss = new Dismiss(alert3, options);
        // dismiss in 2s
        setTimeout(() => {
            dismiss.hide();
        }, 2000);


        const alert2 = document.getElementById('alert-2');

        // options object
        const options2 = {
            triggerEl: document.getElementById('triggerElement'),
            transition: 'transition-opacity',
            duration: 1000,
            timing: 'ease-out',

            // callback functions
            onHide: (context, targetEl) => {
                console.log('element has been dismissed')
                console.log(targetEl)
            }
        };

        const dismiss2 = new Dismiss(alert2, options2);
        // dismiss in 2s
        setTimeout(() => {
            dismiss2.hide();
        }, 2000);

    </script>

@endsection
