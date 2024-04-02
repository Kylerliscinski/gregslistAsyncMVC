import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";




export class HousesController {
  constructor() {
    console.log('This is the Houses Controller');
    this.getHouses()
    AppState.on('houses', this.drawHouses)
  }

  drawHouses() {
    const houses = AppState.houses
    let houseCards = ''
    houses.forEach(house => houseCards += house.HouseCard)
    console.log(houseCards);
    setHTML('house-listings', houseCards)
  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      Pop.toast("Couldn't get houses, try again later", 'error')
      console.error(error);
    }
  }

  async createHouse() {
    try {
      event.preventDefault()
      console.log('New House Listing!');
    } catch (error) {

    }
  }
}