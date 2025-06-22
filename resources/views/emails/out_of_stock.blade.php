{{-- filepath: resources/views/emails/verify_email.blade.php --}}
@component('mail::message')
# Verify Your Email Address

BOBO KA CLICK MO TO!

@component('mail::button', ['url' => $verificationUrl])
Verify Email
@endcomponent

If you did not create an account, no further action is required.

Thanks,<br>
{{ config('app.name') }}
@endcomponent