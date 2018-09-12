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
}, 1500);

function scrapePlayers() {
  var players = document.querySelectorAll('.players tbody tr');

  for (var i = 0; i < players.length; i++) {
    var player = players[i].querySelectorAll('td');

    var opponent = '';
    if (player[1].querySelectorAll('.ysf-game-status a')[1]) {
      opponent = player[1].querySelectorAll('.ysf-game-status a')[1].innerText;
    } else {
      opponent = 'Bye';
    }

    let offset = (document.querySelectorAll('thead .Last th div')[3].innerText === 'Forecast' ? 1 : 0)

    var parsedPlayer = [
      player[1].querySelector('.name').innerText, // player name
      player[1].querySelector('.ysf-player-name span').innerText, // position
      opponent, // opponent
      player[3+offset].querySelector('div').innerText,  // owner
      player[4+offset].querySelector('div').innerText,  // gamesplayed
      player[6+offset].querySelector('div').innerText,  // points
      player[10+offset].querySelector('div').innerText, // pass yards
      player[11+offset].querySelector('div').innerText, // pass td's
      player[12+offset].querySelector('div').innerText, // interceptions
      player[13+offset].querySelector('div').innerText, // rush attempts
      player[14+offset].querySelector('div').innerText, // rush yards
      player[15+offset].querySelector('div').innerText, // rush td's
      player[16+offset].querySelector('div').innerText, // targets
      player[17+offset].querySelector('div').innerText, // receptions
      player[18+offset].querySelector('div').innerText, // reception yards
      player[19+offset].querySelector('div').innerText, // reception td's
      player[20+offset].querySelector('div').innerText, // return yards
      player[21+offset].querySelector('div').innerText, // return td's
      player[22+offset].querySelector('div').innerText, // 2pt conversions
      player[23+offset].querySelector('div').innerText  // fumbles lost
    ];

    if (parsedPlayer[5] === '0.00') {
      return true;
    }

    parsedPlayers.push(parsedPlayer.join('\t'));
  }

  return false;
}
