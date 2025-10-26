import { LanguageModelLike } from "@langchain/core/language_models/base";
import { ReactAgent, tool } from "langchain";
import { supervisorPrompt } from "./prompts/supervisorPrompt";
import { designPrompt } from "./prompts/designPrompt";
import { builderPrompt } from "./prompts/builderPrompt";
import { scriptPrompt } from "./prompts/scriptPrompt";
import z from "zod";
import { Tool } from "./tools/type";
import { initAgent } from "./agents/agent";

export class BricklyAgent {
  agent: ReactAgent | null;

  constructor(model: LanguageModelLike, tools: Tool) {
    const designAgent = initAgent(model, designPrompt, tools);
    const builderAgent = initAgent(model, builderPrompt, tools);
    const scriptAgent = initAgent(model, scriptPrompt, tools);

    const supervisorTools: any[] = [
      this.agentAsTool(designAgent, {
        name: "design_agent",
        description: `
        Creates game visual assets and spritesheets for Godot Engine.
        Use this agent when the user needs:
        - Character sprites, animations, or sprite atlases
        - UI elements, icons, or visual assets
        - Texture creation or modification
        - Visual design for game objects
        - Spritesheet generation with proper frame dimensions

        Input: Description of the visual asset needed, including style, dimensions, animation states, or specific requirements.
        Examples: "Create a 32x32 pixel character spritesheet with walk cycle" or "Design a medieval sword icon"
      `.trim(),
        schema: z.object({
          request: z
            .string()
            .describe(
              "Detailed description of the visual asset or spritesheet to create"
            ),
        }),
      }),
      this.agentAsTool(builderAgent, {
        name: "builder_agent",
        description: `
        Constructs Godot scene nodes, configures properties, and sets up the scene hierarchy.
        Use this agent when the user needs:
        - Creating Godot nodes (Sprite2D, CharacterBody2D, CollisionShape2D, etc.)
        - Setting up scene hierarchies and parent-child relationships
        - Configuring node properties (position, scale, rotation, custom properties)
        - Adding components like collision shapes, cameras, or lights
        - Scene structure and organization

        Input: Description of the scene structure, nodes needed, and their properties.
        Examples: "Create a player character with Sprite2D and CollisionShape2D" or "Set up a camera that follows the player"
      `.trim(),
        schema: z.object({
          request: z
            .string()
            .describe(
              "Description of Godot nodes, scene structure, and properties to configure"
            ),
        }),
      }),
      this.agentAsTool(scriptAgent, {
        name: "script_agent",
        description: `
        Writes GDScript code for Godot nodes to implement game logic and behavior.
        Use this agent when the user needs:
        - Player movement and control scripts
        - Enemy AI and behavior patterns
        - Game mechanics implementation (jumping, shooting, collecting items)
        - Physics interactions and collision handling
        - Signal connections and event handling
        - Custom functions and game logic

        Input: Description of the desired behavior, logic, or functionality to implement in GDScript.
        Examples: "Write player movement script with WASD controls" or "Create enemy patrol AI with state machine"
      `.trim(),
        schema: z.object({
          request: z
            .string()
            .describe(
              "Description of the game behavior or logic to implement in GDScript"
            ),
        }),
      }),
    ];
    this.agent = initAgent(model, supervisorPrompt, supervisorTools);
  }

  private agentAsTool(agent: any, describe: any): any {
    return tool(async (input: any, option: any) => {
      const result = await agent.invoke(
        {
          messages: [{ role: "user", content: input.request }],
        },
        {
          configurable: {
            session: option.configurable.session,
          },
        }
      );
      const lastMessage = result.messages[result.messages.length - 1];
      return lastMessage.text;
    }, describe);
  }

  async invoke(query: string, session: string) {
    if (!this.agent) return null;

    const result = await this.agent.invoke(
      {
        messages: [{ role: "user", content: query }],
      },
      {
        configurable: {
          session,
        },
      }
    );
    return result;
  }

  async *stream(query: string) {
    if (!this.agent) {
      yield { type: "error", content: "Agent not initialized" };
      return;
    }

    try {
      const stream = await this.agent.stream({
        messages: [{ role: "user", content: query }],
      });

      for await (const step of stream) {
        for (const [key, update] of Object.entries(step)) {
          if (update && typeof update === "object" && "messages" in update) {
            if (Array.isArray((update as any).messages)) {
              for (const message of (update as any).messages) {
                yield {
                  type: "message",
                  agent: key,
                  content: message.content,
                  role: message.type,
                };
              }
            }
          }
        }
      }
    } catch (error) {
      yield {
        type: "error",
        content:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
