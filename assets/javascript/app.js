$( document ).ready(function() {
//============================[Starting Page]================================
let gameStart = false;
let roundCount = 1;

const gameState = function() {
  if (gameStart === false && roundCount <= 10) {
    $(".pregame").show();
    $(".main").hide();
    $(".results").hide();
    $(".pokeStats").hide();
  } else if (gameStart === true && roundCount <= 10) {
      if (buttonClicked === false) {
        $(".main").show();
        $(".pregame").hide();
        $(".pokeStats").hide();
      } else if (buttonClicked === true) {
        $(".main").hide();
        $(".pokeStats").show();
      };
  } else if (gameStart === true && roundCount === 11) {
    gameEnd();
    gameStart = false;
  };
};

let intervalId;
let timeCount;
const timer = () => {
  timeCount = 30;
  $(".timer").html(`<h2>Time Remaining: ${timeCount}</h2>`);
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
};

const decrement = () => {
  timeCount--;
  $(".timer").html(`<h2>Time Remaining: ${timeCount}</h2>`);
  if (timeCount === 0) {
    stop();
    $(".comment").html(`<p>You ran out of time!</p>`);
    $(".pokeImg").removeAttr("id");
    buttonClicked = true;
    wrongCounter++;
    console.log("wrong: " + wrongCounter);
    displayer();
    setTimeout(function() {
      gameState();
      if (roundCount <= 10) {
        pokeStats();
      };
    }, 1000 * 2);
  };
};

const stop = () => {
  clearInterval(intervalId);
};

gameState();

$(".startB").on("click", function() {
  gameStart = true;
  gameState();
  timer();
  //timer start 
});
// some form that lets you check pokemon generations you want

//=============================[Main Game]====================================

  // pokemon full name list ordered (warning, 808 string long)
  const pokeList = ["spacer", "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch’d", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-Oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys", "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio", "Luxray", "Budew", "Roserade", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Burmy", "Wormadam", "Mothim", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Mismagius", "Honchkrow", "Glameow", "Purugly", "Chingling", "Stunky", "Skuntank", "Bronzor", "Bronzong", "Bonsly", "Mime Jr.", "Happiny", "Chatot", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Hippopotas", "Hippowdon", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Finneon", "Lumineon", "Mantyke", "Snover", "Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior", "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega", "Leafeon", "Glaceon", "Gliscor", "Mamoswine", "Porygon-Z", "Gallade", "Probopass", "Dusknoir", "Froslass", "Rotom", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", "Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog", "Lillipup", "Herdier", "Stoutland", "Purrloin", "Liepard", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Munna", "Musharna", "Pidove", "Tranquill", "Unfezant", "Blitzle", "Zebstrika", "Roggenrola", "Boldore", "Gigalith", "Woobat", "Swoobat", "Drilbur", "Excadrill", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Tympole", "Palpitoad", "Seismitoad", "Throh", "Sawk", "Sewaddle", "Swadloon", "Leavanny", "Venipede", "Whirlipede", "Scolipede", "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Basculin", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan", "Maractus", "Dwebble", "Crustle", "Scraggy", "Scrafty", "Sigilyph", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Trubbish", "Garbodor", "Zorua", "Zoroark", "Minccino", "Cinccino", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Ducklett", "Swanna", "Vanillite", "Vanillish", "Vanilluxe", "Deerling", "Sawsbuck", "Emolga", "Karrablast", "Escavalier", "Foongus", "Amoonguss", "Frillish", "Jellicent", "Alomomola", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Klink", "Klang", "Klinklang", "Tynamo", "Eelektrik", "Eelektross", "Elgyem", "Beheeyem", "Litwick", "Lampent", "Chandelure", "Axew", "Fraxure", "Haxorus", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Stunfisk", "Mienfoo", "Mienshao", "Druddigon", "Golett", "Golurk", "Pawniard", "Bisharp", "Bouffalant", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Larvesta", "Volcarona", "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Reshiram", "Zekrom", "Landorus", "Kyurem", "Keldeo", "Meloetta", "Genesect", "Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Fletchling", "Fletchinder", "Talonflame", "Scatterbug", "Spewpa", "Vivillon", "Litleo", "Pyroar", "Flabébé", "Floette", "Florges", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Espurr", "Meowstic", "Honedge", "Doublade", "Aegislash", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Inkay", "Malamar", "Binacle", "Barbaracle", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Helioptile", "Heliolisk", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink", "Goomy", "Sliggoo", "Goodra", "Klefki", "Phantump", "Trevenant", "Pumpkaboo", "Gourgeist", "Bergmite", "Avalugg", "Noibat", "Noivern", "Xerneas", "Yveltal", "Zygarde", "Diancie", "Hoopa", "Volcanion", "Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Grubbin", "Charjabug", "Vikavolt", "Crabrawler", "Crabominable", "Oricorio", "Cutiefly", "Ribombee", "Rockruff", "Lycanroc", "Wishiwashi", "Mareanie", "Toxapex", "Mudbray", "Mudsdale", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Salandit", "Salazzle", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Oranguru", "Passimian", "Wimpod", "Golisopod", "Sandygast", "Palossand", "Pyukumuku", "Type: Null", "Silvally", "Minior", "Komala", "Turtonator", "Togedemaru", "Mimikyu", "Bruxish", "Drampa", "Dhelmise", "Jangmo-o", "Hakamo-o", "Kommo-o", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow", "Poipole", "Naganadel", "Stakataka", "Blacephalon", "Zeraora"];

  // selects 4 different pokemon numbers
  let pokeNum = [];
  const pokePicker = function() {
    pokeNum = [];
    for (let i = 0; i < 4; i++) {
      // pokeNum.push(1 + Math.floor(Math.random()* 807)); //for all pokemon!
      pokeNum.push(1 + Math.floor(Math.random()* 151)); //for testing
    };
  };

  // selects which one is the correct answer for the round
  let selector = [];
  const roundSelect = () => {
    selector = [];
    let picked = Math.floor(Math.random()* 4);
    for (let i = 0; i < 4; i++) {
      if (picked === i) {
        selector.push(true);
      } else {
        selector.push(false);
      };
    };
  };

  const multipleChoice = () => {
    $(".answer1").text(pokeList[pokeNum[0]]);
    $(".answer2").text(pokeList[pokeNum[1]]);
    $(".answer3").text(pokeList[pokeNum[2]]);
    $(".answer4").text(pokeList[pokeNum[3]]);
  };

  let buttonClicked = false;
  let roundAnswer;
  // silhouette displayer
  const displayer = function () {
    for (i = 0; i<selector.length; i++) {
      if (buttonClicked === false && selector[i]) {
        $(".pokePic").html(`<img class="pokeImg" src="https://pokeres.bastionbot.org/images/pokemon/${pokeNum[i]}.png"></img>`);
        // in case of 404 error, replace pokePic with backup URL
        window.addEventListener("error", function() {
          $(".pokePic").html(`<img class="pokeImg" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeNum[i]}.png"></img>`);
        }, true);
        roundAnswer = pokeNum[i];
      } else if (buttonClicked === true && selector[i]) {
        $(".comment").append(`The pokemon is ${pokeList[pokeNum[i]]}\!`);
      };
      };
    };

  let correctCounter = 0;
  let wrongCounter = 0;

  // function for resetting the game state for each round 
  const nextRound = () => {
    pokePicker();
    roundSelect();
    multipleChoice();
      if (buttonClicked === true) {
        buttonClicked = false;
      }
    displayer();
    $(".comment").text("");
    $(".pokeImg").attr("id", "silhouette");
  };

  const gameCounter = () => {
    if (roundCount <= 10) {
      roundCount++;
      nextRound();
      console.log("round: " + roundCount);
    };
  };

  //game start
  nextRound();
  // Guess event
  $(".answer").on("click", function() {
    if (buttonClicked === false) {
      buttonClicked = true;
      stop();
      $(".pokeImg").removeAttr("id"); //remember to add silhouette back for next question
      let choice = parseInt($(this).attr("id"));
      if (selector[choice]) {
        $(".comment").html(`<p>Correct!<p>`);
        correctCounter++;
        console.log("right: " + correctCounter);
      } else {
        $(".comment").html(`<p>You are wrong!</p>`);
        wrongCounter++;
        console.log("wrong: " + wrongCounter);
      };
      displayer();
      // timer that resets everything, increases turn count by 1, and makes next question appear
      setTimeout(function() {
        gameState();
        pokeStats();
      }, 1000 * 2);
    };
  });

//=========================[PokeDex]================================
 

// capitalization for API request data
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// page for displaying pokestats as pulled from API
const pokeStats = function() {
  setTimeout(function() {
    buttonClicked = false;
    gameCounter();
    nextRound();
  }, 1000 * 2);
  setTimeout(function() {
    gameState();
    $(".pokemonName").empty();
    $(".evolution").empty();
    $(".generation").empty();
    $(".infoText").empty();
    timer();
  }, 1000 * 2);
  let queryURL = "https://pokeapi.co/api/v2/pokemon-species/" + roundAnswer;
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      // console.log(response.name);
      // console.log(response.evolves_from_species.name);
      // console.log(response.flavor_text_entries[2].flavor_text);
      let infoText;
      let gen = response.generation.name;
      $(".generation").text(`From: ${gen.capitalize()}`);
      $(".pokemonName").text(`It's ${pokeList[roundAnswer]}!`);
      //displays pre-evolution
      if (response.evolves_from_species) {
        preEvolution = response.evolves_from_species.name;
        $(".evolution").text(`Evolves From: ${preEvolution.capitalize()}`);
      } else {
        $(".evolution").text("Evolves From: None");
      };
      // makes sure only english infotext is displayed
      for (let i = 0; i<response.flavor_text_entries.length; i++) {
        if (response.flavor_text_entries[i].language.name === "en") {
          infoText = response.flavor_text_entries[i].flavor_text;
          $(".infoText").text(infoText);
          return;
        };
      };
      
      
    }); 
};
//==========================[Results and Reset]==================================
const gameEnd = function() {
  stop();
  $(".main").hide();
  $(".pokeStats").hide();
  $(".results").show();
  $(".finalScore").append(`<h4>Correct: ${correctCounter} times</h4>`);
  $(".finalScore").append(`<h4>Incorrect: ${wrongCounter} times</h4>`);
  $(".profOak").append(`<img src="./assets/images/Professor_Oak.png"></img>`)
  $(".rating").html(`<h3>Professor Oak's Rating</h3>`);
  setTimeout(function() {$(".rating").html(`<h3>Professor Oak's Rating.</h3>`)}, 1000 * 2);
  setTimeout(function() {$(".rating").html(`<h3>Professor Oak's Rating..</h3>`)}, 1000 * 3);
  setTimeout(function() {$(".rating").html(`<h3>Professor Oak's Rating...</h3>`)}, 1000 * 4);
  const ratingQuotes = 
    {0: "Are you a Boy or a Girl?",
    1: "You still have lots to do. Look for Pokémon in grassy areas!",
    2: "You still need more Pokémon knowledge!",
    3: "You still need more Pokémon knowledge!",
    4: "You're trying--I can see that.",
    5: "You're on the right track!",
    6: "You've proven yourself capable. There's nothing to worry about.",
    7: "Good, you're trying hard!",
    8: "Outstanding! You've become a real pro at this!",
    9: "Magnificent! You could become a Pokémon professor right now!",
    10: "I have nothing left to say! You're the authority now!",
    };
  setTimeout(function() {
    $(".rating").append(ratingQuotes[correctCounter]);
  }, 1000 * 5);
  // add a reset button! empties out all divs, sets counter back to 1, turns button states back
};










//===============================================================
//doc.ready close tag
});