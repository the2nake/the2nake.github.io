#!/usr/bin/env bash

find ./ -type f -iname "*.jpeg" -exec mogrify -verbose -format jpeg -layers Dispose -resize 2000\>x2000\> -quality 85% {} +
find ./ -type f -iname "*.jpg" -exec mogrify -verbose -format jpg -layers Dispose -resize 2000\>x2000\> -quality 85% {} +
find ./ -type f -iname "*.png" -exec mogrify -verbose -format png -alpha on -layers Dispose -resize 2000\>x2000\> {} +
