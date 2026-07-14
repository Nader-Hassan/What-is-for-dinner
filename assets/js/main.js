var recipes = [];
var lastIndex = -1;

async function loadrecipes() {
  var response = await fetch("./data/recipes.json");
  return await response.json();
}

function renderTabs(data, type) {
  var box = "";

  for (i = 0; i < data.length; i++) {
    switch (type) {
      case "ingredients":
        box += `<li class="d-flex align-items-start">
                        <div
                          class="w-6 h-6 bg-orange-500 rounded-full d-flex align-items-center justify-content-center text-white text-xs fw-bold me-2 flex-shrink-0">
                          ${i + 1}
                        </div>
                        <span class="text-gray-700">${data[i]}</span>
                      </li>
                     `;
        break;
      case "instructions":
        box += `<li class="d-flex align-items-start">
                      <div
                        class="w-12 h-12 bg-orange-500 rounded-4 d-flex align-items-center justify-content-center text-white text-xl fw-bold me-2 flex-shrink-0">
                         ${i + 1}
                      </div>
                      <span class="text-gray-700 align-self-center"
                        >${data[i]}</span
                      >
                    </li>`;
        break;
      case "chefsTips":
        box += `
              <div
                      class="d-flex align-items-center p-3 bg-amber-50 rounded-xl border-start border-4 border-amber-400">
                      <i
                        class="fa-solid fa-circle-check text-xl me-3 mt-1 text-amber-600"></i>
                      <p class="text-gray-700 mb-0">
                        ${data[i]}
                      </p>
                    </div>
              `;
      default:
        break;
    }
  }
  return box;
}

function renderButtonTabs(id, lable, icon, isActive) {
  return `<li class="nav-item" role="presentation">
                <button
                  class="nav-link text-gray-500 fw-semibold ${isActive ? "active" : ""}"
                  id="${id}-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#${id}-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="${id}-tab-pane"
                  aria-selected="${isActive ? "true" : "false"}">
                  <i class="fa-solid ${icon} me-2"></i>${lable}
                </button>
              </li>`;
}
function renderIngredient(lable, value, background, icon) {
  return `   <div class="col-12 col-md-6">
                        <div
                          class="d-flex align-items-center justify-content-between p-3 bg-gray-50 rounded-xl">
                          <div class="d-flex align-items-center">
                            <div
                              class="w-10 h-10 ${background} rounded-3 d-flex align-items-center justify-content-center me-3">
                              <i class="${icon}"></i>
                            </div>
                            <span
                              class="text-gray-700 fw-medium text-xs md:text-base"
                              >${lable}</span
                            >
                          </div>
                          <span class="md:text-xl fw-bold text-gray-900"
                            >${value}</span
                          >
                        </div>
                      </div>`;
}

