$(document).ready(function(){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    $("#hello").text("Hello, current time:" + time);
  });