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
    alert('Finished!');
  } else {
    $nextButton.click();
  }
}, 1500);

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
      player[4].querySelector('div').innerText,  // gamesplayed
      player[6].querySelector('div').innerText,  // points
      player[10].querySelector('div').innerText, // pass yards
      player[11].querySelector('div').innerText, // pass td's
      player[12].querySelector('div').innerText, // interceptions
      player[13].querySelector('div').innerText, // rush attempts
      player[14].querySelector('div').innerText, // rush yards
      player[15].querySelector('div').innerText, // rush td's
      player[16].querySelector('div').innerText, // targets
      player[17].querySelector('div').innerText, // receptions
      player[18].querySelector('div').innerText, // reception yards
      player[19].querySelector('div').innerText, // reception td's
      player[20].querySelector('div').innerText, // return yards
      player[21].querySelector('div').innerText, // return td's
      player[22].querySelector('div').innerText, // 2pt conversions
      player[23].querySelector('div').innerText  // fumbles lost
    ];

    if (parsedPlayer[5] === '0.00') {
      return true;
    }

    parsedPlayers.push(parsedPlayer.join('\t'));
  }

  return false;
}
