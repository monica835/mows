$(document).ready(function () { })
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
		console.log("success");
	});

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
					console.log("published")
					Swal.fire(' topic has been published successfully!')
					var row = $("<tr>");
					$("<td>").text(topic).appendTo($(row));
					$("<td>").text(payload).appendTo($(row));
					$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
					$("#tbl-body-publish").append($(row));

				}
			});


		}

	})
	$("#btn-subscribe").click(function () {
		var topic = $("#topic").val();
		var subscribe = $("#topic-sub").val();
		if (subscribe != topic) {
			Swal.fire({
				type: 'error',
				title: 'Oops...',
				text: 'Topic is not available!',
			});
		}
		else if (subscribe == topic && topic !== "") {
			client.subscribe(topic, function (err) {
				if (err) {
					Swal.fire({
						type: 'error',
						title: 'Oops...',
						text: 'An error occurs!',
					});
				} else {
					var row = $("<tr>").attr("id", "mysub");
					$("<td>").text(topic).appendTo($(row));
					$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
					$("#tbl-body-subscribe").append($(row));
					Swal.fire('Subscribed successfully!');
				}
			});

		}

	})
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
		});
	})

	client.on("message", function (topic, payload) {
		// console.log([topic, payload].join(": "));
		var row = $("<tr>");
		$("<td>").text(topic).appendTo($(row));
		$("<td>").text(payload).appendTo($(row));
		$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
		$("#tbl-body").append($(row));
	})
});

