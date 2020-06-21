var fightOrSkip = function() {
    // ask user if they'd like to fight or skip using function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    // conditional recursive function call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase(); //forces all input to be lower case
    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // || promptFight === "SKIP") removed because of the above toLowerCase
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skipp this fight.  Goodbye!");
            // subtract money from playerMoney for skipping, but don't let them go negative
            //playerInfo.playerMoney = playerInfo.money - 10;
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            // return true if user wants to leave
            return true;            
            //shop():
        }
    }
    return false; //not sure on this
}


var fight = function(enemy) {
    // Alert users that they are starting the round
    // (removed 3.2.7) window.alert("Welcome to Robot Gladiators!");

    //repeat and execute as long as the enemy robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask user if they'd liked to fight or run
        //var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
        // if user picks "skip" confirm and then stop the loop
        //if (promptFight === "skip" || promptFight === "SKIP") {
          // confirm user wants to skip
          //var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
          // if yes (true), leave fight
          //if (confirmSkip) {
            //window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerInfo.money for skipping
            //playerInfo.money = Math.max(0, playerInfo.money - 10);
            //console.log("playerInfo.money", playerInfo.money)
            //break;
          //}
        //}

        //replaces the above promptFight and its if statements
        //fightOrSkip();
        
        // ask user if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }
    
        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
        );
    
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + ' has died!');
    
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
    
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }
    
        // remove players's health by subtracting the amount set in the enemy.attack variable
        // adding random-ness
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );
    
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + ' has died!');
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
        }
      }

};


// function to start a new game
var startGame = function() {
    // reset player stat
    // playerInfo.health = 100;
    // playerInfo.attack = 10;
    // playerInfo.money = 10;
    playerInfo.reset();

    //fight(enemyRobot)
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round" + (i + 1));
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40, 60);
        fight(pickedEnemyObj);

        // if we're not at the last enemy in the array execute shop()
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            shop();
        }
    }    
    // causes it to play again; removed so endGame can function, function relocated inside endGame
    // startGame ();

    // after loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }


};

// shop function expresion
var shop = function() {
    // ask the player what they'd like to do
    var shopOptionPrompt = window.prompt ("Would you like to REFILL your health, Upgrade your attack, or Leave the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    // parseInt() is converting the strings in the above prompt to integers
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch (shopOptionPrompt) {
        //case "REFILL": //new case
        //changing cases ato be numbers
        case 1:
            //this replaces all below due to the objects created below for playerInfo
            playerInfo.refillHealth();
            //if (playerInfo.money >= 7) {
                //window.alert("Refilling player's health by 20 for 7 dollars.");
                // increase health and decrease money
                //playerInfo.health = playerInfo.health + 20;
                //playerInfo.money = playerInfo.money - 7;
            //}
            //else {
                //window.alert("You don't have enough money!");
            //}
            break;
        //case "UPGRADE":
        case 2:
            //this replaces all below due to the objects created
            playerInfo.upgradeAttack();
            //if (playerInfo.money >= 7) {
                //window.alert("Upgrade player's attack by 6 for 7 dollars.");
                //increase Attack and decrease money
                //playerInfo.attack = playerInfo.attack + 6;
                //playerInfo.money = playerInfo.money - 7;
            //}
            //else {
                //window.alert("You don't have enough money!")
            //}
            break;
        //case "LEAVE":
        case 3:
            window.alert("leaving the store.");
            // do nothing, so the function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to generate a random nubmeric valur
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

// function to set name
var getPlayerName = function() {
    var name = "";

    // **********************
    // Add Loop here with prompt and condition
    while (name === "" || name === null) {
        name = prompt("What is your Robot's name?")
    }
    // **********************

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }

        else {
            window.alert("You don't have enough money!");
        }
    }
};

// you can also log multiple values at once like this
// console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roberto", 
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
     },
     {
         name: "Robo Trumble",
        attack: randomNumber(10,14)
     }
];
//console.log(enemy.names);
//console.log(enemy.names[0]);
//console.log(enemy.names[1]);
//console.log(enemy.names[2]);
//console.log(enemyInfo.length);
//for(var i = 0; i < enemy.names.length; i++) {
    //console.log(enemy.names[i]);
    //console.log(i);
    //console.log(enemy.names[i] + " is at " + i + " index");
//}

// start the game when the page loads; this is a function call
startGame();

// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less



