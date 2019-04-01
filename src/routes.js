import ViewHero from './pages/ViewHero'
import ListHeroes from './pages/ListHeroes'
import Home from './pages/Home'

export default [
  { name: 'home',     path: '/',         component: Home },
  { name: 'hero',     path: '/hero/:id', component: ViewHero },
  { name: 'heroList', path: '/heroes',   component: ListHeroes },
]