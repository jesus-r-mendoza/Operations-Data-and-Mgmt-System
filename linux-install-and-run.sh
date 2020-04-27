# Making linux install script executable
chmod +x backend/scripts/set-up-for-linux.sh

# Executing linux install script
./backend/scripts/set-up-for-linux.sh

# Installing ODAS npm package dependencies
cd odas-ui/
npm install
cd ..

# Launching ODAS using docker-compose
sudo docker-compose up