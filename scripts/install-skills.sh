#!/bin/sh
# Ставит дизайн-скиллы локально в .claude/skills (папка в .gitignore).
# Версии зафиксированы коммитами; в репо лежат только файлы, которые идут в промпты (prompts/skills).
set -eu
cd "$(dirname "$0")/.."
DEST=.claude/skills
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$DEST"

fetch() { # repo commit
  git init -q "$TMP/$1"
  git -C "$TMP/$1" fetch -q --depth 1 "https://github.com/$1.git" "$2"
  git -C "$TMP/$1" checkout -q FETCH_HEAD
}

fetch anthropics/skills dbd4588f9e1033efb41dad4bef2f7947c8993d44
fetch pbakaus/impeccable 2f98774f86bc05563876643db37e6c37c322850f
fetch Leonxlnx/taste-skill c924fad1a79c7d70a04bcc8c415b593e9928ad8a
fetch LottieFiles/motion-design-skill f9a8a041b85185ee4881b3471d3415e939aac772

rm -rf "$DEST/frontend-design" "$DEST/impeccable" "$DEST/taste-skill" "$DEST/motion-design"
cp -R "$TMP/anthropics/skills/skills/frontend-design" "$DEST/frontend-design"
cp -R "$TMP/pbakaus/impeccable/.claude/skills/impeccable" "$DEST/impeccable"
cp -R "$TMP/Leonxlnx/taste-skill/skills/taste-skill" "$DEST/taste-skill"
cp -R "$TMP/LottieFiles/motion-design-skill/skills/motion-design" "$DEST/motion-design"
cp "$TMP/pbakaus/impeccable/LICENSE" "$DEST/impeccable/LICENSE"
cp "$TMP/Leonxlnx/taste-skill/LICENSE" "$DEST/taste-skill/LICENSE"
cp "$TMP/LottieFiles/motion-design-skill/LICENSE" "$DEST/motion-design/LICENSE"
echo "Скиллы установлены в $DEST: frontend-design, impeccable, taste-skill, motion-design"
