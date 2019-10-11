const cc = require("../");

setInterval(() => {
	cc.getOnlineData().then(function(data){
		console.log(data);
	}).catch(function(error){
		console.log(error.stack);
	});
}, 500)