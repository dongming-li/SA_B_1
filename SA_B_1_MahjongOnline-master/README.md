# Mahjong Online

Super amazing mahjong battle

## Important notes
- Push to dev branch unless you code is working and everyone agrees to push it to master
- Your code to comment ratio should be more than 50/50. Write as many comments as possible.
- Document big picture in README.md or some other file

## Technologies we are gonna use
- NodeJS / TypeScript / Mocha (Unit test)
- Unity
- SocketIO (Communication between server and client)

## Branches
- master - Working code 
- dev - experimental code
- dev-takao - Takao's experiments
- dev-nina - Nina's experiments
- dev-nathan - Nathan's experiments
- dev-haolun - Haolun's experiments

## Trouble  Shooting

### How to clone this repo
```shell
git config --global user.name "username"  # only for the first time
git config --global user.email "username@iastate.edu"  # only for the first time
git clone https://git.linux.iastate.edu/309Fall2017/SA_B_1_MahjongOnline
```

### How to push to master
```shell
git add --all .              # add everything except what's written in .gitignore
git commit -m "commit name"  # commit change to local
git push origin master       # push commit to remote

# or for the shothand

git add --all . && git commit -m "commit name" && git push origin master
```

### How to push to dev
```shell
git checkout dev  # Move to dev branch locally, do this only once
git add --all . && git commit -m "commit name" && git push origin dev
```

### Version name control
[Read this](https://stackoverflow.com/questions/18216991/create-a-tag-in-github-repository).

### Permission denied error by git
[Read this](https://stackoverflow.com/questions/40427498/getting-permission-denied-public-key-on-gitlab)

### Can't ssh to remote server

```shell
ssh netid@proj-309-sa-b-1.cs.iastate.edu
```

### Can't use git on remote server

```shell
ssh-keygen -t rsa -b 4096 -C "netid@iastate.edu"
cat ~/.ssh/id_rsa.pub
# copy this to gitlab -> profile -> settings -> SSH Keys -> Add a new key
git clone git@git.linux.iastate.edu:309Fall2017/SA_B_1_MahjongOnline.git
```

## Members
- Takao Shibamoto
- Nina Moriguchi
- Nathan Schaffer
- Haolun Wu
