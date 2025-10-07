// Simple test for the updated parser
const { parseProject } = require('./dist/src/parser.js');

// Mock project data with signals and scripts
const testProject = {
  name: "Test Project",
  scenes: [
    {
      name: "MainScene",
      projectID: 1,
      scripts: [
        {
          id: 1,
          name: "PlayerScript",
          content: null,
          actions: [
            {
              id: 1,
              name: "Move Player",
              type: "MOVE_TO",
              enabled: true,
              order: 0,
              parameters: {
                targetX: 100,
                targetY: 200,
                duration: 2.0
              },
              triggerID: 1
            },
            {
              id: 2,
              name: "Print Message",
              type: "PRINT",
              enabled: true,
              order: 1,
              parameters: {
                message: "Player moved!"
              },
              triggerID: 1
            }
          ],
          triggers: [
            {
              id: 1,
              name: "Ready Trigger",
              type: "ready",
              enabled: true,
              conditions: null
            }
          ]
        }
      ],
      signals: [
        {
          id: 1,
          name: "player_moved",
          fromID: 1,
          toID: 2,
          script: "on_player_moved"
        }
      ]
    }
  ],
  resources: []
};

async function testParser() {
  try {
    console.log("Testing parser with signals and scripts...");
    const result = await parseProject(testProject);
    console.log("Parser test completed successfully!");
    console.log("Generated file:", result);
  } catch (error) {
    console.error("Parser test failed:", error);
  }
}

testParser();
