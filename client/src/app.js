const SynthView = require('./views/synthView');
const Request = require('./services/request.js');

const synthView = new SynthView();
const request = new Request('http://localhost:3000/api/synths');

const getSynthsRequestComplete = function(allSynths){
  allSynths.forEach(synth => synthView.addSynth(synth));
}

const createButtonClicked = function(event){
  event.preventDefault();

  const nameInputValue = document.getElementById('name').value;
  const manuInputValue = document.getElementById('manufacturer').value;

  const synthToSave = {
    name: nameInputValue,
    manufacturer: manuInputValue
  };

  request.post(createRequestComplete, synthToSave);
}

const appStart = function(){
  request.get(getSynthsRequestComplete);

  const createSynthButton = document.getElementById('submit-synth');
  createSynthButton.addEventListener('click', createButtonClicked);
}

document.addEventListener('DOMContentLoaded', appStart);
