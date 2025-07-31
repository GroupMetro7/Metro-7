@component('mail::message')
Hi {{ $user->firstname}},

Thank you for choosing Metro 7! We are please to confirm your reservation for {{ $reservation->date }} at {{ $reservation->time }}.

Thanks,
<br/>
Metro 7
@endcomponent
