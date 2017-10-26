var my$ = $;
var myCopy = copy;

var parsedPlayers = [];

scrapePlayers();

function scrapePlayers() {
  var players = document.querySelectorAll('.infinite-scroll-list tr');

  for (var i = 0; i < players.length; i++) {
    var player = players[i].querySelectorAll('td');


    var parsedPlayer = [
      player[2].querySelector('a').innerText, // name
      player[0].innerText, // position
      player[6].innerText  // cost
    ];

    parsedPlayers.push(parsedPlayer.join('\t'));
  }

  myCopy(parsedPlayers.join('\n'));

  return false;
}
