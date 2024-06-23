#include <DHT.h>

#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // DHT  22  (AM2302), AM2321

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("DHT22 test!");
  pinMode(8,OUTPUT);
  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements.
  delay(1000);

  // Reading temperature or humidity takes about 250 milliseconds!
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Display the temperature and humidity readings on the Serial Monitor
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print("%\t");
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println("°C");
  if(temperature > 28){
    digitalWrite(8,HIGH);
  }
  else{
    digitalWrite(8,LOW);
  }
}
