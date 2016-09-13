var channelTemplate = jQuery.validator.format("<a href=\"{0}\" class=\"list-group-item\" target=\"_blank\"><div class=\"row\"><div class=\"col-xs-1\"><img src=\"{1}\" alt=\"channel icon\" class=\"img-responsive center-block img-circle smaller-image\"></div><div class=\"col-xs-11 col-offset-1\"><h4 class=\"list-group-item-heading\"><strong>{2}</strong></h4><p class=\"list-group-item-text {3}\">{4}</p></div></div></a>");

var noImage = "https://c7.staticflickr.com/9/8897/28872214886_d037ce3f5d.jpg";
var urlNotFound = "https://s.codepen.io/FreeCodeCamp/fullpage/undefined";

var sampleChannels = ["ESL_SC2", "OgamingSC2", "FreeCodeCamp", "storbeck", "RobotCaleb", "Habathcx", "thomasballinger", "terakilobyte", "noobs2ninjas", "Beohoff", "cretetion", "Test_channel", "comster404", "brunofin", "sheevergaming", "TR7K"];

$(document).ready(function() {
  sampleChannels.forEach(function(name) {
    $.getJSON("https://api.twitch.tv/kraken/channels/" + name + "?callback=?", function(channelData) {
		$.getJSON("https://api.twitch.tv/kraken/streams/" + name + "?callback=?", function(streamData) {
			var imageUrl = noImage;
			if (channelData.logo != null)
				imageUrl = channelData.logo;
			if (streamData.stream == null) {
         if (channelData.status == 422) {
           $("#all").append(channelTemplate(urlNotFound, imageUrl, name, "red", channelData.message));
           $("#offline").append(channelTemplate(urlNotFound, imageUrl, name, "red", channelData.message));
         }
        else {
				   $("#all").append(channelTemplate(channelData.url, imageUrl, channelData.display_name, "black", "Offline"));
           $("#offline").append(channelTemplate(channelData.url, imageUrl, channelData.display_name, "black", "Offline"));
        }
      }
			else {
				$("#all").append(channelTemplate(channelData.url, imageUrl, channelData.display_name, "black", channelData.status));
        $("#online").append(channelTemplate(channelData.url, imageUrl, channelData.display_name, "black", channelData.status));
      }
		});
      });
  });
});