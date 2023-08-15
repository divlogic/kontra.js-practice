import { Sprite, init, GameLoop } from 'kontra'

const {
  canvas
} = init()

const sprite = Sprite({
  x: 100,
  y: 80,
  color: 'red',
  width: 20,
  height: 40,
  dx: 2

})
const asteroids: Sprite[] = []

function createAsteroid (): void {
  const asteroid = Sprite({
    type: 'asteroid',
    x: 100,
    y: 100,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    radius: 30,
    render () {
      if (this.context != null) {
        this.context.strokeStyle = 'white'
        this.context.beginPath()
        this.context.arc(0, 0, this.radius, 0, Math.PI * 2)
        this.context.stroke()
      }
    }
  })
  asteroids.push(asteroid)
}

for (let i = 0; i < 4; i++) {
  createAsteroid()
}
console.log(asteroids)

const loop = GameLoop({
  update: function () {
    sprite.update()

    if (sprite.x > canvas.width - 300) {
      sprite.x = -sprite.width
    }
    asteroids.forEach(asteroid => {
    // asteroid is beyond the left edge
      const radius: number = asteroid.radius
      if (asteroid.x < -radius) {
        asteroid.x = canvas.width + radius
        console.log('asteroid action 1')
      } else if (asteroid.x > canvas.width + radius) {
      // asteroid is beyond the right edge
        asteroid.x = 0 - radius
        console.log('asteroid action 2')
      }
      // asteroid is beyond the top edge
      if (asteroid.y < -radius) {
        asteroid.y = canvas.height + radius
        console.log('asteroid action 3')
      } else if (asteroid.y > canvas.height + radius) {
      // asteroid is beyond the bottom edge
        asteroid.y = -radius
        console.log('asteroid action 4')
      }
      asteroid.update()
    })
  },
  render: function () {
    asteroids.forEach(asteroid => {
      asteroid.render()
    })
    sprite.render()
  }
})

loop.start()
