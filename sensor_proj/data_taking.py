import cx_Oracle
import pandas as pd

# Oracle DB connection details
dsn_tns = cx_Oracle.makedsn('sensor.prj', '1521', service_name='sensor')
connection = cx_Oracle.connect(user='sensor_user', password='oracle123', dsn=dsn_tns)

# Query to fetch data
query = "SELECT * FROM (SELECT * FROM sensor_user.SENSOR_DATA ORDER BY timestamp DESC) WHERE ROWNUM <= 1000"
# Execute the query and fetch the data into a pandas DataFrame
df = pd.read_sql(query, con=connection)

# Write the DataFrame to a CSV file
df.to_csv('sensor_data.csv', index=False)

print("Data has been exported to sensor_data.csv")

# Close the database connection
connection.close()

