

const TimezoneHelper = {
  convert: function(date = new Date(), offset = 0) {
    let hours = date.getUTCHours() + offset;
    if (hours > 23) hours = 24 - hours;
    if (hours < 0) hours = 24 + hours;
    hours = hours.toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`
}};

module.exports = TimezoneHelper;
