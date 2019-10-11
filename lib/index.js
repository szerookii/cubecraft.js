const { parse } = require("node-html-parser"),
axios = require("axios"),
BASE_URL = "https://cubecraft.net/",
MULTIPLE_TYPES = [
    "solo_leaderboard", "team_2_leaderboard", "team_4_leaderboard", "chaos_leaderboard", "team_leaderboard", "duels_leaderboard", "FFA_leaderboard", "assassinations_leaderboard"
],
MTTN = {
    "solo_leaderboard": "Solo",
    "team_2_leaderboard": "Duo",
    "team_4_leaderboard": "Squad",
    "team_leaderboard": "Team",
    "chaos_leaderboard": "Chaos",
    "assassinations_leaderboard": "Assinations",
    "ffa_leaderboard": "FFA",
    "duels_leaderboard": "Duels"
},
VALID_GAMES = {
    "bedrock": {
        "normal": ["ender", "minerware", "survival_games"],
        "multiple": ["skywars", "eggwars"]
    },
    "java": {
        "normal": ["minerware", "tower_defence", "survival_games", "parkour", "ender"],
        "multiple": ["eggwars", "skywars", "lucky_islands", "pvp"]
    }
};

class CubeCraftAPI
{
    
    static async isWebsiteReachable()
    {
        try {
            await axios.get(BASE_URL);
            return true;
        }
        catch(ex){
            return false;
        }
    }

    static getGames()
    {
        return VALID_GAMES;
    }
    
    static getType(type)
    {
        type = type.toLowerCase();
        return MTTN[type];
    }

    static isPvpGame(game) // Could be useful
    {
        game = game.toLowerCase();
        if(game === "ffa_leaderboard" || game === "duels_leaderboard" || game === "assassinations_leaderboard")
        {
            return true;
        } else {
            return false;
        }
    }

    static getTypes()
    {
        return MULTIPLE_TYPES;
    }

    static isValidPlatform(platform)
    {
        platform = platform.toLowerCase();
        return VALID_GAMES.hasOwnProperty(platform);
    }

    static isValidGameMode(platform, game)
    {
        platform = platform.toLowerCase();
        game = game.toLowerCase();
        return VALID_GAMES[platform]["normal"].includes(game) || VALID_GAMES[platform]["multiple"].includes(game);
    }

    static isMultipleGame(platform, game)
    {
        platform = platform.toLowerCase();
        game = game.toLowerCase();
        return VALID_GAMES[platform]["multiple"].includes(game);
    }
    
    static async getLeaderboardData(platform, game)
    {
        platform = platform.toLowerCase();
        game = game.toLowerCase();
        let self = this; // hack for promises xD
        
        return new Promise(async function(resolve, reject){
            if(!await self.isWebsiteReachable()){
                reject(new Error("Website is unreachable"));
                return;
            }
            if(!self.isValidPlatform(platform)){
                reject(new Error("Invalid platform"));
                return;
            }
            if(!self.isValidGameMode(platform, game)){
                reject(new Error("Invalid game mode"));
                return;
            }
            
            try {
                let html = await axios.get(`${BASE_URL}leaderboards/view_leaderboard.php?network=${platform}&game=${game}`);
                html = html.data;
                let data = parse(html),
                res;
                
                if(self.isMultipleGame(platform, game))
                {
                    res = {};
                    self.getTypes().forEach(function(type){
                        try {
                            let typeData = data.querySelector("#" + type).querySelector("table"),
                            size = Math.floor(typeData.childNodes.length / 2 - 1),
                            current = 3;
                            res[type] = [];
                            
                            for(let i = 0 ; i < size ; i++)
                            {
                                let top = parseInt(typeData.childNodes[current].childNodes[1].childNodes[0].rawText);
                                let name = typeData.childNodes[current].childNodes[3].childNodes[0].rawText;
                                let score = parseInt(typeData.childNodes[current].childNodes[5].childNodes[0].rawText);
                                
                                res[type].push({ top: top, name: name, score: score });
                                current = current + 2;
                            }
                        } catch(ex) {
                            return;
                        }
                    });
                }
                else {
                    data = data.querySelector("table");
                    let current = 3,
                    size = Math.floor(data.childNodes.length / 2 - 1);
                    res = [];
                    
                    for(let i = 0 ; i < size ; i++){
                        let top = parseInt(data.childNodes[current].childNodes[1].childNodes[0].rawText);
                        let name = data.childNodes[current].childNodes[3].childNodes[0].rawText;
                        let score = parseInt(data.childNodes[current].childNodes[5].childNodes[0].rawText);
                        
                        res.push({ top: top, name: name, score: score });
                        current = current + 2;
                    }
                }
                resolve(res);
            }
            catch(ex){
                reject(ex);
            }
        });
    }
}

module.exports = CubeCraftAPI;