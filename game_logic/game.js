const inquirer = require('inquirer');
const { Trainer, Pokemon, Battle } = require('../pokemon-battle.js');

const charmeleon = new Pokemon(
  'charmeleon',
  100,
  30,
  'Chaaaar...MELEON',
  'Blaze',
  'fire'
);
const bulbasaur = new Pokemon(
  'bulbasaur',
  98,
  25,
  'Buuulbasaur',
  'raizor leaf',
  'grass'
);
const health = 100;
const squirtle = new Pokemon('squirtle', health, 23, 'SQUIRTLE', 'splash', 'water');
const mewtwo = new Pokemon('mewtwo', health, 40, 'hello', 'confusion', 'psychic');
const ash = new Trainer('Ash', [charmeleon, bulbasaur]);
const gary = new Trainer('Gary', [squirtle, mewtwo]);



let P1 = null;
let P2 = null;
let T1 = null;
let T2 = null;


/////QUESTIONS//////
let question1 = [
  {
    type: 'list',
    name: 'chooseTrainer',
    message: 'Please choose your trainer...',
    choices: [ash.name, gary.name]
  }
]
let activity = [
  {
    type: 'list',
    name: 'activity',
    message: 'What would you like to do?',
    choices: ['battle', 'catch pokemon']
  }
]
let battleOptions = [
  {
    type: 'list',
    name: 'battleOptions',
    message: '',
    choices: ['attack', 'swap pokemon']
  }
]
let catchQuestion = [
  {
    type: 'list',
    name: 'catchQuestion',
    message: `A wild ${charmeleon.name} appeared! What do you want to do?`,
    choices: ['Throw pokeball', 'Run']
  }
]


///////////

console.log('Welcome to Pokemon North!');



inquirer.prompt(question1).then(answers => {
  console.log(`you chose ${answers.chooseTrainer}`)
  if (answers.chooseTrainer === 'Ash') {
    T1 = ash;
    T2 = gary;
  } else {
    T1 = gary;
    T2 = ash;
  }

  function adventure() {
    inquirer.prompt(activity).then(answer => {
      if (answer.activity === 'battle') {
        let pokemonQuestion = [{ type: 'list', name: 'choosePokemon', message: '', choices: [T1.collection[0], T1.collection[1]] }];
        inquirer.prompt(pokemonQuestion).then(answer => {
          for (let i = 0; i < T1.collection.length; i++) {
            if (T1.collection[i].name === answer.choosePokemon) {
              P1 = T1.collection[i];
              P2 = T2.collection[0];
            }
          }
          console.log(`You chose ${answer.choosePokemon}. Your rival chose ${P2.name}. Let's battle!!!`);
          const newBattle = new Battle(T1, T2, P1, P2);

          function battleOption() {
            inquirer.prompt(battleOptions).then(answer => {
              if (answer.battleOptions === 'attack') {
                console.log(newBattle.fight());
                if (P1.health > 0 && P2.health > 0) {
                  console.log(newBattle.fight());
                }
                if (P2.health > 0 && P1.health > 0) {
                  return battleOption();
                } else {
                  P1.health = health;
                  P2.health = health;
                  return adventure();
                }
              }
            });
          }
          battleOption();
        });
      } else if (answer.activity === 'catch pokemon') {
        inquirer.prompt(catchQuestion).then(answer => {
          if (answer.catchQuestion === 'Throw pokeball') {
            console.log('Throw!!!');
            let rand = Math.floor(Math.random() * 10);
            // console.log(rand);
            if (rand > 5) {
              T1.catch(charmeleon);
              console.log(`You caught ${T1.collection[T1.collection.length - 1].name}! It was added to your collection!`);
            } else {
              console.log(`Oh no you missed! Charmeleon ran away!`);
              adventure();
            }
          }
          else if (answer.catchQuestion === 'Run') console.log('Run!!!');
          // console.log(answer.catchQuestion);
        });
        // T1.catch();
      }
    })
  }
  adventure();
});

