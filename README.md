# typing-game

A simple Javascript game for testing your typing speed. This repository is a lightweight example meant for setting up a CI/CD pipeline using Docker & deploying with Kubernetes.

## Structure
```text
.
├── Dockerfile
├── LICENSE
├── Makefile
├── README.md
├── app                 # source code
│   ├── index.html
│   ├── main.js
│   └── style.css
├── conf                # nginx config
│   └── default.conf
└── deployment          # kubernetes specs
    ├── deployment.yaml
    └── service.yaml
```

## Deploying
I have a Docker container registry running on `localhost:32000` which is where that tag comes from.

```bash
$ docker build -t localhost:32000/minelminel/typing-game:latest
$ docker push localhost:32000/minelminel/typing-game:latest
$ kubectl apply -f deployement/deployment.yaml
$ kubectl apply -f deployement/service.yaml
```

Most of the Docker commands you would need to run are included in the Makefile directives. Run `make` with no arguments to view a list of all available commands.