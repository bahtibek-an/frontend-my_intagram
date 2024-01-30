import Home from './Home'
import Notifications from './Notifications'
import ProfileLink from './ProfileLink'
import Search from './Search'
import CreatePost from './CreatePost'

const SidebarItems = () => {
  return (
    <>
        <Home />
        <Search />
        <Notifications />
        <CreatePost />
        <ProfileLink />
    </>
  )
}

export default SidebarItems;