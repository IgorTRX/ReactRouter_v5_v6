import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  NavLink,
  useParams,
} from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>App Layout</h1>
      <NavLink to="/users">Users List Page</NavLink>
      <hr />
      <Switch>
        <Route path="/users" component={UsersLayout} />
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

function MainPage() {
  return <h1>Main Page</h1>
}
function UsersLayout() {
  const { path } = useRouteMatch()
  return (
    <div>
      <h1>Users Layout</h1>
      <NavLink to="/">Home</NavLink>
      <hr />
      <Switch>
        <Route path={path + '/:userId/profile'} component={ProfileUserPage} />
        <Route path={path + '/:userId/edit'} component={EditUserPage} />
        <Route exact path={path} component={UsersListPage} />
        <Redirect from={path + '/:userId'} to={path + '/:userId/profile'} />
      </Switch>
    </div>
  )
}
function UsersListPage() {
  const { path } = useRouteMatch()
  return (
    <div>
      <h1>Users List Page</h1>
      <ul>
        {new Array(5).fill('').map((_, index) => (
          <li key={'user_list_components' + index}>
            <NavLink to={`${path}/${index}`}>User {index}</NavLink>
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
