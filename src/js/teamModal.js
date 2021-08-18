import { team } from './team'
import teamTemplate from '../templates/teamTemplate.hbs'

const modalList = document.querySelector('.modal-list')


function renderTeamModal() {
  const dataRender = team.map(teamTemplate).join(' ')
  modalList.innerHTML = dataRender
}

renderTeamModal()

