@extends('layouts.authlayout')

@section('form')
    <section class="bg-gray-50 min-h-screen flex items-center justify-center p-5">
        <!-- login container -->
        <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
            <!-- form -->
            <div class="md:w-2/2 px-8 md:px-7">
                <h2 class="font-bold text-2xl text-[#002D74]" style="text-align: center">Register</h2>

                <form action="{{ route('register') }}" method="post" class="flex flex-col gap-4">
                    @csrf
                    <input class="p-2 mt-8 rounded-xl border @error('name') is-invalid @enderror" type="text"
                        name="name" placeholder="Name" value="{{ old('name') }}" required autocomplete="name"
                        autofocus>
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
                        <input type="password" id="password"
                            class="p-2 rounded-xl border w-full @error('password') is-invalid @enderror" name="password"
                            required autocomplete="current-password" placeholder="Password">

                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <button type="submit"
                        class="bg-[#002D74] rounded-xl text-white py-2 duration-300">Register</button>
                </form>



                <div class="mt-3 text-md flex justify-between items-center text-[#002D74]">
                    <p>I already have my account.</p>
                    <a href="{{ route('login') }}"
                        class="py-2 px-5 duration-300">Login</a>
                </div>
            </div>

            <!-- image -->
            
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
