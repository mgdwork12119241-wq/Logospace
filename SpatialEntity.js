// SpatialEntity.js - Conceptual Model
export class SpatialEntity {
  // Represents the current number of dimensions (0, 1, 2, 3, ...)
  dimensions = 0; 

  /**
   * Evolves the entity to the next dimension, simulating the user's command.
   */
  evolve() {
    this.dimensions++;
    console.log(`Entity evolved to ${this.dimensions} dimensions.`);
  }

  /**
   * Returns a conceptual representation of the entity based on its dimensions.
   */
  getRepresentation() {
    switch (this.dimensions) {
      case 0:
        return "Conceptual Point (0D)";
      case 1:
        return "Line/Vector (1D)";
      case 2:
        return "Plane/Image (2D)";
      case 3:
        return "Volume/Object (3D)";
      default:
        return `Hyperspace Entity (${this.dimensions}D)`;
    }
  }
}

// Example Usage:
const entity = new SpatialEntity();
console.log(`Initial State: ${entity.getRepresentation()}`);

entity.evolve(); // User types: "Add a second dimension."
console.log(`Current State: ${entity.getRepresentation()}`);

entity.evolve(); // User types: "Add a third dimension."
console.log(`Current State: ${entity.getRepresentation()}`);

entity.evolve(); // User types: "Add a fourth dimension."
console.log(`Current State: ${entity.getRepresentation()}`);
