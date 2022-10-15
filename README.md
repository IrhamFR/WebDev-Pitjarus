## User Guide

1. Open new terminal. (you can choose either powershell, cmd, or git bash) 
2. Type '$ npm install' to install module then press Enter.
3. After installation finished, type '$ npm start' to run the code.

## Additional
*incase you can't run the code with 'connect ECONNREFUSED 127.0.0.1:3306' error, follow below instructions:*
1. Install / Open XAMPP, then click Start on Apache and MySQL module.
2. Make sure both Port(s) is appeared, then click MySQL's Admin button.
3. You'll be redirected to 'http://localhost/phpmyadmin/'. (this link for import database)
4. Click 'New' on top of left panel to create new database.
5. On database name column, input 'ptp_table' and click Create.
6. After that, click on new database then click on Import tab.
7. Choose file 'dev_test114.sql' in this folder, scroll down and click Import.
8. All setting is done. Go back to the code, and repeat the third steps of User Guide.
