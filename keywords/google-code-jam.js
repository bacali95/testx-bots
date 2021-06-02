const fs = require('fs');

module.exports = {
  'save player': async (args, context) => {
    const players = JSON.parse(fs.readFileSync(`./tmp/players.json`).toString());
    players[`${args.handle}`] = parseInt(args.rank);
    fs.writeFileSync(`./tmp/players.json`, JSON.stringify(players, null, 2));
  }
}
