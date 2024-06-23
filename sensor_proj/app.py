import serial
import cx_Oracle
import logging
import time

# Configure logging
logging.basicConfig(filename='sensor_data.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
print("Logging initialized.")

try:
    # Oracle DB connection details
    dsn_tns = cx_Oracle.makedsn('sensor.prj', '1521', service_name='sensor')
    connection = cx_Oracle.connect(user='sensor_user', password='oracle123', dsn=dsn_tns)
    logging.info('Connected to Oracle database')
    print("Connected to Oracle database.")

    ser = serial.Serial('/dev/ttyACM0', 9600)  # Adjust the port name and baud rate as necessary
    print(f"Serial port opened: {ser.name}")

    def insert_data(humidity, temperature):
        cursor = connection.cursor()
        try:
            cursor.execute("""
                INSERT INTO SENSOR_DATA (humidity, temperature, timestamp)
                VALUES (:humidity, :temperature, CURRENT_TIMESTAMP)""",
                humidity=humidity, temperature=temperature)
            connection.commit()  # Commit the transaction
            logging.info(f"Inserted data: Humidity={humidity}, Temperature={temperature}")
            print(f"Inserted data: Humidity={humidity}, Temperature={temperature}")
        except cx_Oracle.DatabaseError as e:
            logging.error(f"Error inserting data into Oracle database: {e}")
            print(f"Error inserting data into Oracle database: {e}")
        except Exception as e:
            logging.error(f"Unexpected error occurred during data insertion: {e}")
            print(f"Unexpected error occurred during data insertion: {e}")
        finally:
            if cursor:
                cursor.close()

    while True:
        try:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').strip()
                print(f"Received line from serial: {line}")
                logging.info(f"Received line from serial: {line}")
                if "Humidity" in line and "Temperature" in line:
                    parts = line.split("\t")
                    humidity = float(parts[0].split(": ")[1].replace("%", ""))
                    temperature = float(parts[1].split(": ")[1].replace("°C", ""))
                    insert_data(humidity, temperature)
                    print(f"Inserted data: Humidity={humidity}, Temperature={temperature}")
        except KeyboardInterrupt:
            print("Script interrupted. Exiting gracefully...")
            break
        except serial.SerialException as se:
            logging.error(f"Serial port error: {se}")
            print(f"Serial port error: {se}")
            # Optionally handle or retry serial communication here
        except Exception as e:
            logging.error(f"Unexpected error occurred: {e}")
            print(f"Unexpected error occurred: {e}")
        time.sleep(1)  # Adjust the delay as needed

except cx_Oracle.DatabaseError as e:
    logging.error(f'Error connecting to Oracle database: {e}')
    print(f'Error connecting to Oracle database: {e}')
except Exception as e:
    logging.error(f"Unexpected error occurred during script execution: {e}")
    print(f"Unexpected error occurred during script execution: {e}")

finally:
    if 'connection' in locals() and connection:
        connection.close()
        print("Database connection closed.")

