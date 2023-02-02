import Detail from '../pages/detail';
import Favorite from '../pages/favorite';
import Home from '../pages/home';

const routes = {
  '/': Home,
  '/detailed/restaurant/:id': Detail,
  '/detailed/food/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
