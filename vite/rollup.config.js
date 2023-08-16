import kontra from 'rollup-plugin-kontra';

export default {
  entry: 'entry.js',
  dest: 'bundle.js',
  plugins: [
    kontra({
      gameObject: {
        // enable only velocity and rotation functionality
        velocity: true,
        rotation: true,
        acceleration: true,
        rotation: true,
        ttl: true,
        velocity: true,
      },
      vector: {
        // enable vector length functionality
        length: true,
      },
      // turn on debugging
      debug: false,
    }),
  ],
};
