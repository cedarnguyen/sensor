"# sensor" 

# Project Readme

## System and Database Requirements

### System
- **Operating System:** Oracle Linux 8.8
  - Note: Attempted with Oracle Linux 7 but failed due to lack of dependencies.

### Database
- **Oracle Database:** 19c
  - Note: Need to fake OL7 because Oracle DB 19c doesn't support OL8.

### API:
- **Nestjs
## Libraries Requirement

- **Oracle Instant Client:** Allows applications to connect to a local or remote Oracle Database for development and production use.
- **cx_Oracle:** Python extension module that enables access to Oracle Database.
- **serial:** Allows for communication with serial ports, enabling Python programs to read from sensors.
- **pandas:** Used to generate CSV files.
- **npm:** a package manager for JavaScript.
## Files

- **Test01_delete.ino:** Reads sensor's information.
- **app.py:** Connects to the database using `cx_Oracle`, reads sensor data, and inserts data into the database. Logs activity and errors are saved in `sensor_data.log`.
- **data_taking.py:** Reads the last 1000 data entries from the table and stores them in `sensor_data.csv`.
- **expdpSENSOR_DATA.log** and **SENSOR_DATA.dmp:** Exported data files using Data Pump.

## Usage Instructions

1. Ensure that your system is running Oracle Linux 8.8 and that Oracle Database 19c is properly configured.
2. Upload Test01_delete.ino to the ardiuno using arduinoIDE to start reading sensor data.
3. Install the required libraries:
   ```sh
   pip3 install cx_Oracle serial pandas
   sudo dnf module enable nodejs:16
   sudo dnf module install nodejs
   npm i -g @nestjs/cli
   npm install

4. Run app.py to connect to the database, read sensor data, and log activity
   ```sh
   python3 app.py
5. To generate a CSV file with the last 1000 data entries from the database, run data_taking.py:
   ```sh
   python3 data_taking.py
In case you want to migrate data, there're exported files that can be use to import into another oracle database.
6. To run the main file Node.js application, using the command:
   ```sh
   npm run start
   ```
The application now is ready to be used.
### The video demo is on this link: https://drive.google.com/drive/folders/1DCI8XxdfKTEvueLgNbGWebYs98GOZDo7?usp=sharing
