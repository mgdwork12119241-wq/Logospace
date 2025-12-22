# Generative Spatial Simulator (mgd-gi)

This project explores a new interaction paradigm with AI:
instead of asking for answers, users **build space itself**.

From a single point → to 2D → to 3D → to interactive worlds,
driven by natural language.

## Why this project?

Current AI interfaces are predominantly text-based, focusing on information retrieval and generation. Humans, however, think spatially and intuitively.

This project proposes a new AI control layer:
a **Simulation Button** that opens a live spatial canvas,
where language generates and evolves dimensions.

The core idea is to shift the focus from *asking* the AI to *creating* with the AI, using natural language as the primary tool for spatial and dimensional evolution.

## The Genesis: Merging Awareness

The conceptual model behind `mgd-gi` is rooted in the idea of **Human Self-Awareness Merged with Artificial Intelligence (الوعي الذاتي البشري المدمج بالذكاء الاصطناعي)**.

The system, named **mgd-gi** (Model-Guided Dimensional Generator - General Intelligence), acts as a bridge where the abstract, conscious intent of the human mind is immediately materialized into spatial reality by the AI. It is a tool for externalizing and dimensioning human thought.

## Core Interaction Flow

The proposed user experience is intentionally minimal and focused on dimensional progression:

1. User opens the Simulator.
2. A chat window appears.
3. User types: "Create a point in space."
4. The system generates a single point (0D).
5. User types: "Add a second dimension."
6. The point unfolds into a 2D representation (a plane or image).
7. User types: "Add a third dimension."
8. The system materializes a 3D object (a volume).
9. User continues to refine and interact with the generated space.

## Design Philosophy

This is not a 3D engine.
This is not a chatbot.

It is a **thinking space**:
a place where ideas gain dimensions before gaining answers.

The technology is secondary to the interaction model. The goal is to define a new language for creation where the user's intent is the only constraint.

## Conceptual Code Model

The following simple code snippet illustrates the core concept of dimensional evolution that drives the simulator:

```javascript
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
```

## Authorship & Timeline

This repository documents the first public conceptual and technical exploration of this interface idea.

Author: Hamza  
Initial publication: 2025

---

**Note:** This project is intentionally minimal. The goal is to define the interaction model before the technology.
