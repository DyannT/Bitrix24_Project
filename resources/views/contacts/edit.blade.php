<!DOCTYPE html>
<html>
<head>
    <title>Add/Edit Contact</title>
</head>
<body>
<h1>Edit Contact</h1>
<form action="{{ route('contacts.update', $contact['result']['ID']) }}" method="POST">
    @csrf
    @method('PUT')
    @csrf
    <label>Name:</label>
    <input type="text" name="NAME" value="{{ $contact['result']['NAME'] ?? '' }}" required>
    <label>Address:</label>
    <input type="text" name="ADDRESS" value="{{ $contact['result']['ADDRESS'] ?? '' }}">
    <label>Phone:</label>
    <input type="text" name="PHONE" value="{{ $contact['result']['PHONE'][0]['VALUE'] ?? '' }}">
    <label>Email:</label>
    <input type="email" name="EMAIL" value="{{ $contact['result']['EMAIL'][0]['VALUE'] ?? '' }}">
    <label>Website:</label>
    <input type="text" name="WEB" value="{{ $contact['result']['WEB'][0]['VALUE'] ?? '' }}">
    <label>Bank Info:</label>
    <input type="text" name="BANK_INFO" value="{{ $contact['result']['BANK_INFO'] ?? '' }}">
    <button type="submit">Update</button>
</form>
</body>
</html>
