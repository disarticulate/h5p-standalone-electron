#!/bin/sh
git clone --depth=1 https://github.com/tunapanda/h5p-standalone.git static/h5p-standalone 
cd static/h5p-standalone && npm install && bower install
cp -R dist/* ../libs/h5p-standalone && cd .. && rm -rf h5p-standalone