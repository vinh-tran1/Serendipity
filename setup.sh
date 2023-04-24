#!/bin/bash

# create virtual environment
python -m venv hcienv
source hcienv/bin/activate
# install dependencies
pip install -r requirements.txt