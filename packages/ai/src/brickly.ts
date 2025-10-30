import { LanguageModelLike } from "@langchain/core/language_models/base";
import { DynamicStructuredTool, ReactAgent, tool } from "langchain";
import { supervisorPrompt } from "./prompts/supervisorPrompt";
import { designPrompt } from "./prompts/designPrompt";
import { builderPrompt } from "./prompts/builderPrompt";
import { scriptPrompt } from "./prompts/scriptPrompt";
import z from "zod";
import { Tool, ToolDescription } from "./tools/type";
import { initAgent } from "./agents/agent";
import { logger } from "./utils/logger";

export class BricklyAgent {
  agent: ReactAgent | null;

  constructor(
    model: LanguageModelLike,
    tools: { bricklyTools: Tool; designTools: Tool }
  ) {
    const designAgent = initAgent(model, designPrompt, tools.designTools);
    const builderAgent = initAgent(model, builderPrompt, tools.bricklyTools);
    const scriptAgent = initAgent(model, scriptPrompt, tools.bricklyTools);

    const supervisorTools: DynamicStructuredTool[] = [
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
    logger.info(
      "Supervisor tools initialized",
      supervisorTools.map((t) => t.name)
    );
    this.agent = initAgent(model, supervisorPrompt, supervisorTools);
  }

  private agentAsTool(
    agent: ReactAgent,
    describe: ToolDescription
  ): DynamicStructuredTool {
    return tool(async (input, option) => {
      try {
        logger.agentInvoke(
          describe.name,
          input.request,
          option.configurable?.session
        );

        const result = await agent.invoke(
          {
            messages: [{ role: "user", content: input.request }],
          },
          {
            configurable: {
              session: option.configurable.session,
              agentName: describe.name,
            },
          }
        );

        const lastMessage = result.messages[result.messages.length - 1];
        logger.agentComplete(describe.name, result.messages.length);

        return lastMessage.text;
      } catch (error) {
        logger.error(`Error while invoking ${describe.name}`, error);
        throw error;
      }
    }, describe);
  }

  async invoke(query: string, session: string) {
    if (!this.agent) {
      logger.error("Agent not initialized");
      return null;
    }

    logger.agentInvoke("Supervisor", query, session);

    const result = await this.agent.invoke(
      {
        messages: [{ role: "user", content: query }],
      },
      {
        configurable: {
          session,
          agentName: "Supervisor",
        },
      }
    );

    logger.agentComplete("Supervisor", result.messages.length);
    return result;
  }

  async *stream(query: string, session: string) {
    if (!this.agent) {
      logger.error("Agent not initialized for streaming");
      yield { type: "error", content: "Agent not initialized" };
      return;
    }

    logger.agentInvoke("Supervisor (Stream)", query);

    try {
      const stream = await this.agent.stream(
        {
          messages: [{ role: "user", content: query }],
        },
        {
          configurable: {
            session,
            agentName: "Supervisor",
          },
        }
      );

      for await (const step of stream) {
        for (const [key, update] of Object.entries(step)) {
          if (update && typeof update === "object" && "messages" in update) {
            if (Array.isArray((update as any).messages)) {
              const message = (update as any).messages[
                (update as any).messages.length - 1
              ];
              logger.debug(`Stream message from ${key}`, {
                role: message.type,
                contentPreview: message.content?.substring(0, 100),
              });

              yield {
                id: message.id || null,
                type: message.content ? "message" : "tool_call",
                agent: key,
                content:
                  message.content ||
                  message?.additional_kwargs?.tool_calls?.map(
                    (k: any) => k.function
                  ),
                role: message.type,
                timestamp: new Date(),
              };
            }
          }
        }
      }

      logger.info("Stream completed successfully");
    } catch (error) {
      logger.error("Error during streaming", error);
      yield {
        type: "error",
        content:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
