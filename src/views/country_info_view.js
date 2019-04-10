const PubSub = require('../helpers/pub_sub.js');
const timezoneHelper = require('../helpers/timezone.js');



const CountryInfoView = function (){
  this.selected = null
};

CountryInfoView.prototype.bindEvents = function(){
  const infoView = document.querySelector('#country')
  PubSub.subscribe('Country:selected-country-ready', (data)=>{
    this.selected = data.detail;
    this.clear(infoView);
    const name = this.selected.name;
    // infoView.appendChild(this.createHeader(name));

    const region = this.selected.region;
    infoView.appendChild(this.createDetail(region, 'In the region'))

    const time = this.createDetail("calculating time", '');
    infoView.appendChild(time);

    const flag = this.selected.flag;
    infoView.appendChild(this.createImage(flag));

    const timerId = window.setInterval(()=>{
      if (!this.selected){return}
      if (this.selected.timezones.length > 1){
        time.textContent = "This country has more than one timezone";
        window.clearInterval(timerId);
        return;
      };
      time.textContent = `Local time relative to UTC is ${timezoneHelper.convert(new Date(), this.getLocalTime())}`;
    }, 1000)
  });
};

CountryInfoView.prototype.getLocalTime = function () {
  let time = this.selected.timezones[0];
  time = time.slice(3,6);
  if (time.includes('+')){
    time = time.slice(1,time.length)
  };
  return parseInt(time);
};



CountryInfoView.prototype.createHeader = function (name) {
    const header = document.createElement('h2');
    header.textContent = name
    return header
};

CountryInfoView.prototype.createDetail = function (detail, descriptiveText) {
    const paragraph = document.createElement('p');
    paragraph.textContent = `${descriptiveText} ${detail}`;
    return paragraph;
};

CountryInfoView.prototype.createImage = function (url) {
    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    image.src = url
    imageContainer.classList.add("flag");
    imageContainer.appendChild(image);
    return imageContainer;
};

CountryInfoView.prototype.clear = function(infoView){
  while (infoView.firstChild){
    infoView.removeChild(infoView.firstChild);
  };
};

module.exports = CountryInfoView;
