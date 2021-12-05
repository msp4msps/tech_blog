module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    date = new Date();
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();

    return m + "/" + d + "/" + y;
  },
};
