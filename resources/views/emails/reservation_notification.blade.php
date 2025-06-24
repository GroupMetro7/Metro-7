@component('mail::message')
Hi {{ $user->firstname}},

Thank you for choosing Metro 7, please find below the details of your reservation:
<br/>
Reservation :{{ $reservation->reservation_type}}
<br/>
Date :{{ $reservation->date}}, {{ $reservation->time}}
<br/>
How many :{{ $reservation->party_size}}

Thanks,
<br/>
Metro 7
@endcomponent
