log:
	heroku logs -t

ps:
	heroku ps

restart:
	heroku restart

cancel:
	heroku builds:cancel

clreadb:
	heroku addons:open cleardb

local:
	heroku local web

run:
	npm run serve

build:
	npm run build

