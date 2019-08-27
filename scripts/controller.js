var client;
client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
client.subscribe("mqtt/demo")

client.on("connect", function(){
    console.log("Successfully connected");
})

client.on("message", function (topic, payload) {
  console.log([topic, payload].join(": "))
  client.end()
})
client.publish("mqtt/demo", "hello world!")
