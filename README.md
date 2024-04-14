# AWS-Lead-Magnet-Email-Service
AWS Lead Magnet Email Service

This small projects makes use of S3, Lambda Functions, Simple Email Service, and Dynamo DB. S3 hosts a static website that offers a free marketing PDF. Users can be redirected to the S3 website from a social media ad. They put in their 
name, email, etc. and this is sentto a lambda function where it is written to DynamoDB. Once the data is written successfully, an email is sent to the person who just submitted thier email where there is a link in the email
to the free PDF hosted on our S3 bucket. 
