# API Design/Thoughts

Following wording is used:

**Training** is used as a generic term to identify a Training. This is something like "learn to speak german" The Training is held by an instructor, has a Description and a Price.

**Appointment**: An Appointment is the instance of a training with a fixed starting date and a list of TraingDays

**Booking**: The booking of an appointment by a user

**User**: name and e-mail adress of a user



The API for the Training website should offer following function:

		- Overview of all Trainings (Name, Description, Instructor, Price and	so on) 
		- Display all Appointments in a Ttimespan 
		- Display all  Appointments of a specific Training
		- Create/Modify a Traning
		- Create/Modify an Appointment 
		- Booking a Appointment

The rest API is created exclusively for the use of the website, thus various endpoints are adaopted exactly for this scenario.

**Needed Endpoints**
 - get /training/
	
		 - All Trainings will be responded as an array to the client 
		 - Schema of items
			 - id (number): ID the training)
			 - name (string): Name of the training
			 - description(string) : Descriptionof the training
			 - instructorName(string) Name of the Instructor
			 - price(number): Price of the training

 - get /training/?from={number}&to={number}
	
		 - All Trainings will be responded as an array to the client 
		 - from and to are javascript date values. Both are required as queryparameters
		 - Schema of items
			 - id (number): ID the training)
			 - name (string): Name of the training
			 - description(string) : Descriptionof the training
			 - instructorName(string) Name of the Instructor
			 - price(number): Price of the training

 - get /training/:id/appointment
	
		 - All Appointments for the Training with :id  will be responded as an array to the client 
		 - Schema of items
			 - id (number): ID of the Appointment)
			 - name (string): Name of the training
			 - description(string) : Descriptionof the training
			 - instructorName(string) Name of the Instructor
			 - price(number): Price of the training
			 - startDate of the Appointment

 - post /training/ 

			- Create a Training will  be responded back to the client 
			- Request Body:
				 - name (string): Name of the training
				 - description(string) : Descriptionof the training
				 - instructorName(string) Name of the Instructor
				 - price(number): Price of the training

			 - Response Schema
				 - id (number): ID of the Training
				 - name (string): Name of the training
				 - description(string) : Descriptionof the training
				 - instructorName(string) Name of the Instructor
				 - price(number): Price of the training
				 - startDate of the Appointment


 - patch /training/:id{number} 
 
			 - Update the training  with :id . Updated Training will  be responded back to the client 
			 - Schema
				 - id (number): ID of the Training 
				 - name (string): Name of the training
				 - description(string) : Descriptionof the training
				 - instructorName(string) Name of the Instructor
				 - price(number): Price of the training
			 
			 
 - post/trainingappointment/:id/
 
			- Create an Appointment for the training with :id. The created Appointment will be responded back to the client 
			- Request Body:
				 - trainingDays: (array of numbers) the trainingDays for the Appointment

			 - Response Schema
				 - id (number): ID of the Appointment
				 - trainingId(number): ID of the Training		 - 
				 - trainingDays:  (array of numbers)


 - patch/trainingappointment/:id/
 
			- updatean Appointment for the Appointment with :id. The updated Appointment will be responded back to the client 
			- Request Body:
				 - trainingDays: (array of numbers) the trainingDays for the Appointment
			- Response Schema
				 - id (number): ID of the Appointment
				 - trainingId(number): ID of the Training		 - 
				 - trainingDays:  (array of numbers)

 - post/trainingappointment/:id/signup
 
			- Book an Appointment for the  Appointment with :id. The API will respond a message back if the booking was valid	
			- Response Schema
				- message (string): ID of the Appointment
					- HTTP code will be 200 or 400


