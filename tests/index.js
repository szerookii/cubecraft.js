const cc = require("../");

cc.getLeaderboardData("bedrock", "skywars").then(function(data){
	console.log(data);
}).catch(function(error){
	console.error(error);
});