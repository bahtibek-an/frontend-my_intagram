import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Authpage from './pages/Authpage/Authpage'
import PageLayout from './Layouts/PageLayout/PageLayout'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase'

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/auth" /> } />
        <Route path='/auth' element={!authUser ? <Authpage /> : <Navigate to="/" /> } />
        <Route path='/:username' element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  )
}

export default App
