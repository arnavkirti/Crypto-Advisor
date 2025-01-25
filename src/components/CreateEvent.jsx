import { ChatOpenAI } from "@langchain/openai";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { LangchainToolSet } from "composio-core";
import { pull } from "langchain/hub";


const llm = new ChatOpenAI({
    model: "gpt-4-turbo",
    temperature: 0,
  });
  
  const prompt = await pull("hwchase17/openai-functions-agent");
  
  const toolset = new LangchainToolSet({ apiKey: "u1yexgrqmji3jv0ubusfyx" });
  const tools = await toolset.getTools({ actions: ["GOOGLECALENDAR_CREATE_EVENT"] });
  
  const agent = await createOpenAIFunctionsAgent({llm, tools, prompt});