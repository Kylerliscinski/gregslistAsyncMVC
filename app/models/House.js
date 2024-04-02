import { AppState } from "../AppState.js"




export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = data.updatedAt
    this.creator = data.creator
  }

  get HouseCard() {
    return `
    <div class="col-12 col-md-6 g-3">
      <div class="card bg-success shadow">
        <img class="card-img-top"
          src="${this.imgUrl}"
          alt="Image of a ${this.year}, house">
        <div class="card-body">
          <h3 class="card-title">Year - ${this.year} | bed/${this.bedrooms} bath/${this.bathrooms}</h3>
          <p class="card-text">${this.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <p class="fw-bold fs-4">Price: $${this.price}</p>
            <div>
              <span class="text-secondary me-2">${this.creator.name}</span>
              <img class="profile-picture profile-picture-sm"
                src="${this.creator.picture}"
                alt="an image of ${this.creator.name}">
            </div>
          </div>
          <div class="text-secondary py-2">Listed on ${this.createdAt.toDateString()}<span class="float-end">${this.DeleteButton}</span></div>
        </div>
      </div>
    </div>
    `
  }
  get DeleteButton() {
    if (this.creatorId == AppState.account?.id) {
      return `
      <button onclick="app.HousesController.deleteHouse('${this.id}')" class="btn btn-danger" title="delete this car"><i class="mdi mdi-delete-circle-outline"></i></button>
      `
    }
    return ''
  }
}