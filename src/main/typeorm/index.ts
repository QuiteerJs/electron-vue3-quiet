import { AppDataSource } from './data-source'

export default function initTypeorm() {
  AppDataSource.initialize().catch(error => console.log(error))
}
