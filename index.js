// Node.js Libraries
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Variables held in memory
var articles = [
  {title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque ligula eu mi gravida auctor. Aenean pellentesque nulla et nulla ultricies, eget pulvinar augue aliquam. Quisque urna velit, gravida sit amet dignissim tempor, viverra sed mauris. Sed sed enim quis felis fringilla volutpat. Vestibulum et suscipit lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non egestas nisl. Nam dapibus eleifend posuere. Quisque vehicula porttitor mi, eget imperdiet est gravida nec.'

+ '<br><br>Nullam quis eros sed elit faucibus efficitur. Duis risus mauris, cursus eleifend tincidunt eu, placerat eget nulla. Morbi a sem id magna ornare fringilla. Etiam ac sodales nibh. Donec bibendum condimentum mi at accumsan. Quisque quis nibh dictum, semper enim eu, gravida nisl. Aenean eu cursus nisl, eget euismod metus. Etiam feugiat erat feugiat felis commodo cursus. Duis lacinia sapien ac elementum aliquam. Pellentesque consectetur nisi eu lectus tristique pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque vestibulum euismod nulla, sed facilisis nisl feugiat nec.'

+ '<br><br>Curabitur interdum cursus dolor, sed ullamcorper velit volutpat vel. Proin lacinia leo turpis, eu dictum diam ullamcorper vel. Maecenas accumsan lacus ut ligula gravida, in dignissim turpis scelerisque. Praesent ac mollis est. Ut sed cursus nibh. Sed facilisis ac sem at tincidunt. In commodo tristique odio in lobortis. Morbi accumsan dignissim aliquam. Nullam gravida feugiat metus vitae sagittis.'

+ '<br><br>Cras sit amet sem felis. Quisque non sodales quam, id pretium nisi. Nullam mollis scelerisque sapien. Quisque vehicula purus eu facilisis finibus. Curabitur vehicula posuere magna, ac ultrices nibh feugiat et. Aliquam erat volutpat. Curabitur tempus pellentesque ipsum eu porttitor. Donec et sem eu magna tempor suscipit. Nulla facilisi. Nunc nec ultricies odio. Maecenas venenatis felis a sem ultrices aliquet. Duis ut luctus ante, eu pretium ipsum. Ut non bibendum felis. Etiam vitae felis in ipsum gravida vestibulum.'

+ '<br><br>Sed nec rutrum ex. Ut sed metus justo. Phasellus scelerisque suscipit sollicitudin. Morbi sed cursus sem. Donec ac ex facilisis, auctor sapien nec, ullamcorper purus. Nam mollis dapibus lorem, sed consequat tortor vulputate non. Ut massa lectus, vehicula ac varius sed, suscipit quis ipsum. Fusce condimentum mi a convallis tristique. Mauris leo sapien, fringilla a erat lobortis, suscipit varius justo. Nullam iaculis vel nisl ac dapibus. Nam non est odio. Praesent volutpat sagittis vulputate. Maecenas accumsan consequat orci maximus molestie.'},
  {title: 'Bacon Ipsum',
  body: 'Bacon ipsum dolor amet corned beef bresaola tenderloin, short ribs chicken ball tip shank picanha meatball. Leberkas turducken pancetta pork capicola cupim. Beef ribs rump spare ribs, tenderloin doner hamburger pig pork loin. Biltong beef shank andouille. Ribeye hamburger sausage boudin drumstick short ribs. Prosciutto rump pig chicken flank strip steak, doner pork belly t-bone capicola.'

+ '<br><br>Pancetta venison kevin filet mignon, porchetta pork loin pastrami andouille strip steak. Kevin pastrami biltong, turducken jowl chuck pork chop ball tip leberkas ham sausage tail beef chicken. T-bone spare ribs beef ribs, pig tenderloin flank tail. Shoulder spare ribs short ribs flank tenderloin meatball sirloin bacon sausage pork loin. Boudin pork chop shoulder bacon leberkas tri-tip, meatball shankle jowl doner short loin pancetta cupim. Filet mignon pork alcatra, shankle kevin ball tip capicola flank short loin meatloaf porchetta chicken shoulder.'

+ '<br><br>Pastrami shoulder chicken, tenderloin sausage jowl tail salami. Drumstick shoulder shank ball tip kielbasa andouille pork chop pastrami salami. Turkey short loin bresaola, doner pork chop tenderloin salami spare ribs fatback prosciutto boudin filet mignon. Porchetta filet mignon swine capicola. Porchetta leberkas ham, rump pastrami picanha tri-tip chuck ham hock sirloin meatloaf ball tip flank fatback hamburger. Ribeye flank porchetta chicken pork loin biltong frankfurter tongue meatloaf andouille kevin kielbasa. Cow shoulder chicken prosciutto kevin ham beef ribs shankle kielbasa pork chop sausage short loin short ribs.'

+ '<br><br>Biltong pork belly alcatra, sausage prosciutto tenderloin meatloaf ham flank. Hamburger biltong chuck spare ribs, bacon kielbasa sausage beef meatball doner leberkas landjaeger. Frankfurter chicken filet mignon salami corned beef ball tip. Pastrami andouille kevin, pork belly sirloin bresaola tri-tip frankfurter.'

+ '<br><br>Salami doner rump chicken chuck tongue, picanha capicola landjaeger tail ribeye ground round pork loin andouille. Salami beef t-bone, tongue pastrami picanha beef ribs tail meatball boudin biltong. Meatball turducken leberkas jowl pork. Short loin boudin meatball tri-tip pork chop cow filet mignon beef ribs. Kevin short loin cupim corned beef beef ribs porchetta turkey kielbasa prosciutto meatloaf.'},
  {title: 'Cat Ipsum', body: 'American shorthair mouser, cornish rex devonshire rex manx, but grimalkin. Turkish angora puma but birman but egyptian mau. Siamese cougar malkin yet kitten. Thai. Ocicat maine coon munchkin so panther for manx, for ocelot, manx. Himalayan. Burmese. Tom savannah. Malkin malkin panther malkin panther. Ragdoll siamese thai leopard ocicat. Savannah havana brown tom american bobtail. Tiger maine coon or egyptian mau persian, cougar cougar. American bobtail. Lynx cheetah sphynx american bobtail british shorthair for siamese for bobcat. Tomcat cheetah but cornish rex jaguar siamese for cougar tomcat. Lynx balinese or lynx donskoy but bombay so havana brown.'

+ '<br><br>Russian blue siamese norwegian forest. Thai. Savannah. Ocelot devonshire rex, but maine coon and savannah. Siberian donskoy. Egyptian mau. Bobcat balinese american bobtail ocelot persian manx. Leopard savannah, cougar, donskoy. Siamese.'

+ '<br><br>Thai siamese cheetah. Maine coon egyptian mau yet puma but cornish rex, devonshire rex. Panther leopard yet british shorthair siberian but balinese . Norwegian forest siberian and russian blue and norwegian forest or grimalkin and lynx. Ragdoll kitty. Kitty tiger yet ragdoll tiger scottish fold, so ocicat. Maine coon burmese. Russian blue puma yet tiger yet maine coon, tiger sphynx. Sphynx british shorthair burmese bombay. Himalayan ragdoll ocicat. Savannah cheetah, or leopard tiger for scottish fold. Himalayan tabby lion for sphynx panther yet kitten for persian.'

+ '<br><br>Sphynx abyssinian . Turkish angora thai yet munchkin egyptian mau yet kitten. Lynx himalayan and himalayan. Cornish rex turkish angora. Kitten singapura but balinese or maine coon so donskoy lynx for turkish angora. Norwegian forest cornish rex mouser but turkish angora american shorthair or lynx bengal. Havana brown lynx jaguar for norwegian forest. Bengal. Abyssinian bombay so bengal cougar for russian blue. Turkish angora bengal. American bobtail siberian for bombay so tom lynx. Egyptian mau. Singapura thai and balinese so norwegian forest. Manx birman so siamese for scottish fold devonshire rex scottish fold.'

+ '<br><br>Cougar egyptian mau puma. Birman cheetah ocelot and persian birman malkin, yet egyptian mau. Grimalkin donskoy singapura or cougar. Himalayan cornish rex or puma. Mouser mouser. Savannah tomcat. Lynx. Ocicat munchkin mouser and tom ocelot. Panther cheetah or abyssinian norwegian forest. Ocelot lion but panther egyptian mau, tabby tabby. Russian blue siamese so bobcat or abyssinian so abyssinian . Leopard leopard yet tabby. Egyptian mau burmese, bobcat or devonshire rex donskoy for tomcat yet lynx. Puma munchkin. Burmese bengal. Kitten lion. Tom thai kitten. Maine coon ocelot and thai. '},
  {title: 'riker ipsum',
  body: "Flair is what marks the difference between artistry and mere competence. Fate. It protects fools, little children, and ships named \"Enterprise.\" I am your worst nightmare! This should be interesting. Commander William Riker of the Starship Enterprise. I'll alert the crew. Then maybe you should consider this: if anything happens to them, Starfleet is going to want a full investigation. Computer, belay that order. Mr. Worf, you do remember how to fire phasers? What? We're not at all alike! Computer, lights up! Our neural pathways have become accustomed to your sensory input patterns. Mr. Worf, you sound like a man who's asking his friend if he can start dating his sister. That might've been one of the shortest assignments in the history of Starfleet."

  + "<br><br>About four years. I got tired of hearing how young I looked. What's a knock-out like you doing in a computer-generated gin joint like this? The look in your eyes, I recognize it. You used to have it for me. And blowing into maximum warp speed, you appeared for an instant to be in two places at once. Smooth as an android's bottom, eh, Data? Well, I'll say this for him - he's sure of himself. I've had twelve years to think about it. And if I had it to do over again, I would have grabbed the phaser and pointed it at you instead of them. Well, that's certainly good to know. Fear is the true enemy, the only enemy. I will obey your orders."

  + "<br><br>I will serve this ship as First Officer. And in an attack against the Enterprise, I will die with this crew. But I will not break my oath of loyalty to Starfleet. Some days you get the bear, and some days the bear gets you. Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody. The game's not big enough unless it scares you a little. I'll be sure to note that in my log. For an android with no feelings, he sure managed to evoke them in others."

  + "<br><br>We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Sorry, Data. Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody. Fate protects fools, little children and ships named Enterprise. I can't. As much as I care about you, my first duty is to the ship. You enjoyed that."

  + "<br><br>We finished our first sensor sweep of the neutral zone. Why don't we just give everybody a promotion and call it a night - 'Commander'? My oath is between Captain Kargan and myself. Your only concern is with how you obey my orders. Or do you prefer the rank of prisoner to that of lieutenant? I'm afraid I still don't understand, sir. I guess it's better to be lucky than good. Maybe we better talk out here; the observation lounge has turned into a swamp. When has justice ever been as simple as a rule book? How long can two people talk about nothing?"}
];

// mid-ware
app.set('view engine', 'ejs');

app.use( bodyParser.urlencoded({extended: false}) );

app.use(express.static(__dirname + '/views'));

// routes
app.get("/",function(req, res){
  res.render('index');
});

app.get("/articles", function(req, res){
  res.render('articles/index', {showArticles:articles});
});

app.get("/articles/new", function(req, res){
  res.render('articles/new');
  articles.push();
});

app.post('/articles/new', function(req, res){
	articles.push(req.body);

	res.redirect('/articles');
});

app.get("/articles/:index", function(req, res){
  var articleIndex = parseInt(req.params.index);
  res.render('articles/show', {thisArticle:articles[articleIndex]});
});

// listen
app.listen(3000);