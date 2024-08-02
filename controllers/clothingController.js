const express = require("express");
const clothes = express.Router();

const { 
  getAllClothes, 
  getOneTypeOfClothing, 
  addClothingItem,
  updateClotheInformation 
}= require('../queries/clothing')

const checkValidNewInfo = require('../validations/clothingValidations')

clothes.get("/", async (req, res) => {
    const allClothes = await getAllClothes();
    if (allClothes[0]) {
      res.status(200).json(allClothes);
    } else {
      res.status(500).json({ error: "No clothes are in the database" });
    }
  });


clothes.get("/:type", async (req, res) => {
    const { type } = req.params;
    const oneTypeOfClothing = await getOneTypeOfClothing(type);
    if (oneTypeOfClothing) {
      res.status(200).json(oneTypeOfClothing);
    } else {
      res.status(500).json({ error: `We dont sell ${type} type of clothing`});
    }
  });


clothes.post("/", checkValidNewInfo, async (req, res) => {
    const addNewClothingItem = await addClothingItem(req.body);
    res.status(201).json({Message: "New clothing Item has been added to the list of available clothing"});
  });

clothes.put("/:id", async (req,res)=>{
    const newInfo = req.body;
    const { id } = req.params;
    const updateClotheInfo = await updateClotheInformation({id, ...newInfo});
    if(updateClotheInfo.id){
        res.status(200).json({Message: "Invemntory has been successfully updated within the database"});
    }else{
        res.status(404).json({ error: `ID ${id} Can Not Be Found` });
    }
});


// clothes.delete("/:id", async (req, res) => {
//     const { id } = req.params;
//     const deletedSong = await deleteSong(id);
    
//     if(deletedSong.id) {
//         res.status(200).json({ message: `The song called "${deletedSong.name}" has been deleted.` });
//     } else {
//         res.status(404).json( {error: "Song could not be deleted" });
//     }
// });


  module.exports = clothes;