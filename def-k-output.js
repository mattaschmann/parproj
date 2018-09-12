var my$ = $;
var myCopy = copy;

var parsedPlayers = [];

var $nextButton = $('.pagingnav .last a');

scrapePlayers();
$nextButton.click();

var interval = setInterval(function() {
  var exitEarly = scrapePlayers();

  $nextButton = my$('.pagingnav .last a');
  if (exitEarly || $nextButton === null) {
    clearInterval(interval);
    interval = null;

    myCopy(parsedPlayers.join('\n'));
    console.log('Finished!');
  } else {
    $nextButton.click();
  }
}, 1000);

function scrapePlayers() {
  var players = document.querySelectorAll('.players tbody tr');

  for (var i = 0; i < players.length; i++) {
    var player = players[i].querySelectorAll('td');

    var owner = '';
    if (player[3].querySelector('a')) {
      owner = player[3].querySelector('a').innerText;
    } else {
      owner = player[3].querySelector('div').innerText;
    }

    var opponent = '';
    if (player[1].querySelectorAll('.ysf-game-status a')[1]) {
      opponent = player[1].querySelectorAll('.ysf-game-status a')[1].innerText;
    } else {
      opponent = 'Bye';
    }

    var parsedPlayer = [
      player[1].querySelector('.name').innerText, // player name
      player[1].querySelector('.ysf-player-name span').innerText, // position
      opponent, // opponent
      owner, // owner
      player[4].querySelector('div').innerText, // gamesplayed
      player[6].querySelector('div').innerText // points
    ];

    if (parsedPlayer[5] === '0.00') {
      return true;
    }

    parsedPlayers.push(parsedPlayer.join('\t'));
  }

  return false;
}
