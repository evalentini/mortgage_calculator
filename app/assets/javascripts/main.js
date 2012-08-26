 $(document).ready(function() {
   $("button").click(function() {
			//	calculate monthly payment 
			var whole_rate1 = parseInt($("#whole_rate1").val());
			var frac_rate1 = parseInt($("#frac_rate1").val());
			var term1 = parseInt($("#term1").val());
			var int_rate1=(whole_rate1+frac_rate1/100)/100; 
			var principal1=parseInt($("#principal_thousands1").val())*1000+parseInt($("#principal_singles1").val());
			var monthly_int_rate1=int_rate1/12;
			var num_of_payments1=term1*12;
			//alert(num_of_payments1);
			//alert ("principal="+principal1+" monthly rate="+monthly_int_rate1+" num of payments=" + num_of_payments1);
			var part1=principal1*monthly_int_rate1;
			var part2=Math.pow(1+monthly_int_rate1,360);
			//var part2=Math.pow(2,num_of_payments1);
			//alert(part2);
			var part3=Math.pow((1+monthly_int_rate1),num_of_payments1)-1;
			var part4=part2/part3;
			var monthly_payment1=part1*part4;
			//alert(finalpart);
			//alert("part1="+part1+" part2="+part2+" part3="+part3+" part4="+part4+" finalpart="+finalpart);
			//	var monthly_payment1=(principal1*monthly_int_rate1)*Math.pow(1+monthly_int_rate1,num_of_payments1)/(Math.pow(1+monthly_int_rate1,num_of_payments1-1);
		//	alert (monthly_payment1);
		//	alert(intRate1);
		// $("#pmt1").append(frac_rate);
			$("#pmt1").text(monthly_payment1);
   });

		$("#whole_rate1").change(function() {
			var whole_rate = this.value;
			var frac_rate = $("#frac_rate1").value;
			var term=$("#term1").value;
			$("#pmt1").text(frac_rate);
		});
 });
