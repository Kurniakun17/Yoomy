class DetailedRestaurantArticle extends HTMLElement {
  set data(data) {
    this._data = data;
    this.render();
  }

  render() {
    this.innerHTML = `
    <article class="article-item detailed">
      <div class="img-container detailed">
        <img class="lazyload" src=https://restaurant-api.dicoding.dev/images/small/${this._data.pictureId} alt="${this._data.name} image">
        <div class="location-container">
          <h3 class="article-location">${this._data.city}</h3>
        </div>
      </div>
      <div class="article-content-detailed">
        <div class="categories-content">
          <h2 class="article-title detailed">${this._data.name}</h2>
          <h2 class="rating">★ ${this._data.rating}</h2>
        </div>
        <h4 class="article-categories">Categories : ${this._data.categories.map((category) => `<span> ${category.name}</span>`)}.</h4>
        <p class="article-detailed-description">${this._data.description}</p>
        <div class="misc-container">
          <div class="menus-container">
            <h3 class="headline">Menus</h3>
            <div class="menus-section">
              <h4 class="menus-item-title">Foods</h4>  
              <div class="menus-item-list scrollable">
                ${this._data.menus.foods.map((food) => `<div class="menu-item"><h5>${food.name}</h5></div>`).join('')}
              </div>
            </div>
            <div class="menus-section">
              <h4 class="menus-item-title drinks">Drinks</h4>
              <div class="menus-item-list scrollable">
                ${this._data.menus.drinks.map((drink) => `<div class="menu-item"><h5>${drink.name}</h5></div>`).join('')}
              </div>
            </div>
          </div>
          <div class="reviews-container">
            <h3 class="headline">Reviews</h3>
            <div class="review-item-container scrollable">
              ${this._data.customerReviews.map((data) => (
    `<div class="review-item">
      <h4>${data.name}</h4>
      <h5>${data.date}</h5>
      <p>${data.review}</p>
  </div>`
  )).join('')}
              </div>
            </div>
            <div class="review-form" >
              <h3 class="headline">Send Review</h3>
              <form id="form" class="form">
                <input id="nama" placeholder="Nama" min="1"></input>
                <textarea id="review" placeholder="Masukan" min="2"></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
      </article>
    `;
  }
}

customElements.define('detailed-restaurant-article', DetailedRestaurantArticle);
