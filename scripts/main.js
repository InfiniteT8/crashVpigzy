

// Setup Vars & Player Elements
var playerHealth = $('#playerHealth'),
    attackBTN = $('#personAttack'),
    damage;



// Player Constructor
var Player = function (options) {
  var options = options || {};
  this.name = options.name;
  this.health = 100;
  this.attack = function (target) {
    process_attack(this, target);
  };
  this.elem = options.elem;
};


// Monster Constructor
var Monster = function (options) {
  var options = options || {};
  this.name = options.name;
  this.health = 100;
  this.elem = options.elem;
};


// Player Instance
var crash = new Player ({ 
  name: 'Crash',
  elem: $('.player')
});

// Monster Instances
var evilPiglet = new Monster ({
  name: 'Evil Piglet',
  elem: $('.monster')
});




// Player Attack Action
attackBTN.on('click', function () {
  crash.attack(evilPiglet);
});

// Function to attack a Monster
// This function should be broken down a little bit more, but you get the point.
var process_attack = function (attacker, attackee) {

  // Reset our Attack Button
  attackBTN.prop('disabled', false).text('Attack');

  // Generate a new damage value each time
  damage = _.random(3, 27);

  // Lower the attackee's health
  attackee.health -= damage;

  // If Attackee is still alive, decrease health!
  if (attackee.health > 0) {

    // Update the individual attacked's health visually
    attackee.elem.find('input').val(attackee.health);
  
    // When we attack a monster, he fights back
    if (attackee instanceof Monster) {
      console.log('You were attacked back');
      attackBTN.prop('disabled', true).text('Waiting...');
      _.delay(process_attack, 1000, attackee, attacker);
    }

  } else {

    if (attackee instanceof Player) {
      // Game Over!!
      $('body').empty().css('background', 'url(http://goo.gl/0fmNnb)');
    } else {
      // Winner!!
      $('body').empty().css('background', 'url(../images/winner.gif)');
    }

  }
};