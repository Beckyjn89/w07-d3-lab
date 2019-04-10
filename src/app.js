const Country = require('./models/country.js');
const SelectView = require('./views/select_view.js');
const CountryInfoView = require('./views/country_info_view.js');
const timezoneHelper = require('./helpers/timezone.js')


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const countryInfoView = new CountryInfoView();
  countryInfoView.bindEvents();

  const selectView = new SelectView();
  selectView.bindEvents();

  const country = new Country();
  country.bindEvents();
  country.getAll();

  console.log('dafuq?');

});
