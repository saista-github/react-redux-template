#!/bin/bash
echo "Compiling all LESS files to CSS"
STYLE_DIR=$1
echo "STYLE DIR : ${STYLE_DIR}"
# for file in $(STYLE_DIR)/*.less
for file in ./styles/**/*.less
do
    echo $file
    FROM=$file
    # echo "$file" | tr less css
    NEW_FILE_NAME=${file/.less/_ed.css}
    echo "NEW_FILE_NAME: $NEW_FILE_NAME"
    TO=$NEW_FILE_NAME
    echo "$FROM --> $TO"
    ./node_modules/.bin/lessc $FROM $TO
done
