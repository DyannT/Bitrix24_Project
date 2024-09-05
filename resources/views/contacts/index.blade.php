<!DOCTYPE html>
<html>
<head>
    <title>Contact List</title>
</head>
<body>
<h1>Contact List</h1>
<a href="{{ route('contacts.create') }}">Add New Contact</a>
<a  class="btn btn-warning mb-3" href="/">Home</a>
<table>
    <thead>
    <tr>
        <th>id</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Website</th>
        <th>Bank Info</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    @foreach($contacts['result'] as $contact)
        <tr>
            <td>{{ $contact['ID'] }}</td>
            <td>{{ $contact['NAME'] ?? "N/A" }}</td>
            <td>{{ $contact['ADDRESS'] ?? "N/A"  }}</td>
            <td>{{ $contact['PHONE'][0]['VALUE'] ?? "N/A"  }}</td>
            <td>{{ $contact['EMAIL'][0]['VALUE'] ?? "N/A"  }}</td>
            <td>{{ $contact['WEB'][0]['VALUE'] ?? "N/A"  }}</td>
            <td>{{ $contact['BANK_INFO'] ?? "N/A"  }}</td>
            <td>
                <a href="{{ route('contacts.edit', $contact['ID']) }}">Edit</a>
                <form action="{{ route('contacts.destroy', $contact['ID']) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Delete</button>
                </form>
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
<script src="{{ mix('js/create_contact.js') }}"></script>
</html>
