<!DOCTYPE html>
<html>
<head>
    <title>Show Contact</title>
</head>
<body>
<h1>Show Contact</h1>
    <label>Name:</label>
    <p>{{ $contact['result']['NAME'] ?? '' }}</p>
    <label>Address:</label>
    <p>{{ $contact['result']['ADDRESS'] ?? '' }}</p>
    <label>Phone:</label>
    <p>{{ $contact['result']['PHONE'][0]['VALUE'] ?? '' }}</p>
    <label>Email:</label>
    <p>{{ $contact['result']['EMAIL'][0]['VALUE'] ?? '' }}</p>
    <label>Website:</label>
    <p>{{ $contact['result']['WEB'] ?? '' }}</p>
    <label>Bank Info:</label>
    <p>{{ $contact['result']['BANK_INFO'] ?? '' }}</p>
</body>
</html>
