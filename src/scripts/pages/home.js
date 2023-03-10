import FoodDatas from '../../FOODDATA.json';
import config from '../globals/config';
import {
  // eslint-disable-next-line max-len
  createFoodArticle, createRestaurantArticle, createArticleSkeleton, createTestimonial, createTestimonialSkeleton,
} from '../utils/createTemplate';

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
        <section class="intro content wrapper">
          <div class="section-container-title">
            <h2 class="headline xl-headline">Our Catalogue Consist of</h2>
          <div class="intro list">
            <div class="intro-item">
              <div class="intro-heading">  
                <i class="first-icon icon fa-solid fa-utensils"></i>
                <h3>20</h3>
              </div>
              <p>Restaurants</p>
            </div>
            <div class="intro-item">
              <div class="intro-heading">  
                <i class="icon fa-solid fa-burger"></i>
                <h3>8</h3>
              </div>
              <p>Foods</p>
            </div>
            <div class="intro-item">
              <div class="intro-heading">  
                <i class="icon fa-solid fa-comment"></i>
                <h3>50+</h3>
              </div>
              <p>Reviews</p>
            </div>
          </div>
        </section>
        <section class="featured-content">
        <div class="rounded-corner"></div>
          <div class="featured main">
            <div class="wrapper">
              <div class="container-content">
                <div class="section-container-title">
                  <h2 class="headline xl-headline">Featured Restaurant</h2>
                </div>
                <div id="restaurant-list" class="list">
                  ${createArticleSkeleton(8)}
                </div>
                <div class="see-all-container">
                  <a href="#/catalogue">See All Restaurants</a>
                </div>
              </div>
              <div class="container-content">
                <div class="section-container-title">
                  <h2 class="headline xl-headline">Featured Food</h2>
                </div>
                <div id="food-list" class="list">
                  ${createArticleSkeleton(4)}
                </div>
                <div class="see-all-container">
                  <a href="#/catalogue">See All Foods</a>
                </div>
              </div>
            </div>
          </div>
          <div class="divider-container">
            <div class="rounded-corner-reverse"></div>
          </div>
        </section>
        <section class="testimonial container">
          <div class="wrapper">
            <h2 class="testi-headline headline xl-headline">Testimonials</h2>
            <div class="testi-item-container scrollable">
              ${createTestimonialSkeleton()}
            </div>
          </div>
        </section>
      </div>
    `
    );
  },

  async afterRender() {
    const restaurantList = document.getElementById('restaurant-list');
    const foodList = document.getElementById('food-list');
    const testiContainer = document.getElementsByClassName('testi-item-container')[0];
    try {
      const RestaurantDatas = await (await fetch(`${config.base_url}/list`)).json();
      if (this.reqStatus(RestaurantDatas)) {
        document.body.innerHTML = `
          <div class="error-request">
            <h1>${RestaurantDatas.message}</h1>
          </div>
        `;
      }

      RestaurantDatas.restaurants.sort((a, b) => b.rating - a.rating);

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

      this.testimonialInit({
        testiContainer,
        RestaurantDatas,
      });
    } catch (err) {
      restaurantList.innerHTML = `<h2>${err.message}<h2>`;
    }
  },

  async testimonialInit(data) {
    this._testiContainer = data.testiContainer;
    this._RestaurantDatas = data.RestaurantDatas;
    const testimonialArray = [];

    for (let i = 0; i < 4; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testimonialArray.push(await (await fetch(`${config.base_url}/detail/${this._RestaurantDatas.restaurants[i].id}`)).json());
    }

    this._testiContainer.innerHTML = '';

    for (let i = 0; i < 4; i += 1) {
      this._testiContainer.innerHTML += createTestimonial(testimonialArray[i].restaurant);
    }
  },

  reqStatus(data) {
    return data.error;
  },
};

export default Home;
