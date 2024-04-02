import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";




export class HousesController {
  constructor() {
    // console.log('This is the Houses Controller');
    this.getHouses()
    AppState.on('houses', this.drawHouses)
    AppState.on('account', this.drawHouses)
    AppState.on('account', this.showHouseForm)
    this.showHouseForm()
  }

  drawHouses() {
    const houses = AppState.houses
    let houseCards = ''
    houses.forEach(house => houseCards += house.HouseCard)
    // console.log(houseCards);
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
      const form = event.target
      const houseData = getFormData(form)
      console.log(houseData);
      await housesService.createHouse(houseData)
    } catch (error) {
      console.error('!', error)
      Pop.toast("Couldn't post house", 'error')
    }
  }

  showHouseForm() {
    const account = AppState.account
    if (account) {
      const formElem = document.getElementById('house-form')
      formElem.classList.remove('d-none')
    }
  }

  async deleteHouse(houseId) {
    try {
      const result = await Pop.confirm("are you sure you want to delete this house?")
      if (result == false) return

      await housesService.deleteHouse(houseId)
    } catch (error) {
      console.error('❗', error)
      Pop.toast("Couldn't Delete House", 'error')
    }
  }
}