const fs = require("fs");
const csv = require("csvtojson");

const cleanData = async () => {
  
  let newData = await csv().fromFile("nutrients_csvfile.csv"); //convert csv to json array

  newData = newData
    .map((ingredient, index) => { // reshape data objects 

      return {
        id: index + 1,
        name: ingredient.name.toLowerCase(),
        calories_per_100g: parseInt((ingredient.calories / ingredient.grams) * 100),
        protein_per_100g: parseInt((ingredient.protein / ingredient.grams) * 100),
        fat_per_100g: parseInt((ingredient.fat / ingredient.grams) * 100),
        saturated_fat_per_100g: parseInt((ingredient.satFat / ingredient.grams) * 100),
        fiber_per_100g: parseInt((ingredient.fiber / ingredient.grams) * 100),
        carbs_per_100g: parseInt((ingredient.carbs / ingredient.grams) * 100),
        category: ingredient.category
      };
    })
    

  // retrieve db.json content
  let data = JSON.parse(fs.readFileSync("ingredient.json"));

  // apped newly created json array
  data.data = newData; 


  // write updated content into db.json
  fs.writeFileSync("ingredient.json", JSON.stringify(data));
};


cleanData();