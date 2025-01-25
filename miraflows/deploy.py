from mira_sdk import MiraClient, CompoundFlow
from mira_sdk.exceptions import FlowError
from dotenv import load_dotenv
import os

load_dotenv()
api_key=os.getenv("API_KEY")
client = MiraClient(config={"API_KEY": api_key})  

flow = CompoundFlow(source="./stk.yaml")           # Load flow configuration

try:
    client.flow.deploy(flow)                               # Deploy to platform
    print("Compound flow deployed successfully!")          # Success message
except FlowError as e:
    print(f"Deployment error: {str(e)}")                   # Handle deployment error