import FoodDatas from '../../FOODDATA.json';
import config from '../globals/config';
import { createFoodArticle, createRestaurantArticle, createArticleSkeleton } from '../utils/createTemplate';

const Home = {
  async render() {
    return (
      `
      <div class="hero home">
        <div class="hero-content-container wrapper">
          <h1 class="hero-title">An Online Restaurant Guide That Helps You Find The Best Food and Place to Eat</h1>
          <Button class="cta" onclick="location.href='#main-content'">
            Let's Find Out
          </Button>
        </div>
      </div>
      <div id="main-content" tabindex="0">
        <section class="content wrapper">
          <div class="section-container-title">
            <h2 class="headline">Featured Restaurant</h2>
          </div>
          <div id="restaurant-list" class="list">
            ${createArticleSkeleton(8)}
          </div>
        </section>
        <section class="content wrapper">
          <div class="section-container-title">
            <h2 class="headline">Featured Food</h2>
          </div>
          <div id="food-list" class="list">
            ${createArticleSkeleton(4)}
          </div>
        </section>
      </div>
    `
    );
  },

  async afterRender() {
    const restaurantList = document.getElementById('restaurant-list');
    const foodList = document.getElementById('food-list');
    try {
      const RestaurantDatas = await (await fetch(`${config.base_url}/list`)).json();
      if (this.reqStatus(RestaurantDatas)) {
        document.body.innerHTML = `
          <div class="error-request">
            <h1>${RestaurantDatas.message}</h1>
          </div>
        `;
      }

      restaurantList.innerHTML = '';
      foodList.innerHTML = '';

      for (let i = 0; i < 8; i += 1) {
        restaurantList.appendChild(createRestaurantArticle(RestaurantDatas.restaurants[i]));
      }

      FoodDatas.foods.forEach((food, index) => {
        if (index < 4) {
          foodList.appendChild(createFoodArticle(food));
        }
      });
    } catch (err) {
      restaurantList.innerHTML = `<h2>${err.message}<h2>`;
    }
  },

  reqStatus(data) {
    return data.error;
  },
};

export default Home;
