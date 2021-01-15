$(document).ready(function() {
 
  // API + App Mode (Recipes/Drinks)
  var apiKey =  "9973533";
  var mode = "recipes";
  var api = "themealdb";

  // Store data from random API calls on startup
  var randomRecipe;
  var randomDrink;

  // Track indexes of currently displayed recipe and drink
  var currentRecipe;
  var currentDrink;

  // Recipe and drink ID number arrays
  var recipeIds = [];
  var drinkIds = [];

  // Local storage arrays
  var savedRecipes = [];
  var savedDrinks = [];


  // Get recipe/drink data from APIs
  function getRecipes(api, query, userInput) {
    recipeIds.splice(0)
    $.ajax({
      url: `https://www.${api}.com/api/json/v2/${apiKey}/filter.php?${query}=${userInput}`,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var recipeArray;
      var id;

      if (mode === "recipes") {
        recipeArray = response.meals;
      } else if (mode === "drinks") {
        recipeArray = response.drinks;
      }

      $.each(recipeArray, function(i, recipe) {
        if (mode === "recipes") {
          recipeIds.push(recipe.idMeal);

        } else if (mode === "drinks") {
          recipeIds.push(recipe.drinkId);
        }
      });

      if (mode === "recipes") {
        currentIndex = Math.floor(Math.random() * response.meals.length);
        id = response.meals[currentIndex].idMeal;
        getDetails(id, api);

      } else if (mode === "drinks") {
        currentIndex = Math.floor(Math.random() * response.drinks.length);
        id = response.drinks[currentIndex].idDrink;
        getDetails(id, api);
      }
    });
  }

  function getDetails(id, api) {
    $.ajax({
      url: `https://www.${api}.com/api/json/v2/${apiKey}/lookup.php?i=${id}`,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      if (mode === "recipes") {
        getIngredientList(response.meals[0]);

      } else if (mode === "drinks") {
        getIngredientList(response.drinks[0]);
      }
    });
  }

  function getIngredientList(recipe) {

    var ingredients = [
      recipe.strIngredient1,
      recipe.strIngredient2,
      recipe.strIngredient3,
      recipe.strIngredient4,
      recipe.strIngredient5,
      recipe.strIngredient6,
      recipe.strIngredient7,
      recipe.strIngredient8,
      recipe.strIngredient9,
      recipe.strIngredient10,
      recipe.strIngredient11,
      recipe.strIngredient12,
      recipe.strIngredient13,
      recipe.strIngredient14,
      recipe.strIngredient15,
      recipe.strIngredient16,
      recipe.strIngredient17,
      recipe.strIngredient18,
      recipe.strIngredient19,
      recipe.strIngredient20,
    ];

    var measurements = [
      recipe.strMeasure1,
      recipe.strMeasure2,
      recipe.strMeasure3,
      recipe.strMeasure4,
      recipe.strMeasure5,
      recipe.strMeasure6,
      recipe.strMeasure7,
      recipe.strMeasure8,
      recipe.strMeasure9,
      recipe.strMeasure10,
      recipe.strMeasure11,
      recipe.strMeasure12,
      recipe.strMeasure13,
      recipe.strMeasure14,
      recipe.strMeasure15,
      recipe.strMeasure16,
      recipe.strMeasure17,
      recipe.strMeasure18,
      recipe.strMeasure19,
      recipe.strMeasure20,
    ];

    if (mode === "recipes") {
      displayRecipe(recipe, ingredients, measurements);

    } else if (mode === "drinks") {
      displayDrinks(recipe, ingredients, measurements);
    }

  }
//Display recipes function for food side
  function displayRecipe(recipe, ingredients, measurements) {
    $("#recipe-info").empty();
    $("#recipe-title").text(recipe.strMeal);
    $("#recipe-thumbnail").attr("src", recipe.strMealThumb);
    $("#recipe-instructions").text(recipe.strInstructions);

    var listTitle = $("<li>");
    listTitle.addClass("list-group-item text-success bold pl-0");
    listTitle.text("Ingredients:")
    $("#recipe-info").append(listTitle);

    $.each(ingredients, function(i, ingredient) {
      if (ingredient) {
        var li = $("<li>");
        li.addClass("list-group-item pl-0");
        li.text(measurements[i] + " " + ingredient);
        $("#recipe-info").append(li);
      }
    });

    if (recipe.strSource) {
      var li = $("<li>").addClass("list-group-item pl-0");
      var a = $("<a>").addClass("text-success bold");
      a.text("View Recipe Source");
      a.attr("href", recipe.strSource)
      li.append(a);
      $("#recipe-info").append(li);
    }

    if (recipe.strYoutube) {
      var li = $("<li>").addClass("list-group-item pl-0");
      var a = $("<a>").addClass("text-success bold");
      a.text("View Video");
      a.attr("href", recipe.strYoutube)
      li.append(a);
      $("#recipe-info").append(li);
    }

    var instructions = $("<li>").addClass("list-group-item pl-0");
    var instructionsLink = $("<a>").addClass("text-success bold");
    instructions.attr({
      "data-toggle": "collapse",
      "data-target": "#drawer",
      "aria-expanded": "false",
      "aria-controls": "drawer"
    });
    instructionsLink.text("View Recipe Instructions");
    instructions.append(instructionsLink);
    $("#recipe-info").append(instructions);
  }

  // Display function for drink recipes
  function displayDrinks(recipe, ingredients, measurements) {
    $("#drink-info").empty();
    $("#drink-title").text(recipe.strDrink);
    $("#drink-thumbnail").attr("src", recipe.strDrinkThumb);
    $("#drink-instructions").text(recipe.strInstructions);

    var listIngTitle = $("<li>");
    listIngTitle.addClass("list-group-item text-info bold pl-0");
    listIngTitle.text("Ingredients:")
    $("#drink-info").append(listIngTitle);

    $.each(ingredients, function(i, ingredient) {
      if (ingredient) {
        var drinkLi = $("<li>");
        drinkLi.addClass("list-group-item pl-0");
        drinkLi.text(measurements[i] + " " + ingredient);
        $("#drink-info").append(drinkLi);
      }
    });

    if (recipe.strSource) {
      var li = $("<li>").addClass("list-group-item pl-0");
      var a = $("<a>").addClass("text-info bold");
      a.text("View Recipe Source");
      a.attr("href", recipe.strSource)
      li.append(a);
      $("#drink-info").append(li);
    }

    if (recipe.strVideo) {
      var li = $("<li>").addClass("list-group-item pl-0");
      var a = $("<a>").addClass("text-info bold");
      a.text("View Video");
      a.attr("href", recipe.strVideo)
      li.append(a);
      $("#drink-info").append(li);
    }

    var instructions = $("<li>").addClass("list-group-item pl-0");
    var instructionsLink = $("<a>").addClass("text-info bold");
    instructions.attr({
      "data-toggle": "collapse",
      "data-target": "#drawer",
      "aria-expanded": "false",
      "aria-controls": "drawer"
    });
    instructionsLink.text("View Drink Instructions");
    instructions.append(instructionsLink);
    $("#drink-info").append(instructions);
  }

  // Event Listener: Search button
  $(".search-btn").on("click", function() {

    var ingredient;
    var category;
    var query;
    var userInput;

    if (mode === "recipes") {
      api = "themealdb";
      ingredient = $("#recipe-ingredient").val();
      category = $("#recipe-categories").val();

    } else if (mode === "drinks") {
      api = "thecocktaildb";
      ingredient = $("#drink-ingredient").val();
      category = $("#drink-categories").val();
    }

    if (ingredient && !category) {
      query = "i";
      userInput = ingredient;

    } else if (!ingredient && category) {
      userInput = category;
      query = "c";
    
    } else if (!ingredient && !category) {
      console.log("Invalid input.");

    } else if (ingredient && category) {
      console.log("Please choose one input only.");
    }

    getRecipes(api, query, userInput);
  });


  // EVENT LISTENER: Cycle Forward Arrow
  $(".cycle-forward").click(function() {
    var lastRecipe = recipeIds.length - 1;
    var lastDrink = drinkIds.length - 1;

    if (currentRecipe === lastRecipe && mode === "recipes") {
      currentRecipe = 0;
      getDetails(recipeIds[currentRecipe], api);

    } else if (currentRecipe !== lastRecipe && mode === "recipes") {
      currentRecipe++;
      getDetails(recipeIds[currentRecipe], api);
    } 
    
    if (currentDrink === lastDrink && mode === "drinks") {
      currentDrink = 0;
      getDetails(drinkIds[currentDrink], api);

    } else if (currentDrink !== lastDrink && mode === "drinks") {
      currentDrink++;
      getDetails(drinkIds[currentDrink], api);
    }
  });


  // EVENT LISTENER: Cycle Backward Button
  $(".cycle-backward").click(function() {
    var lastRecipe = recipeIds.length - 1;
    var lastDrink = drinkIds.length - 1;

    if (currentRecipe === 0 && mode === "recipes") {
      currentRecipe = lastRecipe;
      getDetails(recipeIds[currentRecipe], api);

    } else if (currentRecipe > 0 && mode === "recipes") {
      currentRecipe--;
      getDetails(recipeIds[currentRecipe], api);
    }

    if (currentDrink === 0 && mode === "drinks") {
      currentDrink = lastDrink;
      getDetails(drinkIds[currentDrink], api);

    } else if (currentDrink > 0 && mode === "drinks") {
      currentDrink--;
      getDetails(drinkIds[currentDrink], api);
    }
  });


  // Event Listeners: Food/Drink Buttons in top right corner
  $(".button-left").ready(function() {
    $("#food-side").show();
    $("#drinks-side").hide();
    $(".button-left").css({"background-color": "black", "color": "white"});
    $(".button-right").css({"background-color": "gray", "color": "white"});
  });

  // EVENT LISTENER: Food Button
  $('.button-left').click(function() {
    mode = "recipes";
    api = "themealdb";
    $(".save-btn").hide();
    $('#food-side').show(500);
    $('#drinks-side').hide(500);
    $(".button-left").css({"background-color": "black", "color": "white"});
    $(".button-right").css({"background-color": "gray", "color": "white"});
    $("#sticky-footer").removeClass("bg-info").addClass("bg-success");
  });

  // EVENT LISTENER: Drinks Button
  $('.button-right').click(function() {
    mode = "drinks";
    api = "thecocktaildb";
    $(".save-btn").hide();
    $('#drinks-side').show(500);
    $('#food-side').hide(500);
    $(".button-left").css({"background-color": "gray", "color": "white"});
    $(".button-right").css({"background-color": "black", "color": "white"});
    $("#sticky-footer").removeClass("bg-success").addClass("bg-info");
  });
});

