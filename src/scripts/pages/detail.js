import config from '../globals/config';
import UrlParser from '../routes/urlParser';
import FoodData from '../../FOODDATA.json';
import { createDetailedFoodArticle, createDetailedRestaurantArticle } from '../utils/createTemplate';
import initiator from '../utils/init';

const Detail = {
  async render() {
    return (
      `
        <div id="container"></div>
        <div id="fav-container" class="fav-container"></div>
      `
    );
  },

  async afterRender() {
    const url = UrlParser.ActiveUrlWithoutCombiner();
    const container = document.getElementById('container');

    if (this._isRestaurant(url.type)) {
      return this._createDetailedRestaurant(url.id, container);
    }
    const data = FoodData.foods.filter((food) => food.idMeal === url.id)[0];
    return this._createDetailedFood(data, container);
  },

  async _createDetailedRestaurant(id, container) {
    const data = await (await fetch(`${config.base_url}/detail/${id}`)).json();
    container.appendChild(createDetailedRestaurantArticle(data.restaurant));
    const rehydrate = () => {
      initiator.Form(id);
      const favData = {
        pictureId: data.restaurant.pictureId,
        name: data.restaurant.name,
        id: data.restaurant.id,
        rating: data.restaurant.rating,
        description: data.restaurant.description,
        city: data.restaurant.city,
      };
      initiator.FavButton(favData);
    };
    return rehydrate();
  },

  async _createDetailedFood(foodData, container) {
    container.appendChild(createDetailedFoodArticle(foodData));
    const favData = { ...foodData, id: foodData.idMeal };
    initiator.FavButton(favData);
  },

  _isRestaurant(type) {
    return (type === 'restaurant');
  },
};

export default Detail;
