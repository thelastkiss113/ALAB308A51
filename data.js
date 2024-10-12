export const textNodes = [
    {
      id: 1,
      text: "You're on a spaceship, alone. A strange noise comes from the cargo hold.",
      options: [
        {
          text: "Investigate: \"I'm not afraid of a little noise. Let's check it out.\"",
          nextText: 2,
        },
        {
          text: "Ignore: \"Probably just the wind. I'll ignore it.\"",
          nextText: 8,
        },
        {
          text: "Call for help: \"Maybe I should call for backup. Just in case.\"",
          nextText: 7,
        },
        {
          text: "Hide: \"I'm not sure if I want to face whatever's in there.\"",
          nextText: 8,
        },
      ],
    },
    {
      id: 2,
      text: "You open the cargo hold door. A small, green alien is staring at you.",
      options: [
        {
          text: "Scream: \"AAAAAHHHHH! What the heck is that?!\"",
          nextText: 99,  // You die 
        },
        {
          text: "Talk: \"Hello? Can you understand me?\"",
          nextText: 3,
        },
        {
          text: "Attack: \"I'm not taking any chances. Here's a wrench!\"",
          nextText: 99,  // You die 
        },
        {
          text: "Befriend: \"Hey there, little guy. Want a snack?\"",
          nextText: 4,
        },
      ],
    },
    {
      id: 3,
      text: "The alien makes strange sounds, but you don't understand it. You feel uneasy...",
      options: [
        {
          text: "Keep talking: \"We need to communicate. Let me try again.\"",
          nextText: 99,  // You die 
        },
        {
          text: "Step back slowly: \"I think I need to give it some space...\"",
          nextText: 5,
        },
      ],
    },
    {
      id: 4,
      text: "The alien takes the food and seems to calm down.",
      options: [
        {
          text: "Ask questions: \"Where are you from? What are you doing here?\"",
          nextText: 10,  // End game
        },
        {
          text: "Leave: \"I think I've had enough excitement for one day.\"",
          nextText: 5,
        },
      ],
    },
    {
      id: 5,
      text: "You leave the cargo hold. The alien stays behind. You continue your journey alone.",
      options: [
        {
          text: "The End.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 6,
      text: "You encounter a black hole and get sucked in. It seems there's no escape.",
      options: [
        {
          text: "The End.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 7,
      text: "You call for backup, but nobody responds. You hear a noise approaching...",
      options: [
        {
          text: "Investigate the noise.",
          nextText: 99,  // You die 
        },
        {
          text: "Hide until it passes.",
          nextText: 5,
        },
      ],
    },
    {
      id: 8,
      text: "You decide to stay where you are. Nothing happens for a while. Maybe it was just your imagination.",
      options: [
        {
          text: "Go check the noise.",
          nextText: 2,
        },
        {
          text: "Stay put.",
          nextText: 5,
        },
      ],
    },
    {
      id: 9,
      text: "You decide to explore the ship's control room, but the ship malfunctions.",
      options: [
        {
          text: "The End.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 10,
      text: "The alien communicates back, and you learn about its home planet. You forge an alliance.",
      options: [
        {
          text: "Celebrate your new friendship.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 99,
      text: " A long tentacle wraps around your body and the creature opens its mouth to reveal many jagged teeth. Your life flashes before your eyes. You die.", // You die
      options: [
        {
          text: "Restart", //Restart Game
          nextText: 1,  
        },
      ],
    },
  ];
