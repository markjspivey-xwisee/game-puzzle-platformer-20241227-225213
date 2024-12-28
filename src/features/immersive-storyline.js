Sure, I can provide you with a basic implementation of an immersive storyline feature for a Phaser.js game. Here's an example of how you could structure the code:

```javascript
/**
 * @file storyline.js
 * @author Your Name
 * @description Handles the game's immersive storyline.
 */

/**
 * StorylineManager class
 * @class
 */
class StorylineManager {
  /**
   * Creates an instance of StorylineManager.
   * @param {Phaser.Scene} scene - The scene in which the storyline will be displayed.
   * @param {Object} storylineData - The data containing the storyline information.
   */
  constructor(scene, storylineData) {
    this.scene = scene;
    this.storylineData = storylineData;
    this.currentStoryIndex = 0;
    this.storyTextObject = null;
    this.storyTextContainer = null;
  }

  /**
   * Initializes the storyline manager.
   */
  init() {
    // Create a container for the story text
    this.storyTextContainer = this.scene.add.container(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 200
    );

    // Create a text object for displaying the story
    this.storyTextObject = this.scene.add.text(0, 0, '', {
      fontSize: '24px',
      color: '#ffffff',
      wordWrap: { width: this.scene.cameras.main.width - 100, useAdvancedWrap: true },
    });
    this.storyTextContainer.add(this.storyTextObject);

    // Start the storyline
    this.displayNextStory();
  }

  /**
   * Displays the next part of the storyline.
   */
  displayNextStory() {
    if (this.currentStoryIndex < this.storylineData.length) {
      const storyPart = this.storylineData[this.currentStoryIndex];
      this.storyTextObject.setText(storyPart.text);
      this.currentStoryIndex++;

      // Add a delay before displaying the next part of the story
      this.scene.time.delayedCall(storyPart.duration * 1000, this.displayNextStory, [], this);
    } else {
      // Storyline has finished, clean up
      this.storyTextContainer.destroy();
      this.storyTextObject = null;
      this.storyTextContainer = null;

      // Perform any additional actions after the storyline has finished
      // ...
    }
  }
}

/**
 * Example usage:
 *
 * // In your scene's create() method
 * const storylineData = [
 *   { text: 'Once upon a time...', duration: 3 },
 *   { text: 'There was a brave hero...', duration: 4 },
 *   { text: 'Who embarked on a perilous journey...', duration: 5 },
 *   // Add more story parts as needed
 * ];
 *
 * const storylineManager = new StorylineManager(this, storylineData);
 * storylineManager.init();
 */

```

**Explanation:**

1. The `StorylineManager` class is responsible for managing the storyline.
2. The constructor takes the current scene and the storyline data as parameters.
3. The `init()` method creates a container and a text object for displaying the story. It also starts the storyline by calling `displayNextStory()`.
4. The `displayNextStory()` method displays the next part of the storyline and schedules the next part to be displayed after a specified duration using `scene.time.delayedCall()`.
5. When the storyline is finished, the `displayNextStory()` method cleans up the text objects and containers, and you can perform any additional actions required after the storyline has finished.
6. The example usage shows how you can create an instance of `StorylineManager` in your scene's `create()` method and pass in the storyline data.

**Notes:**

- This implementation assumes that the storyline data is an array of objects, where each object contains the text and duration for a part of the story.
- The code is modular and reusable, allowing you to use the `StorylineManager` class in different scenes or games.
- Error handling and logging could be added to handle cases where the storyline data is invalid or missing.
- Additional features, such as user input handling (e.g., skipping the storyline) or visual effects, could be added as needed.
- Basic tests could be written to ensure the correct functionality of the `StorylineManager` class.

**Documentation:**

- `StorylineManager` class:
  - `constructor(scene, storylineData)`: Creates an instance of the `StorylineManager` class.
    - `scene` (Phaser.Scene): The scene in which the storyline will be displayed.
    - `storylineData` (Object): The data containing the storyline information.
  - `init()`: Initializes the storyline manager by creating the necessary text objects and containers, and starts the storyline.
  - `displayNextStory()`: Displays the next part of the storyline and schedules the next part to be displayed after a specified duration.

Please note that this is a basic implementation, and you may need to adapt it to fit your specific game requirements and integrate it with the rest of your Phaser.js game code.