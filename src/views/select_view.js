const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (){

};

SelectView.prototype.bindEvents = function(){
  const dropdown = document.querySelector('#countries');
  dropdown.addEventListener('change', (event)=>{
    PubSub.publish('SelectView:country-selected', event.target.value);
  });

  PubSub.subscribe('Country:country-data-loaded', (data)=>{
      data.detail.forEach((name)=>{
        dropdown.appendChild(this.createOption(name));
      });
      this.renderDefault();
  });

};

SelectView.prototype.renderDefault = function () {
  PubSub.publish('SelectView:country-selected', 'United Kingdom of Great Britain and Northern Ireland');
};

SelectView.prototype.createOption = function(name){
  const option = document.createElement('option')
  option.textContent = name;
  option.id = name;
  return option;
};

module.exports = SelectView;
