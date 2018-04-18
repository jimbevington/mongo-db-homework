var SynthView = function(){
  this.synths = [];
}

SynthView.prototype.addSynth = function(synth) {
  this.synths.push(synth);
  this.render(synth);
}

SynthView.prototype.clear = function(synth) {
  this.synths = [];
  const ul = document.querySelector('#synths');
  ul.innerHTML = '';
}

SynthView.prototype.render = function(synth){
    const ul = document.querySelector('#synths');
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${synth.name} - "${synth.manufacturer}"`;
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = SynthView;
