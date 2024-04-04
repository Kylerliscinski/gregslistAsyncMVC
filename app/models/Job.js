import { AppState } from "../AppState.js"


export class Job {
  constructor(data) {
    this.id = data.id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = data.updatedAt
    this.creator = data.creator
  }

  get JobCard() {
    return `
    <div class="col-12 col-md-6 g-3">
      <div class="card bg-success">
        <div class="card-body">
          <h3 class="card-title">${this.company} | ${this.jobTitle}</h3>
          <p class="card-text">Job description ~ ${this.description} | Hours: ${this.hours}</p>
          <div class="d-flex justify-content-between align-items-center">
            <p class="fw-bold fs-4">Rate of pay: $${this.rate}</p>
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
      <button onclick="app.JobsController.deleteJob('${this.id}')" class="btn btn-danger" title="delete this car"><i class="mdi mdi-delete-circle-outline"></i></button>
      `
    }
    return ''
  }

  // get EditButton() {
  //   if (this.creatorId == AppState.account?.id) {
  //     return `
  //     <button onclick="app.JobsController.editJob('${this.id}')" class="btn btn-warning" title="edit this car"><i class="mdi mdi-pencil-circle-outline"></i></button>
  //     `
  //   }
  //   return ''
  // }
}