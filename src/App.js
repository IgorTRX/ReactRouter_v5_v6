import {
  NavLink,
  useParams,
  Outlet,
  Navigate,
  useRoutes,
} from 'react-router-dom'

const routes = [
  { path: '/', element: <MainPage /> },
  {
    path: 'users',
    element: <UsersLayout />,
    children: [
      { index: true, element: <UsersListPage /> },
      {
        path: ':userId',
        element: <Outlet />,
        children: [
          { path: 'profile', element: <ProfileUserPage /> },
          { path: 'edit', element: <EditUserPage /> },
          { index: true, element: <Navigate to="profile" /> },
          { path: '*', element: <Navigate to="profile" /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
]

function App() {
  const elements = useRoutes(routes)
  return (
    <div>
      <h1>App Layout</h1>
      <NavLink to="/users">Users List Page</NavLink>
      <hr />
      {elements}
    </div>
  )
}

function MainPage() {
  return <h1>Main Page</h1>
}
function UsersLayout() {
  return (
    <div>
      <h1>Users Layout</h1>
      <NavLink to="/">Home</NavLink>
      <hr />
      <Outlet />
    </div>
  )
}
function UsersListPage() {
  return (
    <div>
      <h1>Users List Page</h1>
      <ul>
        {new Array(5).fill('').map((_, index) => (
          <li key={index}>
            <NavLink to={index + '/profile'}>User {index}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
function ProfileUserPage() {
  const { userId } = useParams()
  return (
    <div>
      <h1>Profile User Page</h1>
      <NavLink to="/users">Users List Page</NavLink>
      <br />
      <NavLink to={`/users/${userId}/edit`}>Edit User Page</NavLink>
      <p>User ID: {userId}</p>
    </div>
  )
}
function EditUserPage() {
  const { userId } = useParams()
  return (
    <div>
      <h1>Edit User Page</h1>
      <NavLink to={'/users/' + userId}>Profile User Page</NavLink>
      <br />
      <NavLink to={'/users/' + (+userId + 1)}>Another User Page</NavLink>
      <br />
      <NavLink to="/users">Users List Page</NavLink>
    </div>
  )
}
export default App
