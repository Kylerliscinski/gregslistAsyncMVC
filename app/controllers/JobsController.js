import { AppState } from "../AppState.js";
import { jobsService } from "../services/JobsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class JobsController {
  constructor() {
    this.getJobs()
    AppState.on('jobs', this.drawJobs)
    AppState.on('account', this.drawJobs)
    AppState.on('account', this.showJobForm)
    this.showJobForm()
  }

  drawJobs() {
    const jobs = AppState.jobs
    let jobCards = ''
    jobs.forEach(job => jobCards += job.JobCard)
    setHTML('job-listings', jobCards)
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      Pop.toast("Couldn't get jobs, try again later", 'error')
      console.error(error);
    }
  }

  async createJob() {
    try {
      event.preventDefault()
      console.log('New Job Listing!');
      const form = event.target
      const jobData = getFormData(form)
      console.log(jobData);
      await jobsService.createJob(jobData)
    } catch (error) {
      console.error('!', error)
      Pop.toast("Couldn't post job", 'error')
    }
  }

  showJobForm() {
    const account = AppState.account
    if (account) {
      const formElem = document.getElementById('job-form')
      formElem.classList.remove('d-none')
    }
  }

  async deleteJob(jobId) {
    try {
      const result = await Pop.confirm("are you sure you want to delete this job listing?")
      if (result == false) return

      await jobsService.deleteJob(jobId)
    } catch (error) {
      console.error('❗', error)
      Pop.toast("Couldn't Delete Job", 'error')
    }
  }
}