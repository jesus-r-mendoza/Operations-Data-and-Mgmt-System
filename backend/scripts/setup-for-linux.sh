# Installs packages and applications needed to work on / run ODAS
# with Git, Docker, Docker-Compose, and NodeJS. (Only for Linux)

# If you haven't already updated your package manager, use the following
# command to do so:

# $ sudo apt-get update && sudo apt-get upgrade

# Then, this script will work optimally
# Be attentative, you may need to respond (Y) to some installation prompts

# Git install
echo
echo + - - - - - - - - - - - - - - - +
echo \| Checking if git is installed  \ \|
echo + - - - - - - - - - - - - - - - +
echo
git --version
if [ $? -eq 0 ]; then
    echo
    echo [ OK ] Git already installed
else
    echo
    echo Git not found. Installing....
    echo
    sudo apt-get install git
    if [ $? -eq 0 ]; then
        echo
        echo [ OK ] Git Successfully installed
    else
        echo
        echo [ ! ] Failed to install Git.. moving on.
    fi
fi
echo

# Just assuming they don't already have the rest of the things installed


# Docker install
echo
echo  + - - - - - - - - - +
echo \| Installing Docker \|
echo  + - - - - - - - - - +
echo
di=0

echo Step 1 / 3:
sudo apt-get install docker.io
if [ $? -eq 0 ]; then ((di++)); echo; echo [ OK ] Step 1/3 complete..; else echo; echo [ ! ] Step 1/3 failed. Continuing...; fi

echo
echo Step 2 / 3:
sudo systemctl start docker
if [ $? -eq 0 ]; then ((di++)); echo; echo [ OK ] Step 2/3 complete..; else echo; echo [ ! ] Step 2/3 failed. Continuing...; fi

echo
echo Step 3 / 3:
sudo systemctl enable docker
if [ $? -eq 0 ]; then ((di++)); echo; echo [ OK ] Step 3/3 complete..; else echo; echo [ ! ] Step 3/3 failed. Continuing...; fi
echo

docker --version
if [ $di -ne 3 ]; then echo; echo [ ! ] Not all installation steps succeeded. Docker may not have been completely installed. Verify on your own; fi
if [ $? -eq 0 ]; then echo; echo [ OK ] Successfully installed Docker; else echo; echo [ ! ] Failed to install Docker. Continuing...; fi


# Docker-Compose install
echo
echo  + - - - - - - - - - - - - - +
echo \| Installing Docker Compose \|
echo  + - - - - - - - - - - - - - +
echo
dc=0

echo Step 1 / 2:
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
if [ $? -eq 0 ]; then ((dc++)); echo; echo [ OK ] Step 1/2 complete..; else echo; echo [ ! ] Step 1/2 failed. Continuing...; fi

echo
echo Step 2 / 2:
sudo chmod +x /usr/local/bin/docker-compose
if [ $? -eq 0 ]; then ((dc++)); echo; echo [ OK ] Step 2/2 complete..; else echo; echo [ ! ] Step 2/2 failed. Continuing...; fi
echo

docker-compose --version
if [ $dc -ne 2 ]; then echo; echo [ ! ] Not all installation steps succeeded. Docker-Compose may not have been completely installed. Verify on your own; fi
if [ $? -eq 0 ]; then echo; echo Successfully installed Docker-Compose; else echo; echo [ ! ] Failed to install Docker-Compose. Continuing...; fi
echo


# NodeJs install
echo
echo  + - - - - - - - - - +
echo \| Installing NodeJs \|
echo  + - - - - - - - - - +
echo
njs=0

echo Step 1 / 5:
curl "https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-x64.tar.xz" -o ~/Downloads/nodejs.tar.xz
if [ $? -eq 0 ]; then ((njs++)); echo; echo [ OK ] Step 1/5 complete..; else echo; echo [ ! ] Step 1/2 failed. Continuing...; fi

echo
echo Step 2 / 5:
cd ~/Downloads && tar -xf ~/Downloads/nodejs.tar.xz
if [ $? -eq 0 ]; then ((njs++)); echo; echo [ OK ] Step 2/5 complete..; else echo; echo [ ! ] Step 2/5 failed. Continuing...; fi

echo
echo Step 3 / 5:
sudo mv ~/Downloads/node-v12.14.1-linux-x64/ /usr/local/lib/nodejs-v12
if [ $? -eq 0 ]; then ((njs++)); echo; echo [ OK ] Step 3/5 complete..; else echo; echo [ ! ] Step 3/5 failed. Continuing...; fi

echo
echo Step 4 / 5:
echo "export PATH=\$PATH:/usr/local/lib/nodejs-v12/bin" > ~/.bash_aliases
if [ $? -eq 0 ]; then ((njs++)); echo; echo [ OK ] Step 4/5 complete..; else echo; echo [ ! ] Step 4/5 failed. Continuing...; fi

echo
echo Step 5 / 5:
rm ~/Downloads/nodejs.tar.xz
if [ $? -eq 0 ]; then ((njs++)); echo; echo [ OK ] Step 5/5 complete..; else echo; echo [ ! ] Step 5/5 failed. Continuing...; fi

nr=0
node --version
if [ $? -eq 0 ]; then ((nr++)); fi
npm --version
if [ $? -eq 0 ]; then ((nr++)); fi
npx --version
if [ $? -eq 0 ]; then ((nr++)); fi
if [ $njs -ne 5 ]; then echo; echo [ ! ] Not all installation steps succeeded. NodeJs may not have been completely installed. Verify on your own; fi
if [ $nr -eq 3 ]; then echo; echo Successfully installed NodeJs; else echo; echo [ ! ] Failed to install NodeJs. Continuing...; fi
echo
echo Done.
echo