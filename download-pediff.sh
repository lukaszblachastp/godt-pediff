#!/bin/bash

git clone git.int.vgnett.no:/git/stp/pediff ./tmp
rm -rf ./tmp/.git
cp -r ./tmp/* .
rm -rf ./tmp
