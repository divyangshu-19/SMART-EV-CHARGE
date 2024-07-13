
# Smart EV Charge

*MAN HELPS MAN NO MIDDLEMAN*

This project is a decentralized peer-to-peer (P2P) web application which provides a platform to connect the 
 

**USERS** - EV owners looking for 
charging stations
and

**PROVIDERS** - individuals or businesses offering EV charging services

through a transparent system powered by blockchain and facilitated by Smart Contracts.




## Tech Stack

**Client:** React, Webpack, Bootstrap, CSS

**Back-end:** Truffle Suite, Solidity, Node

**Local Testing:** Ganache

**Others:** Metamask

## Run Locally

Clone the project

```bash
  git clone https://github.com/divyangshu-19/SMART-EV-CHARGE.git
```
Install dependencies
```bash
  npm install -g truffle
```
```bash
  npm install -g webpack
```
```bash
  npm install react-dom
```

Open Ganache and Start a Local Blockchain
and import the test wallets in Metamask.

Go to the project directory

1. Navigate to the Truffle folder

```bash
  Truffle migrate
```
2. Navigate to the client folder

```bash
  npm start
```


## Future & fixes

- #### Currently, we don't have a decentralized map & location service for distance measurement right now.

Right now the project uses region lists which is dumb and inefficient. waiting for MapMetrics and HiveMapper to get to the point where we can integrate it or use an open-source alternative like OpenStreetMap (OSM).

- #### Time management work in progress.

Abstaining the providers from taking part in the matching while the previous user is still charging will create scheduling issues.

Trying to implement scheduling using Time Lock or Block Timestamp.

- #### Current authentication is powered by Firebase which is web2.

- #### The UI sucks.

- #### IoT integration to fetch charging, payment and other stats.
