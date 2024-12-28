Sure, here's a production-ready code for a Leaderboard feature in a Phaser.js game, following best practices and including comments and documentation.

```javascript
/**
 * @file leaderboard.js
 * @author Your Name
 * @description Implements the Leaderboard feature for a Phaser.js game.
 */

/**
 * @class Leaderboard
 * @description Manages the game's leaderboard functionality.
 */
class Leaderboard {
  /**
   * @constructor
   * @param {Phaser.Scene} scene - The current scene instance.
   * @param {Object} config - Configuration options for the leaderboard.
   * @param {number} config.maxEntries - Maximum number of entries to display.
   * @param {string} config.storageKey - Key to use for storing leaderboard data in localStorage.
   */
  constructor(scene, config) {
    this.scene = scene;
    this.maxEntries = config.maxEntries || 10;
    this.storageKey = config.storageKey || 'leaderboard';
    this.entries = this.loadEntries();
  }

  /**
   * @method loadEntries
   * @description Loads the leaderboard entries from localStorage.
   * @returns {Array} An array of leaderboard entries.
   */
  loadEntries() {
    try {
      const entries = JSON.parse(localStorage.getItem(this.storageKey)) || [];
      return entries.slice(0, this.maxEntries);
    } catch (error) {
      console.error('Error loading leaderboard entries:', error);
      return [];
    }
  }

  /**
   * @method saveEntries
   * @description Saves the leaderboard entries to localStorage.
   */
  saveEntries() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
    } catch (error) {
      console.error('Error saving leaderboard entries:', error);
    }
  }

  /**
   * @method addEntry
   * @description Adds a new entry to the leaderboard.
   * @param {string} name - The player's name.
   * @param {number} score - The player's score.
   * @param {number} time - The completion time in milliseconds.
   */
  addEntry(name, score, time) {
    const newEntry = { name, score, time };
    this.entries.push(newEntry);
    this.entries.sort((a, b) => b.score - a.score || a.time - b.time);
    this.entries = this.entries.slice(0, this.maxEntries);
    this.saveEntries();
  }

  /**
   * @method showLeaderboard
   * @description Displays the leaderboard on the game screen.
   */
  showLeaderboard() {
    const leaderboardContainer = this.scene.add.container(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY,
      []
    );

    const titleText = this.scene.add.text(0, -100, 'Leaderboard', {
      fontSize: '32px',
      color: '#ffffff',
    });
    leaderboardContainer.add(titleText);

    this.entries.forEach((entry, index) => {
      const entryText = this.scene.add.text(
        -200,
        (index - this.entries.length / 2 + 0.5) * 50,
        `${index + 1}. ${entry.name} - Score: ${entry.score} - Time: ${entry.time / 1000}s`,
        {
          fontSize: '24px',
          color: '#ffffff',
        }
      );
      leaderboardContainer.add(entryText);
    });

    const closeButton = this.scene.add.text(0, 150, 'Close', {
      fontSize: '24px',
      color: '#ffffff',
    });
    closeButton.setInteractive();
    closeButton.on('pointerup', () => {
      leaderboardContainer.destroy(true);
    });
    leaderboardContainer.add(closeButton);
  }
}

/**
 * @module LeaderboardPlugin
 * @description A Phaser.js plugin for managing the game's leaderboard.
 */
const LeaderboardPlugin = {
  /**
   * @method install
   * @description Installs the leaderboard plugin in the specified scene.
   * @param {number} maxEntries - Maximum number of entries to display.
   * @param {string} storageKey - Key to use for storing leaderboard data in localStorage.
   * @returns {Leaderboard} The Leaderboard instance.
   */
  install(scene, maxEntries, storageKey) {
    const leaderboard = new Leaderboard(scene, {
      maxEntries,
      storageKey,
    });
    scene.leaderboard = leaderboard;
    return leaderboard;
  },
};

/**
 * @function LeaderboardPlugin.install
 * @description Installs the leaderboard plugin in the specified scene.
 * @param {Phaser.Scene} scene - The scene to install the plugin in.
 * @param {number} [maxEntries=10] - Maximum number of entries to display.
 * @param {string} [storageKey='leaderboard'] - Key to use for storing leaderboard data in localStorage.
 * @returns {Leaderboard} The Leaderboard instance.
 */

/**
 * @example
 * // In your game scene
 * create() {
 *   this.leaderboard = this.plugins.install(LeaderboardPlugin, 5, 'my-game-leaderboard');
 * }
 *
 * // To add a new entry
 * this.leaderboard.addEntry('Player1', 1000, 120000);
 *
 * // To show the leaderboard
 * this.leaderboard.showLeaderboard();
 */

export default LeaderboardPlugin;
```

This code defines a `Leaderboard` class that manages the leaderboard functionality, including loading and saving entries to `localStorage`, adding new entries, and displaying the leaderboard on the game screen. The `LeaderboardPlugin` module provides a convenient way to install the leaderboard functionality in a Phaser.js scene.

Here's a breakdown of the code:

1. The `Leaderboard` class constructor takes a `scene` instance and a configuration object with `maxEntries` and `storageKey` properties.
2. The `loadEntries` method retrieves the leaderboard entries from `localStorage` and returns an array of entries, limited to the `maxEntries` value.
3. The `saveEntries` method saves the leaderboard entries to `localStorage`.
4. The `addEntry` method adds a new entry to the leaderboard, sorts the entries by score and time, and saves the updated entries to `localStorage`.
5. The `showLeaderboard` method displays the leaderboard on the game screen, creating a container with the leaderboard title, entries, and a close button.
6. The `LeaderboardPlugin` module provides an `install` method that creates a new `Leaderboard` instance and attaches it to the specified scene.

The code includes JSDoc comments for documentation, error handling and logging, and follows best practices for modularity and reusability. Basic tests can be added using a testing framework like Jest or Mocha.

Note: This code assumes that the game is using Phaser.js and that the necessary Phaser.js setup and scene management is already in place. You may need to adjust the code to fit your specific game structure and requirements.