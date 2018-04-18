const SynthView = require('./views/synthView');
const Request = require('./services/request.js');

const synthView = new SynthView();
const request = new Request('http://localhost:3000/api/synths');

const getSynthsRequestComplete = function(allSynths){
  allSynths.forEach(synth => synthView.addSynth(synth));
}

const appStart = function(){
  request.get(getSynthsRequestComplete);
}

document.addEventListener('DOMContentLoaded', appStart);
