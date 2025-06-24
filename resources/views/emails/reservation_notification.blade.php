@component('mail::message')
Hi {{ $user->firstname}},

Thank you for choosing Metro 7, please find below the details of your reservation:
<br/>
Reservation :{{ $reservation->reservation_type}}
<br/>
Date :{{ $reservation->date}}, {{ $reservation->time}}
<br/>
How many :{{ $reservation->party_size}}
<br/>

We will confirm your reservation within the next 2 hours.
<br/>
Please note that if you do not receive a confirmation, your reservation is not valid.
<br/>
Thanks,
<br/>
Metro 7
@endcomponent
