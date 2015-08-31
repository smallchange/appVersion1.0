// Use the following to check if two strings match
 var stringGood = false; 
 var isValid;
 
 var validate = {
	 compareStrings: function(field1, field2){
			field1 = field1.trim();
			field2 = field2.trim();
			if (field1 == field2)
				isValid = true;
			else 
				isValid = false;
				
			// Check the length of field if both match
			if (isValid)
			{
				var minLength = 5; 
				validate.checkMinLength(field1, minLength); 
				alert("is valid is " + isValid); 
			} 
	 },
	 checkMinLength: function(input, minLength){
		 // This will be used to check names
		 // for names: minimum of 2 characters 
		 
		 if (input.length >= minLength)
		 	stringGood = isValid = true;
		else 
			stringGood = isValid = false;
	 },
	 checkLength: function(input, minLength, maxLength){
		 // Use this to set a restriction on the maximum number of characters 
		 // This will be used to check passwords 
		 if (input.length >= minLength && input.length <= maxLength)
		 	stringGood = isValid = true;
		else 
			stringGood = isValid = false;
	 },
	 checkEmail: function(address){
		 // use a regular expression to check if the email was added properly with @ and .com, .ca
	 }
 }


 