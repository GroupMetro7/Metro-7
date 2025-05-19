# DEVELOPMENT IN PROGRESS

## 1. NPM INSTALL
...>`winget install Schniz.fnm`
<br>...>`fnm install 22`

## 2. COMPOSER INSTALL
...>`php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"`
<br>...>`php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'.PHP_EOL; } else { echo 'Installer corrupt'.PHP_EOL; unlink('composer-setup.php'); exit(1); }"`
<br>...>`php composer-setup.php`
<br>...>`php -r "unlink('composer-setup.php');"`

## 3. LARAVEL CONFIGURATION
...>`composer install`
<br>...>`php artisan migrate`
<br>...>`composer run dev`
<br><br>
Note: <br>
— Configure the php.ini and change the `;extension=zip` to `extension=zip`
<br>— Make sure the xampp are installed and open
<br>Download Link: https://drive.google.com/file/d/1Xq6A7HRPRMCJAbjjKbMYeZhlL_f2FyVp/view?usp=drive_link

## 4. REACT CONFIGURATION
...>`npm install`
<br>...>`npm run build`
<br>...>`npm install -g sass`
<br>...>`npm run dev`

## 5-7-25
<br> Added sw.js in public folder
<br> Added serviceWorker.js in src folder
<br> Added SWdev.js in src folder

<br> sw.js allows for cache allowing offline view of the website.

## 5-14-2025
<br> npm install vite-plugin-pwa -D
<br> add code "VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true" in vite.config.js inside plugins to auto generate serviceworkers.
<br> add code "manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/brand_logo/Test_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/brand_logo/Test_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }" to generate manifest. change src to actual favicon logo.

<br> following steps above should allow instalabillity on desktop.