function getRandomIndex(length) {
  var randomIndex;

  do {
    randomIndex = Number(Math.random() * (length - 1)).toFixed(0);
  } while (randomIndex == lastIndex);
  lastIndex = randomIndex;
  return randomIndex;
}
function getRandomRecipe() {
  var container = document.getElementById("recipe");
  var index = getRandomIndex(recipes.length);
  var recipe = recipes[index];
  var ingredients = renderTabs(recipe.ingredients, "ingredients");
  var instructions = renderTabs(recipe.instructions, "instructions");
  var chefTips = renderTabs(recipe.chefsTips, "chefsTips");

  container.innerHTML = `
    <div class="col-lg-5 hero-img overflow-hidden position-relative user-select-none">
            <img
              src="${recipe.image}"
              alt="${recipe.title}"
              class="w-100 h-100 object-fit-cover" />
            <div class="rate-reviews bg-white rounded-full py-2 px-3 shadow-lg">
              <div class="d-flex align-items-center gap-2">
                <i
                  class="text-yellow-400 text-sm md:text-base fa-solid fa-star"></i>
                <span class="fw-semibold text-gray-900 text-sm md:text-base"
                  >${recipe.rate}</span
                >
                <span class="text-gray-500 text-xs md:text-sm"
                  >(${recipe.reviewsCount} reviews)</span
                >
              </div>
            </div>
            <div class="prep-process padding-3 p-md-4 shadow-lg rounded-4">
              <div class="d-flex justify-content-around gap-3 text-center">
                <div>
                  <i
                    class="text-orange-500 text-lg md:text-2xl fa-solid fa-clock"></i>
                  <p class="text-xs md:text-sm text-gray-500 mb-0">Prep Time</p>
                  <p class="fw-bold text-gray-900 text-sm md:text-base mb-0">
                    ${recipe.prepTime}
                  </p>
                </div>
                <div>
                  <i
                    class="text-red-500 text-lg md:text-2xl fa-solid fa-fire-burner"></i>
                  <p class="text-xs md:text-sm text-gray-500 mb-0">Cook Time</p>
                  <p class="fw-bold text-gray-900 text-sm md:text-base mb-0">
                    ${recipe.cookTime}
                  </p>
                </div>
                <div>
                  <i
                    class="text-blue-500 text-lg md:text-2xl fa-solid fa-users"></i>
                  <p class="text-xs md:text-sm text-gray-500 mb-0">Servings</p>
                  <p class="fw-bold text-gray-900 text-sm md:text-base mb-0">
                    ${recipe.servings_people}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7 padding-5 md:p-10 h-100 overflow-y-auto">
            <div
              class="d-flex flex-column flex-md-row tw-gap-5 align-items-start justify-content-between mb-4">
              <div>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <span
                    class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs fw-semibold"
                    >${recipe.level}</span
                  >
                  <span
                    class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs fw-semibold"
                    >${recipe.nationaltiy}</span
                  >
                </div>
                <h3 class="text-2xl md:text-4xl fw-bold text-gray-900 mb-2">
                  ${recipe.title}
                </h3>
                <p class="text-sm md:text-lg text-gray-600">
                   ${recipe.description}
                </p>
              </div>
              <div
                class="align-self-end align-self-md-center d-flex gap-2 order-first order-md-0">
                <div
                  class="w-12 h-12 bg-orange-100 hover-bg-orange-200 text-orange-600 rounded-xl d-flex align-items-center justify-content-center cursor-pointer duration-200">
                  <i class="fa-solid fa-bookmark"></i>
                </div>
                <div
                  class="w-12 h-12 bg-orange-100 hover-bg-orange-200 text-orange-600 rounded-xl d-flex align-items-center justify-content-center cursor-pointer duration-200">
                  <i class="fa-solid fa-share-nodes"></i>
                </div>
              </div>
            </div>
            ${
              recipe.isExtendedPreparationTime
                ? `<div
              id="time-warning"
              class="bg-red-50 border-start border-4 border-red-500 p-3 rounded-3 mb-4">
              <div class="d-flex align-items-center">
                <i
                  class="text-red-500 text-xl me-3 fa-solid fa-triangle-exclamation"></i>
                <div>
                  <p class="fw-semibold text-red-800 text-sm md:text-base mb-0">
                    Extended Preparation Time
                  </p>
                  <p class="text-xs md:text-sm text-red-600 mb-0">
                    This recipe requires more than 45 minutes to prepare. Plan
                    accordingly!
                  </p>
                </div>
              </div>
            </div>`
                : ""
            }
            <ul class="nav nav-tabs pb-3 px-4" id="myTab" role="tablist">
            ${renderButtonTabs("ingredients", "Ingredients", "fa-list-check", true)}
            ${renderButtonTabs("instructions", "Instructions", "fa-book-open")}
            ${renderButtonTabs("nutrition", "Nutrition", "fa-chart-pie")}
            ${renderButtonTabs("chefsTips", "Chef's Tips", "fa-lightbulb")}
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="ingredients-tab-pane"
                role="tabpanel"
                aria-labelledby="ingredients-tab"
                tabindex="0">
                <div class="content-tab overflow-y-auto mt-4">
                  <div class="bg-gradient-orange-amber rounded-4 p-4">
                    <ul class="d-flex flex-column gap-3">
                      ${ingredients}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="instructions-tab-pane"
                role="tabpanel"
                aria-labelledby="instructions-tab"
                tabindex="0">
                <div class="content-tab overflow-y-auto mt-4">
                  <ul class="d-flex flex-column gap-3 p-0">
                 ${instructions}
                  </ul>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nutrition-tab-pane"
                role="tabpanel"
                aria-labelledby="nutrition-tab"
                tabindex="0">
                <div class="content-tab overflow-y-auto mt-4">
                  <div class="container">
                    <div class="row g-3">
                    ${renderIngredient("Calories", recipe.nutrition.calories, "bg-orange-100", "text-orange-600 fa-solid fa-fire")}
                    ${renderIngredient("Protein", recipe.nutrition.protein, "bg-blue-100", "text-blue-600 fa-solid fa-dumbbell")}
                    ${renderIngredient("Carbohydrates", recipe.nutrition.carbohydrates, "bg-yellow-100", "text-yellow-600 fa-solid fa-wheat-awn")}
                    ${renderIngredient("Fat", recipe.nutrition.fat, "bg-red-100", "text-red-600 fa-solid fa-droplet")}
                    ${renderIngredient("Fiber", recipe.nutrition.fiber, "bg-green-100", "text-green-600 fa-solid fa-seedling")}
                    ${renderIngredient("Sodium", recipe.nutrition.sodium, "bg-pink-100", "text-pink-600 fa-solid fa-cube")}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="chefsTips-tab-pane"
                role="tabpanel"
                aria-labelledby="chefsTips-tab"
                tabindex="0">
                <div class="content-tab overflow-y-auto mt-4">
                  <div class="d-flex flex-column gap-3">
                    ${chefTips}
                  </div>
                </div>
              </div>
            </div>
            <div class="border-top border-1 border-gray-200 mt-8 pt-4">
              <button
                id="refreshBtn"
                class="btn btn-tryAnother-gradient text-white px-4 py-2 px-md-4 py-md-3 rounded-4 fw-semibold shadow-lg text-sm md:text-base">
                <i class="fa-solid fa-rotate me-1 me-md-2"></i>
                Try Another Recipe
              </button>
            </div>
          </div>`;

  document
    .getElementById("refreshBtn")
    .addEventListener("click", getRandomRecipe);
}

async function main() {
  recipes = await loadrecipes();
  getRandomRecipe();
}
main();





















