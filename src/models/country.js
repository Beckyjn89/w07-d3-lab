const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Country = function (){
  this.countries = null
  this.names = null
};

Country.prototype.getAll = function(){
  const requestHelper =  new RequestHelper('https://restcountries.eu/rest/v2/all');
  requestHelper.get((data) => {
    this.countries = data;
    this.names = this.countries.map((country)=>{
      return country.name;
    });


    PubSub.publish('Country:country-data-loaded', this.names);

  });
};

Country.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:country-selected', (data)=>{
    const selectedCountry = this.countries.filter((country)=>{
      return country.name === data.detail
    });
    PubSub.publish('Country:selected-country-ready', selectedCountry[0]);
  });
};

module.exports = Country;
