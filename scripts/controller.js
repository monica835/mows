var client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
client.subscribe("mqtt/demo")

client.on("message", function (topic, payload) {
  alert([topic, payload].join(": "))
  client.end()
})
client.publish("mqtt/demo", "hello world!")
