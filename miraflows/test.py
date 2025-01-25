from mira_sdk import MiraClient, CompoundFlow
from mira_sdk.exceptions import FlowError
from dotenv import load_dotenv
import os
import json

load_dotenv()
api_key=os.getenv("API_KEY")
client = MiraClient(config={"API_KEY": api_key})     # Initialize Mira Client
flow = CompoundFlow(source="./stk.yaml")           # Load flow configuration

test_input = {                                              # Prepare test inputs
    "prime_input_1": 10000,
    # "prime_input_2": "test parameters"
}

try:
    response = client.flow.test(flow, test_input)
    print("Test response:", response)
except FlowError as e:
    print("Test failed:", str(e))                           # Handle test failure

