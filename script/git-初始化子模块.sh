#!/bin/bash

git submodule | awk '{print $2}' | xargs rm -rf
git submodule sync
git submodule update --init --recursive
