import { AppState } from "../AppState.js"
import { Job } from "../models/Job.js"
import { api } from "./AxiosService.js"


class JobsService {

  async getJobs() {
    const response = await api.get('api/jobs')
    const jobs = response.data.map(job => new Job(job))
    AppState.jobs = jobs
  }

  async createJob(jobData) {
    const response = await api.post('api/jobs', jobData)
    console.log('Jobs axios', response);
    const job = new Job(response.data)
    AppState.jobs.push(job)
  }

  async deleteJob(jobId) {
    const response = await api.delete(`api/jobs/${jobId}`)
    console.log('job', response);
    const indexToRemove = AppState.jobs.findIndex(job => job.id == jobId)
    AppState.jobs.splice(indexToRemove, 1)
  }

  // async editJob(jobId) {
  //   const response = await api.edit(`api/jobs/${jobId}`)
  //   console.log('job', response);
  // }

}


export const jobsService = new JobsService