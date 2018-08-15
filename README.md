# diregram-api
API server for diregram

### Installation

##### With Docker
Make sure you install docker in your local machine.
Checkout docker website for more information.
https://docs.docker.com/install/

By simply running this command, it will install all the dependencies under the hood
and get you up and running in development environment.

```
$ docker-compose up
```

##### Without docker
```
$ yarn install # installing dependencies
$ yarn watch-debug # watch mode node and typescript
```

Checkout `npm scripts` for other commands.

### Testing

Unit and integation testing
```
$ yarn test # run jest tests

$ yarn test:watch # run watch mode
```

End to end testing with Cypress
```
$ yarn cypress:open # open cypress
$ yarn cypress run # running cypress
```

### Installing Node

Download nvm installer

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

The script clones the nvm repository to ~/.nvm and adds the source line to your profile.

```
$ export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Reloading shell
```
$ source ~/.bashrc
```

For more information checkout: https://gist.github.com/d2s/372b5943bce17b964a79

#### Author
Sheenan Tenepre

