 

	$(document).ready(function() {
		//calculate the payment for the first loan 
		pmt_calculator(1);
	
	//////////////////////HELPER FUNCTIONS///////////////////////////////////
	
	//function to increment and decrement the # of loans

	function changeNumLoans(num_change, start_num) {
		
		var increment = parseInt(num_change);	
		var lowest_number=start_num;
		
		//get the highest # loan 
		var current_num=parseInt($('#num_mortgage').val());
		
		//increment the highest # loan (hidden input in form with # of loans)
		$('#num_mortgage').val(current_num+num_change);

		//loop through all the loans greater than the one we want to add and increment loan number
		//if we want to add a loan we have to start with highest # loan and work down 
		//if we want to remove a loan we have to start with lowest # and work up
		if (num_change>0) {
			for (i=current_num; i>=start_num; i--) {
				$('[field="loan_number_label"][loan_number='+i+']').text("loan "+(i+num_change));
				$('[loan_number='+i+']').attr("loan_number", i+num_change);		
			} 
		}
		else {
			for (i=start_num; i<=current_num; i++) {
				$('[field="loan_number_label"][loan_number='+i+']').text("loan "+(i+num_change));
				$('[loan_number='+i+']').attr("loan_number", i+num_change);		
			}
		}
		return 1;
	}
	
	/////////////////////////CODE FOR REMOVING A LOAN//////////////////////////
	$('div[field="remove_loan_button"] button').live('click', function() {
		
		//get the loan number that was clicked
		var loan_number=parseInt($(this).attr("loan_number"));
		
		//remove all the cell divs with child elements with loan_number = one we want to delete
		$('[loan_number="'+loan_number+'"]').remove() 

		//change the # of loans
		var dummy=changeNumLoans(-1, loan_number);  	
	}); 

	//////////////////////////CODE FOR ADDING A LOAN///////////////////////////

	$('div[field="add_loan_button"] button').live('click',function() {

		//get the loan number that was clicked 
		var loan_number=parseInt($(this).attr("loan_number"));
		var new_loan_number=parseInt(loan_number)+1;
		
		//increment all the loans with loan number>loan_number
		var dummy=changeNumLoans(1, loan_number+1);
		
		//set the loan number field  as a variable
		loan_num_attr='loan_number='+loan_number
		//set next loan number field as variable 
		new_loan_num_attr='loan_number='+new_loan_number;	
		
		//add label 
		var next_label='<div class="cell narrow" '+
										'style="background: white; color: white;"'+
										new_loan_num_attr+'>-</div>'+
										'<div class="cell loan-column-header" field="loan_number_label"'+
										new_loan_num_attr+'>Loan '+new_loan_number+'</div>';

		$('[field="loan_number_label"]['+loan_num_attr+']').after(next_label);

		//add monthly payment div
		var new_pmt_div='<div class="cell narrow"'+new_loan_num_attr+
										'>$</div><div class="cell" field="pmt"'
										+new_loan_num_attr+'>-</div>';

		$('[field="pmt"]['+loan_num_attr+']').after(new_pmt_div);
		
		//add extra cost div
		var new_extra_cost_div='<div class="cell narrow" '+new_loan_num_attr+
													 '>$</div><div class="cell" field="extra_cost"'
													 +new_loan_num_attr+'>-</div>';
		$('[field="extra_cost"]['+loan_num_attr+']').after(new_extra_cost_div);
		
		//add interest rate div
		var new_interest_rate_div = '<div class="cell narrow" style="color: yellow;"'+
																new_loan_num_attr+' >-</div>'+
																'<div class="cell" field="interest_rate"'+new_loan_num_attr+'>'+
																'<input type="text" id="whole_rate" size=1 value="3">.'+
																'<input type="text" id="frac_rate" size=1 value="00">%</div>';
		$('[field="interest_rate"]['+loan_num_attr+']').after(new_interest_rate_div);
		
		//add new loan term
		var new_loan_term_div	=			'<div class="cell narrow"'+
																'style="color: yellow;"'+new_loan_num_attr+'>-</div>'+
																'<div class="cell" field="loan_term"'+new_loan_num_attr+'>'+
																'<input type="text" id="loan_term" size=2 value="30"> yrs' +
																'</div>';
		$('[field="loan_term"]['+loan_num_attr+']').after(new_loan_term_div);
		
		//add new loan amount
		var new_loan_amount_div =   '<div class="cell narrow"' + new_loan_num_attr+'>$</div>'+
																'<div class="cell" field="loan_amount"'+new_loan_num_attr+'>'+
																'<input id="principal_thousands" type="text" size=3 value="100">,'+
																'<input id="principal_singles" type="text" size=3 value="000">'+
																'</div>';
		$('[field="loan_amount"]['+loan_num_attr+']').after(new_loan_amount_div);

		//add remove button 
		var new_remove_loan_button = '<div class="cell narrow"'+
																 'style="color: white;"'+ new_loan_num_attr+'>-</div>'+
																 '<div class="cell" field="remove_loan_button"'+new_loan_num_attr+'>'+
																 '<button '+new_loan_num_attr+'>remove loan</button>'+
																 '</div>';
		$('[field="remove_loan_button"]['+loan_num_attr+']').after(new_remove_loan_button);
		
		//add the add loan button
		var new_add_loan_button =		'<div class="cell narrow" style="color: white;"'+new_loan_num_attr+
																'>-</div>'+
																'<div class="cell" field="add_loan_button"'+new_loan_num_attr+'>'+
																'<button '+new_loan_num_attr+'>add loan</button>'+
																'</div>';
		$('[field="add_loan_button"]['+loan_num_attr+']').after(new_add_loan_button);

		//calculate the monthly payment for the new loan
		pmt_calculator(new_loan_number); 
   
	});

	/////////////CODE FOR CALCULATING LOAN PAYMENT/////////////////////////////	
		function pmt_calculator(loan_num) {
			//get the interest rate, loan term and loan amount
			var loan_number=loan_num;	
			//interest rate	
			var whole_rate=parseInt($('div.cell[loan_number="'+loan_number+'"] > input#whole_rate').val());
			var frac_rate=parseInt($('div.cell[loan_number="'+loan_number+'"] > input#frac_rate').val());
			var rate = (whole_rate+(frac_rate/100))/1200;
			
			//term (in months)
			var term=parseInt($('div.cell[loan_number="'+loan_number+'"] > input#loan_term').val())*12;
			//loan amount
			var amount=parseInt($('div.cell[loan_number="'+loan_number+'"] > input#principal_thousands').val())*1000;
			amount += parseInt($('div.cell[loan_number="'+loan_number+'"] > input#principal_singles').val());
				
			//calculate the monthly payment 
			//formula can be found on wikipedia here: http://en.wikipedia.org/wiki/Mortgage_calculator	
			var pmt = Math.round(amount*rate*(Math.pow(1+rate, term))/(Math.pow(1+rate, term)-1));
			
			//put the payment information into the monthly payment field  			
			$('div[field="pmt"][loan_number="'+loan_number+'"]').text(pmt);
			
			//also find the lowest payment loan and calculate difference versus each loan
			var max_num=parseInt($("input#num_mortgage").val()); 
			var min_pmt=pmt;
			for(i=1; i<=max_num; i++) {
				var i_pmt=parseInt($('div[loan_number="'+i+'"][field="pmt"]').text());
				min_pmt = (i_pmt<min_pmt) ? i_pmt : min_pmt;
			}
			for (i=1; i<=max_num; i++) {
				var i_pmt=parseInt($('div[loan_number="'+i+'"][field="pmt"]').text());
				var diff=i_pmt-min_pmt;
				$('div[field="extra_cost"][loan_number="'+i+'"]').text(diff);
			}
		}
	
	 //recalculate whenever an input is changed	
	 $("input").live('change', function() {
			//get the loan number
			var loan_number=parseInt($(this).parent().attr("loan_number"));
			
			//calculate payment 
			pmt_calculator(loan_number);
   });	

 });
