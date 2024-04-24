var juego=new Phaser.Game(847,847,Phaser.CANVAS,'escenario');
var fondoJuego;
var persona;
var teclaDerecha;
var teclaIzquierda;
var teclaArriba;
var teclaAbajo;
var nuevo;
var enemigos;
var balas;
var tiempoBala=0;
var botonDisparo;
var soundShoot;
var enemigosmorir=0;

var inicio = {
	preload: function(){
		juego.load.image('fondo','img/fondo2.jpg');
		juego.load.image('boton','img/boton.png');
	},
	create: function(){
		fondoJuego=juego.add.tileSprite(0,0,847,847,'fondo');
		var botonInicio = juego.add.button(juego.world.centerX, juego.world.centerY, 'boton', this.iniciarJuego, this);
        botonInicio.anchor.setTo(0.5);
		 
	},
	iniciarJuego: function() {
        juego.state.start('nivel1');
    }
};
var nivel1={
	preload: function(){
		juego.load.image('fondo','img/fondo.png');
		juego.load.spritesheet('animacion','img/personaje1.png',256,256);
		juego.load.spritesheet('enemigo','img/enemigo.png',128,128);
		juego.load.image('laser','img/laser.png');
		juego.load.audio('disparo','sounds/disparo.wav');
	},
	create: function(){
		enemigosmorir=0;
		fondoJuego=juego.add.tileSprite(0,0,847,847,'fondo');
		soundShoot = juego.add.audio('disparo');

		nuevo=juego.add.sprite(300,300,'animacion');
		nuevo.animations.add('movimiento',[0,1,2,3,4,5],10,true);
		nuevo.x=100;
		nuevo.y=500;

		botonDisparo=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		balas=juego.add.group();
		balas.enableBody=true;
		balas.physicsBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(20,'laser');
		balas.setAll('anchor.x',-2);
		balas.setAll('anchor.y',1);
		balas.setAll('outOfBoundsKill',true);
		balas.setAll('checkWorldBounds',true);

		enemigos=juego.add.group();
		enemigos.enableBody=true;
		enemigos.physicsBodyType=Phaser.ARCADE;
		for(var y=0;y<3;y++){
			for(var x=0;x<3;x++){
				var enemig=enemigos.create(x*110,y*110,'enemigo');
				enemig.anchor.setTo(0.5);
			}
		}
		enemigos.x=100;
		enemigos.y=100;
		var animacion= juego.add.tween(enemigos).to(
			{x:600},
			2000,Phaser.Easing.Linear.None,true,0,2000,true
			);

		teclaDerecha=juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		teclaIzquierda=juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		teclaArriba=juego.input.keyboard.addKey(Phaser.Keyboard.UP);
		teclaAbajo=juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	},
	update: function(){
		fondoJuego.tilePosition.x-=1;

		if(teclaDerecha.isDown){
			nuevo.x++;
			nuevo.animations.play('movimiento');
		}
		if(teclaIzquierda.isDown){
			nuevo.x--;
			nuevo.animations.play('movimiento');
		}
		if(teclaArriba.isDown){
			nuevo.y--;
			nuevo.animations.play('movimiento');
		}
		if(teclaAbajo.isDown){
			nuevo.y++;
			nuevo.animations.play('movimiento');
		}

		var bala;
		if(botonDisparo.isDown){
			if(juego.time.now>tiempoBala){
				bala=balas.getFirstExists(false);
			}
			if (bala) {
				bala.reset(nuevo.x,nuevo.y);
				bala.body.velocity.y=-300;
				tiempoBala=juego.time.now+100;
				soundShoot.play();
			}
		}
		juego.physics.arcade.overlap(balas, enemigos, colisionNivel1, null, this);
	}
};
var nivel2 ={
	preload: function(){
		juego.load.image('fondo','img/fondo.png');
		juego.load.spritesheet('animacion','img/personaje2.png',256,256);
		juego.load.spritesheet('enemigo','img/enemigo.png',128,128);
		juego.load.image('laser','img/laser.png');
		juego.load.audio('disparo','sounds/disparo.wav');
		juego.load.image('ganador', 'img/ganador.jpg');
	},
	create: function(){
		enemigosmorir=0;
		fondoJuego=juego.add.tileSprite(0,0,847,847,'fondo');
		soundShoot = juego.add.audio('disparo');

		nuevo=juego.add.sprite(300,300,'animacion');
		nuevo.animations.add('movimiento',[0,1,2,3,4,5],10,true);
		nuevo.x=100;
		nuevo.y=500;

		botonDisparo=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		balas=juego.add.group();
		balas.enableBody=true;
		balas.physicsBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(20,'laser');
		balas.setAll('anchor.x',-2);
		balas.setAll('anchor.y',1);
		balas.setAll('outOfBoundsKill',true);
		balas.setAll('checkWorldBounds',true);

		enemigos=juego.add.group();
		enemigos.enableBody=true;
		enemigos.physicsBodyType=Phaser.ARCADE;
		for(var y=0;y<3;y++){
			for(var x=0;x<3;x++){
				var enemig=enemigos.create(x*110,y*110,'enemigo');
				enemig.anchor.setTo(0.5);
			}
		}
		enemigos.x=100;
		enemigos.y=100;
		var animacion= juego.add.tween(enemigos).to(
			{x:600},
			2000,Phaser.Easing.Linear.None,true,0,2000,true
			);

		teclaDerecha=juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		teclaIzquierda=juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		teclaArriba=juego.input.keyboard.addKey(Phaser.Keyboard.UP);
		teclaAbajo=juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	},
	update: function(){
		fondoJuego.tilePosition.x-=1;

		if(teclaDerecha.isDown){
			nuevo.x++;
			nuevo.animations.play('movimiento');
		}
		if(teclaIzquierda.isDown){
			nuevo.x--;
			nuevo.animations.play('movimiento');
		}
		if(teclaArriba.isDown){
			nuevo.y--;
			nuevo.animations.play('movimiento');
		}
		if(teclaAbajo.isDown){
			nuevo.y++;
			nuevo.animations.play('movimiento');
		}

		var bala;
		if(botonDisparo.isDown){
			if(juego.time.now>tiempoBala){
				bala=balas.getFirstExists(false);
			}
			if (bala) {
				bala.reset(nuevo.x,nuevo.y);
				bala.body.velocity.y=-300;
				tiempoBala=juego.time.now+100;
				soundShoot.play();
			}
		}
		juego.physics.arcade.overlap(balas, enemigos, colisionNivel2, null, this);
	}
};

var finJuego = {
    create: function() {
        juego.add.image(0, 0, 'ganador');
    }
};

function colisionNivel1(bala, enemigo) {
    bala.kill();
    enemigo.kill();
    enemigosmorir++;
    if (enemigosmorir === 9) {
        enemigosmorir = 0;  // Resetting the counter is crucial here.
        juego.state.start('nivel2');  // Make sure this points to 'nivel2'.
    }
}

function colisionNivel2(bala, enemigo) {
    bala.kill();
    enemigo.kill();
    enemigosmorir++;
    if (enemigosmorir === 9) {
        juego.state.start('finJuego');  // This should point to 'finJuego'.
    }
}

juego.state.add('inicio', inicio);
juego.state.add('nivel1', nivel1);
juego.state.add('nivel2', nivel2);
juego.state.add('finJuego', finJuego);
juego.state.start('inicio'); 