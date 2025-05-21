To run the system
 In the laravel directory Metro-7
 #run this command in powershell or cmd
 1. npm install
 2. npm run build
 3. composer install
 4. php artisan storage:link //link the public file for the images to render
 5. php artisan serve //to run the server
 
 In the main-app directory
 run this command
 1. if your still not in the main-app directory run "cd main-app"
 2. npm install
 3. npm run build
 4. npm run dev //to run the website


 FOR NETWORK TESTING
 You need to configure the routes here's how you will know your current IP address.
 1. in terminal or cmd type "ipconfig" then look for IPv4 address.
 2. now that you know your IP address you need to copy that address.
 3. now in the laravel file Metro-7 type in the terminal : php artisan serve --host="<ipaddress>" port="8000"
 4. once the backend is running go to axiosClient.jsx and change the baseURL to baseURL: '<ipaddress>:port/api'
 5. then go to main-app directory, and type in the terminal : npm run dev -- --host 0.0.0.0
 6. once the app is running ctrl+click on the network URL.
