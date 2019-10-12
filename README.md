# cubecraft.js
## What is cubecraft.js ?
cubecraft.js is a JavaScript API for get data from CubeCraft.

## How to install ?
Run :
`npm install --save github:Seyz123/cubecraft.js`

## Usage
You can see `tests/index.js` for an example.
### Get SkyWars leaderboard by platform :
```js
const cc = require("cubecraft.js");

cc.getLeaderboardData("bedrock", "skywars").then(function(data){
	console.log(data);
}).catch(function(error){
	console.error(error);
});
```

## Status
Work in progress...
