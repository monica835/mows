$(document).ready(function () {
	var subscribedtopics = [];
	$('#btn-connect').click(function () {
		client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
		client.subscribe($("#topic").val());
		console.log('connect button when clicked');
		$("#status").text("Connecting...");
		$("#status").css("background-color", "rgb(230, 230, 0)");
		client.on("connect", function () {
			$("#status").text(" connected!!!!");
			Swal.fire(
				'Success!!',
				'Youre connected to the broker!'

			)
			console.log("SUCESSS");

		});
		client.on("message", function (topic, payload) {
			console.log(['Incoming message','Topic:' + topic + "Message: " + payload].join(":\n"));
			var row = $("<tr>");
			$("<td>").text(topic).appendTo($(row));
			$("<td>").text(payload).appendTo($(row));
			$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
			$("#tbl-body").append($(row));
		})


		$("#btn-disconnect").click(function () {
			Swal.fire({
				title: 'Are you sure?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes!'
			}).then((result) => {
				if (result.value) {
					client.end();
					Swal.fire(
						'Disconnected!',
						'Your are disconnected to the broker.',
						'success'
					);
					$("#status").text("Disconnected");
				}
			})

		});

		$("#btn-publish").click(function () {
			var topic = $("#topic").val();
			var payload = $("#message").val();
			if (topic == "" && payload == "") {
				client.publish("", "");
				Swal.fire({
					type: 'error',
					title: 'Oops...',
					text: 'Please provide inputs!',
				});
			}
			else {
				client.publish(topic, payload, function (err) {
					if (err) {
						Swal.fire({
							type: 'error',
							title: 'Oops...',
							text: 'There is an error!',
						});
					} else {
						console.log("PUBLISHED TOPIC: " + topic + " " + "MESSAGE: " + payload)
						Swal.fire(' topic has been published successfully!')
					}
					var row = $("<tr>");
					$("<td>").text(topic).appendTo($(row));
					$("<td>").text(payload).appendTo($(row));
					$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
					$("#tbl-body-publish").append($(row));


				});


			}

		});
		$("#btn-subscribe").click(function () {
			var topic = $("#topic-sub").val();
			if (topic == "") {
				swal.fire({
					type: 'error',
					title: 'oopssss...',
					text: 'an error occurs'
				});
			}
			else {

				if (!subscribedtopics.includes(topic)) {
					console.log("TOPIC SUBSCRIBED: " + topic)
					client.subscribe(topic)
					subscribedtopics.push(topic)
					var row = $("<tr>").attr("id", "mysub");
					$("<td>").text(topic).appendTo($(row));
					$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
					$("#tbl-body-subscribe").append($(row));
					Swal.fire('Subscribed successfully!');

				} else {
					swal.fire({
						type: 'info',
						title: 'this topic is already subscribed'
					})
				}
			}

		});
		$("#btn-unsubsribe").click(function () {
			var topic = $("#topic").val();
			client.unsubscribe(topic, function (err) {
				if (err) {
					Swal.fire({
						type: 'error',
						title: 'Oops...',
						text: 'An error occurs!',
					});
				} else {
					swal.fire({
						title: 'Confirm',
						text: 'Are you sure you want to unsubscribe?',
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: 'green'
					});

				}
			})
		});

	});
})
