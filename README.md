# cubecraft.js [![Codacy Badge](https://api.codacy.com/project/badge/Grade/1f41acd33d944d2eac983189b7c2d14c?style=for-the-badge)](https://www.codacy.com/manual/Seyz123/cubecraft.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Seyz123/cubecraft.js&amp;utm_campaign=Badge_Grade)
## What is cubecraft.js
cubecraft.js is a JavaScript API for get data from CubeCraft.

## How to install
Run :
`npm install --save github:Seyz123/cubecraft.js`

## Usage
You can see `tests/index.js` for an example.
### Get SkyWars leaderboard by platform
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
