import kontra from 'kontra';

const {
    init,
    Sprite,
    GameLoop
} = kontra;

const {
    canvas, context
} = init();

const sprite= Sprite({
    x: 100,
    y: 80,
    color: 'red',
    width: 20,
    height: 40,
    dx: 2

});

const asteroid = Sprite({
    type: 'asteroid',
    x: 100,
    y: 100,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    radius: 30,
    color: 'orange',
    render() {
        if (this.context) {
            this.context.strokeStyle = 'white';
            this.context.beginPath();
            this.context.arc(0, 0, this.radius, 0, Math.PI*2);
            this.context.stroke();
        }
    },
});

const loop = GameLoop({
    update: function(){
        sprite.update();
        asteroid.update();

        if (sprite.x > canvas.width - 300) {
            sprite.x = -sprite.width;
        }

        // asteroid is beyond the left edge
        if (asteroid.x < -asteroid.radius) {
            asteroid.x = canvas.width + asteroid.radius;
            console.log('asteroid action 1');
        }
        // asteroid is beyond the right edge
        else if (asteroid.x > canvas.width + asteroid.radius) {
            asteroid.x = 0 - asteroid.radius;
            console.log('asteroid action 2');
        }
        // asteroid is beyond the top edge
        if (asteroid.y < -asteroid.radius) {
            asteroid.y = canvas.height + asteroid.radius;
            console.log('asteroid action 3');
        }
        // asteroid is beyond the bottom edge
        else if (asteroid.y > canvas.height + asteroid.radius) {
            asteroid.y = -asteroid.radius;
            console.log('asteroid action 4');
        }
    },
    render: function(){
        asteroid.render();
        sprite.render();
    }
});

loop.start();