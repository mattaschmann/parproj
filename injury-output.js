/* global copy, $$ */
/* eslint no-alert:off */

let parsedPlayers = [];

scrapePlayers();

copy(parsedPlayers.join('\n'));
console.log('Finished!');

function scrapePlayers () {
  let players = $$('#gamedayscalltable tr:not(.Last)');

  players.forEach(row => {
    let player = row.querySelectorAll('td');

    var parsedPlayer = [
      player[0].querySelector('a.name').innerText.trim(),             // player name
      player[0].querySelector('.ysf-player-status').innerText.trim()  // player status
    ];

    if (parsedPlayer[1] !== 'Inactive') parsedPlayers.push(parsedPlayer.join('\t'));
  });
}
