{{-- resources/views/emails/verify_email.blade.php --}}
@component('mail::message')
{{-- This is a Blade template for sending a verification email --}}
#Verify Your Email Address
<p>
    <a href="{{ $verificationUrl }}">{{ $verificationUrl }}</a>
</p>
<p>
    If you did not create an account, no further action is required.
</p>
<p>
    Thanks,<br>
    {{ config('app.name') }}
</p>
@endcomponent
