/* global copy, $$ */
/* eslint no-alert:off */

let parsedPlayers = [];

let $callButton = $('.navlist .last a');

scrapePlayers();
$callButton.click();

copy(parsedPlayers.join('\n'));
alert('Finished!');

function scrapePlayers () {
  let players = $$('#gamedayscalltable tr:not(.Last)');

  players.forEach(row => {
    let player = row.querySelectorAll('td');

    var parsedPlayer = [
      player[0].querySelector('a.name').innerText.trim(),             // player name
      player[0].querySelector('.ysf-player-status').innerText.trim()  // player status
    ];

    parsedPlayers.push(parsedPlayer.join('\t'));
  });
}