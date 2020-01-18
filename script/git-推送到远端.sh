#!/bin/sh

git config --global core.autocrlf false
git config --global credential.helper store
git config --global user.email "2451759073@qq.com"
git config --global user.name "lsby"
git config --global push.default simple
git add --all
git commit -m commit
git push
