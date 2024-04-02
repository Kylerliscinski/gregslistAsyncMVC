import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"



class HousesService {

  async getHouses() {
    const response = await api.get('api/houses')
    console.log('House', response);
    const houses = response.data.map(house => new House(house))
    AppState.houses = houses
  }
}


export const housesService = new HousesService