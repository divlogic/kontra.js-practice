import kontra, { Sprite, init, GameLoop } from 'kontra';

const { canvas } = init();

kontra.initKeys();

const ship = Sprite({
  x: 300,
  y: 300,
  radius: 6,
  render() {
    if (this.context != null) {
      this.context.strokeStyle = 'white';
      this.context.beginPath();
      this.context.moveTo(-3, -5);
      this.context.lineTo(12, 0);
      this.context.lineTo(-3, 5);
      this.context.closePath();
      this.context.stroke();
    }
  },
  update() {
    if (this.rotation != null) {
      if (kontra.keyPressed(['arrowleft', 'a'])) {
        this.rotation = this.rotation + kontra.degToRad(-4);
      } else if (kontra.keyPressed(['arrowright', 'd'])) {
        this.rotation = this.rotation + kontra.degToRad(4);
      }
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);
      if (kontra.keyPressed(['arrowkeyup', 'w'])) {
        this.ddx = cos * 0.05;
        this.ddy = sin * 0.05;
      } else {
        this.ddx = 0;
        this.ddy = 0;
      }
      this.advance();
      if (this.velocity.length() > 5) {
        if (this.dx != null) this.dx *= 0.95;
        if (this.dy != null) this.dy *= 0.95;
      }
    }
  },
});

const sprites: Sprite[] = [];
sprites.push(ship);

function createAsteroid(): void {
  const asteroid = Sprite({
    type: 'asteroid',
    x: 100,
    y: 100,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    radius: 30,
    render() {
      if (this.context != null) {
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.context.stroke();
      }
    },
  });
  sprites.push(asteroid);
}

for (let i = 0; i < 4; i++) {
  createAsteroid();
}

const loop = GameLoop({
  update: function () {
    sprites.forEach((sprite) => {
      // sprite is beyond the left edge
      const radius: number = sprite.radius;
      if (sprite.x < -radius) {
        sprite.x = canvas.width + radius;
      } else if (sprite.x > canvas.width + radius) {
        // sprite is beyond the right edge
        sprite.x = 0 - radius;
      }
      // sprite is beyond the top edge
      if (sprite.y < -radius) {
        sprite.y = canvas.height + radius;
      } else if (sprite.y > canvas.height + radius) {
        // sprite is beyond the bottom edge
        sprite.y = -radius;
      }
      sprite.update();
    });
  },
  render: function () {
    sprites.forEach((sprite) => {
      sprite.render();
    });
  },
});

loop.start();
