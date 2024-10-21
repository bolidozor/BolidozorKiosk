## BolidozorKiosk

BolidozorKiosk offers visitors the opportunity to interactively explore data from the network and see how frequently meteors are detected. This interactive feature can be an excellent addition to observatories, where visitors can gain a wealth of information about the network without requiring the presence of an expert.

By using BolidozorKiosk, users can visualize real-time meteor detection and historical data, providing a hands-on experience that enhances their understanding of meteor observation and the technologies behind it.

## Installation

Tested on a clean installation of Ubuntu 24.04:

```
  sudo apt update
  sudo apt install git nano htop mc nodejs
  sudo apt install npm # Must be in a separate apt command after nodejs installation

  # Clone the git repository

  mkdir repos
  cd repos
  git clone
  cd BolidozorKiosk/bolidozor_kiosk
  
  npm install --force

  sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=1

  npm serve run
  npm start
```
