@extends('layouts.authlayout')

@section('form')

    <!-- login container -->
    <section class="bg-gray-50 min-h-screen flex items-center justify-center p-5">

        <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
            <!-- form -->
            <div class="md:w-2/2 px-8 md:px-7">
                <h2 class="font-bold text-2xl text-[#002D74]" style="text-align: center">Login</h2>

                <form action="{{ route('login') }}" method="post" class="flex flex-col gap-4">
                    @csrf
                    <input class="p-2 mt-8 rounded-xl border @error('email') is-invalid @enderror" type="email"
                        name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email"
                        autofocus>
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <div class="relative">
                        <input type="password" id="password"
                            class="p-2 rounded-xl border w-full @error('password') is-invalid @enderror" name="password"
                            required autocomplete="current-password" placeholder="Password">
                    </div>
                    <div class="relative">
                        <label class="inline-flex items-center">
                            <input type="checkbox"
                                class="rounded border-gray-300 text-purple-600 focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200/50 cursor-pointer"
                                {{ old('remember') ? 'checked' : '' }} name="remember" id="remember" />
                            <span class="ml-3">Remember Me</span>
                        </label>
                    </div>
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <button type="submit"
                        class="bg-[#002D74] rounded-xl text-white py-2 duration-300">Login</button>
                </form>


                <div class="mt-3 text-md flex justify-between items-center">
                    <p>Don't have an account?</p>
                    <a href="{{ route('register') }}"
                        class="py-2 px-5  rounded-xl duration-300">Register</a>
                </div>
            </div>


        </div>
    </section>
    
    <script>
        let eye = document.querySelector('.eyeIcon');

        function showPassword() {
            var x = document.getElementById("password");
            if (x.type === "password") {
                x.type = "text";
                eye.classList.remove('fa-eye');
                eye.classList.add('fa-eye-slash');
            } else {
                x.type = "password";
                eye.classList.remove('fa-eye-slash');
                eye.classList.add('fa-eye');
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
