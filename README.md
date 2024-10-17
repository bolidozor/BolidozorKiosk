



## Instalace 

Testováno na čisté instalaci Ubuntu 24.04
```
sudo apt update
sudo apt install git nano htop mc nodejs
sudo apt install npm # Musi to byl v samostatnem apt prikazu, po instalaci nodejs

# Stahnout git repoztar
mkdir repos
cd repos
git clone
cd BolidozorKiosk/bolidozor_kiosk

npm install --force

# novinka v 24.04
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=1

npm serve run
npm start

```
