import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="container gap-80">
        <div className="flex justify-center items-center w-50">
          <div className="flex flex-col justify-center w-70">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
