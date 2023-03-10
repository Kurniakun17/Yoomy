import config from '../globals/config';
import UrlParser from '../routes/urlParser';
import FoodData from '../../FOODDATA.json';
import { createDetailedFoodArticle, createDetailedRestaurantArticle } from '../utils/createTemplate';
import initiator from '../utils/init';
import favDatas from '../data/favDatas';

const Detail = {
  async render() {
    return (
      `
      <div id="main-content" tabindex="0">
        <div id="container">
          <h2>Loading. . .</h2>
        </div>
        <div id="fav-container" class="fav-container"></div>
      </div>
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
    container.innerHTML = '';
    return this._createDetailedFood(data, container);
  },

  async _createDetailedRestaurant(id, container) {
    this._container = container;
    try {
      let data = await (await fetch(`${config.base_url}/detail/${id}`)).json();
      if (data.error) {
        this._container.innerHTML = `
        <h2>${data.message}</h2>
        `;
        return this._container;
      }

      this._container.innerHTML = '';
      data = { ...data.restaurant, customerReviews: data.restaurant.customerReviews.reverse() };
      this._container.appendChild(createDetailedRestaurantArticle(data));
      const rehydrate = () => {
        initiator.Form(id);
        const favData = {
          pictureId: data.pictureId,
          name: data.name,
          id: data.id,
          rating: data.rating,
          description: data.description,
          city: data.city,
          type: 'restaurants',
        };
        initiator.FavButton(favData, favDatas);
      };

      return rehydrate();
    } catch (err) {
      this._container.innerHTML = `<h2>${err.message}</h2>`;
      return this._container;
    }
  },

  async _createDetailedFood(foodData, container) {
    container.appendChild(createDetailedFoodArticle(foodData));
    const favData = { ...foodData, id: foodData.idMeal, type: 'foods' };
    initiator.FavButton(favData, favDatas);
  },

  _isRestaurant(type) {
    return (type === 'restaurant');
  },
};

export default Detail;
